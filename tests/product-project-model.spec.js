import { test, expect } from '@playwright/test';
import fixture from '../data/product-project-fixture.json' with { type: 'json' };

const canonicalFamilies = [
  'THERMAL_GENERATORS',
  'HYDRO_GENERATORS',
  'WIND_TURBINES',
  'INDUSTRIAL_GENERATORS',
  'MOTORS',
  'BUSDuct',
];
const dataClasses = new Set([
  'PUBLIC_VERIFIED',
  'INTERNAL_VERIFIED',
  'USER_APPROVED_ASSUMPTION',
  'DEMO_SYNTHETIC',
  'UNKNOWN',
]);
const assignmentStatuses = new Set(['VERIFIED', 'ASSUMPTION', 'DEMO_LINK', 'UNKNOWN']);

function validateModel(model) {
  const errors = [];
  const unique = (items, key, label) => {
    const ids = items.map(item => item[key]);
    if (new Set(ids).size !== ids.length) errors.push(`duplicate ${label} ID`);
  };
  unique(model.product_families, 'family_id', 'family');
  unique(model.products, 'product_id', 'product');
  unique(model.projects, 'project_id', 'project');
  unique(model.project_product_assignments, 'assignment_id', 'assignment');
  unique(model.commitments, 'commitment_id', 'commitment');
  unique(model.milestones, 'milestone_id', 'milestone');

  if (model.dataset_class !== 'DEMO_SYNTHETIC') errors.push('fixture must be labelled DEMO_SYNTHETIC');
  if (JSON.stringify(model.product_families.map(x => x.family_id)) !== JSON.stringify(canonicalFamilies)) {
    errors.push('canonical six-family list/order mismatch');
  }

  const familyIds = new Set(model.product_families.map(x => x.family_id));
  const productIds = new Set(model.products.map(x => x.product_id));
  const projectIds = new Set(model.projects.map(x => x.project_id));
  const commitmentIds = new Set(model.commitments.map(x => x.commitment_id));
  for (const p of model.products) {
    if (!familyIds.has(p.family_id)) errors.push(`product ${p.product_id} has orphan family`);
    if (!dataClasses.has(p.data_class)) errors.push(`product ${p.product_id} has invalid data_class`);
    if (p.data_class === 'PUBLIC_VERIFIED' && (!p.source_reference || !p.as_of)) {
      errors.push(`public product ${p.product_id} lacks source/as-of`);
    }
    if (p.data_class === 'DEMO_SYNTHETIC' && p.source_status !== 'DEMO_ONLY') {
      errors.push(`synthetic product ${p.product_id} must say DEMO_ONLY`);
    }
  }
  for (const p of model.projects) {
    if (!p.project_id.startsWith('DEMO-') || p.data_class !== 'DEMO_SYNTHETIC' || p.project_status !== 'DEMO_ONLY') {
      errors.push(`project ${p.project_id} is not unmistakably synthetic`);
    }
  }
  for (const a of model.project_product_assignments) {
    if (!productIds.has(a.product_id)) errors.push(`assignment ${a.assignment_id} has orphan product`);
    if (!assignmentStatuses.has(a.relationship_status)) errors.push(`assignment ${a.assignment_id} has invalid status`);
    if (!dataClasses.has(a.data_class)) errors.push(`assignment ${a.assignment_id} has invalid data_class`);
    if (a.relationship_status === 'UNKNOWN') {
      if (a.project_id !== null || a.data_class !== 'UNKNOWN' || a.source_reference !== null || a.confidence !== 0) {
        errors.push(`unknown assignment ${a.assignment_id} must remain null/unverified`);
      }
    } else {
      if (!projectIds.has(a.project_id)) errors.push(`assignment ${a.assignment_id} has orphan project`);
      for (const field of ['source_system', 'source_reference', 'source_owner', 'as_of', 'quality_status', 'reason']) {
        if (!a[field]) errors.push(`assignment ${a.assignment_id} missing ${field}`);
      }
      if (!Number.isFinite(a.confidence) || a.confidence < 0 || a.confidence > 1) {
        errors.push(`assignment ${a.assignment_id} confidence outside [0,1]`);
      }
      if (a.relationship_status === 'DEMO_LINK' &&
          (a.data_class !== 'DEMO_SYNTHETIC' || !a.project_id.startsWith('DEMO-'))) {
        errors.push(`demo assignment ${a.assignment_id} is not labelled synthetic`);
      }
      if (a.data_class === 'INTERNAL_VERIFIED' && a.source_system === 'PUBLIC_WEB') {
        errors.push(`public catalogue cannot verify project assignment ${a.assignment_id}`);
      }
    }
  }
  for (const c of model.commitments) {
    if (!projectIds.has(c.project_id)) errors.push(`commitment ${c.commitment_id} has orphan project`);
    if (!c.commitment_id || !c.type || !c.due_date || !c.status || !c.data_class || !c.source_reference) {
      errors.push(`commitment ${c.commitment_id} lacks required traceability fields`);
    }
    if (!model.milestones.some(m => m.commitment_id === c.commitment_id)) {
      errors.push(`commitment ${c.commitment_id} has no milestone`);
    }
  }
  for (const m of model.milestones) {
    if (!commitmentIds.has(m.commitment_id)) errors.push(`milestone ${m.milestone_id} has orphan commitment`);
    if (!projectIds.has(m.project_id)) errors.push(`milestone ${m.milestone_id} has orphan project`);
    const c = model.commitments.find(item => item.commitment_id === m.commitment_id);
    if (c && c.project_id !== m.project_id) errors.push(`milestone ${m.milestone_id} project differs from commitment`);
  }
  for (const p of model.projects) {
    if (!model.commitments.some(c => c.project_id === p.project_id)) errors.push(`project ${p.project_id} has no commitment`);
  }
  return errors;
}

