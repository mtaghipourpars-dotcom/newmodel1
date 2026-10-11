# Security, Secrets, Deployment and Recovery

## Secrets
- Store database URLs, Gemini API keys, OAuth credentials and source-system credentials only in server-side environment/secret manager.
- Never hard-code secrets in React/Vite public variables, browser storage, source files, demo fixtures, screenshots, logs or prompts.
- Rotate any secret exposed in a commit or client bundle.
- Use separate development/test/production credentials and databases.

## Identity and authorization
- Define role and permission matrix before enabling multi-user writes.
- Enforce object-level authorization on server endpoints, not only by hiding UI controls.
- Audit privileged actions, decision selection, source promotion, data imports and rule approval.
- A source record may be promoted to INTERNAL_VERIFIED only after an accountable source owner and reviewer approve the evidence.
- Protect sessions/cookies and apply appropriate CSRF/CORS/rate-limits for the deployment model.

## Import and integration
- Treat uploaded files and source-system payloads as untrusted.
- Validate size, type, schema, IDs, units, date formats, referential integrity and duplicate keys.
- Store raw import reference/checksum and import run metadata; do not silently overwrite actuals.
- Initially use read-only adapters unless write operations are explicitly authorized and audited.
- Clearly label each source as CONNECTED, DISCONNECTED, STALE, ERROR or UNKNOWN with last successful sync timestamp.

## Deployment
- Local/AI Studio preview is not production.
- For Google Cloud deployment, assess Cloud Run and a managed PostgreSQL service such as Cloud SQL for PostgreSQL; do not provision resources or incur cost without owner approval.
- Use environment-specific configuration and managed secrets.
- Run migrations as a controlled release step; back up before destructive migrations.
- Define health/readiness endpoints, structured redacted logs, error monitoring and operational alerts.
- Document rollback to previous app version and a tested DB recovery procedure.
- Do not publish sensitive internal data to a public preview URL.

## Release checklist
- [ ] Security review and dependency audit.
- [ ] Secrets scanned from source/client bundle.
- [ ] Authn/authz tested.
- [ ] DB migrations and backup/restore tested.
- [ ] Monitoring/readiness and error states tested.
- [ ] Rollback plan approved.
- [ ] Source integration owners approve mappings and access.
- [ ] Human release approval recorded.
