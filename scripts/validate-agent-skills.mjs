#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const skillsRoot = path.join(root, '.agents', 'skills');
const errors = [];
let count = 0;
try {
  const dirs = await readdir(skillsRoot);
  for (const dir of dirs) {
    const skillDir = path.join(skillsRoot, dir);
    if (!(await stat(skillDir)).isDirectory()) continue;
    const file = path.join(skillDir, 'SKILL.md');
    let body;
    try { body = await readFile(file, 'utf8'); }
    catch { errors.push(`${dir}: missing SKILL.md`); continue; }
    count++;
    if (!body.startsWith('---\n')) errors.push(`${dir}: missing YAML frontmatter opening delimiter`);
    const end = body.indexOf('\n---', 4);
    if (end < 0) { errors.push(`${dir}: missing YAML frontmatter closing delimiter`); continue; }
    const fm = body.slice(4, end);
    const name = fm.match(/^name:\s*([^\n]+)$/m)?.[1]?.trim();
    const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (!name) errors.push(`${dir}: missing name`);
    if (name && name !== dir) errors.push(`${dir}: name must match directory (found ${name})`);
    if (name && (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64)) errors.push(`${dir}: invalid Agent Skills name`);
    if (!description) errors.push(`${dir}: missing description`);
    if (description && description.length > 1024) errors.push(`${dir}: description exceeds 1024 characters`);
    if (body.split('\n').length > 500) errors.push(`${dir}: SKILL.md exceeds recommended 500 lines; move detail to references/`);
  }
} catch (e) {
  errors.push(`Cannot read skills directory: ${e.message}`);
}
if (errors.length) {
  console.error('Agent Skills validation FAILED');
  for (const e of errors) console.error(`- ${e}`);
  process.exitCode = 1;
} else {
  console.log(`Agent Skills validation PASS: ${count} skill(s) checked.`);
}