test('PPOM fixture passes referential-integrity and provenance validation', () => {
  expect(validateModel(fixture)).toEqual([]);
});

test('six canonical product families are stable and unique', () => {
  expect(fixture.product_families.map(x => x.family_id)).toEqual(canonicalFamilies);
  expect(new Set(fixture.product_families.map(x => x.family_id)).size).toBe(6);
  expect(fixture.products.every(p => canonicalFamilies.includes(p.family_id))).toBeTruthy();
});

test('public catalogue evidence never implies a real project assignment', () => {
  const publicProduct = fixture.products.find(p => p.data_class === 'PUBLIC_VERIFIED');
  expect(publicProduct.source_reference).toMatch(/^https:\/\/mapnagenerator\.com\//);
  expect(fixture.project_product_assignments.filter(a => a.product_id === publicProduct.product_id)
    .every(a => a.data_class !== 'INTERNAL_VERIFIED')).toBeTruthy();
});

test('unknown product-project relationship remains null and unverified', () => {
  const unknown = fixture.project_product_assignments.find(a => a.relationship_status === 'UNKNOWN');
  expect(unknown).toBeTruthy();
  expect(unknown.project_id).toBeNull();
  expect(unknown.data_class).toBe('UNKNOWN');
  expect(unknown.source_reference).toBeNull();
});

test('validator rejects orphan links, duplicate IDs, and false verification', () => {
  const orphan = structuredClone(fixture);
  orphan.project_product_assignments[0].project_id = 'PRJ-NOT-FOUND';
  expect(validateModel(orphan)).toContain('assignment DEMO-ASG-001 has orphan project');

  const duplicate = structuredClone(fixture);
  duplicate.products.push({ ...duplicate.products[0] });
  expect(validateModel(duplicate)).toContain('duplicate product ID');

  const falseVerified = structuredClone(fixture);
  const unknown = falseVerified.project_product_assignments.find(a => a.relationship_status === 'UNKNOWN');
  unknown.project_id = 'DEMO-PRJ-001';
  unknown.data_class = 'INTERNAL_VERIFIED';
  expect(validateModel(falseVerified)).toContain('unknown assignment UNKNOWN-ASG-001 must remain null/unverified');
});
