## Summary

- What changed:
- Why:
- Scope boundaries (what is intentionally not included):

## Validation

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm run build`
- [ ] `npm run check:migration-types`
- [ ] For RLS changes: `supabase/tests/rls_smoke.sql` executed against staging or local Supabase

## Database & Migrations

- [ ] Migration-first followed (`supabase/migrations/*.sql` updated before related app changes)
- [ ] `lib/database.types.ts` regenerated and committed (if migration changed)
- [ ] Breaking schema/data changes documented

## Security & RBAC

- [ ] RBAC impact reviewed (`owner/admin/editor/reviewer`)
- [ ] RLS policies updated when needed
- [ ] No sensitive data/secrets committed

## Preview & Rollout

- [ ] Preview deployment link attached (if Vercel secrets configured)
- [ ] Rollback plan noted for high-risk changes
- [ ] Post-merge follow-ups listed (if any)

## Definition of Done (Stage 1)

- [ ] Schema and `database.types` aligned
- [ ] RBAC matrix implemented and referenced
- [ ] RLS policies hardened + smoke checks added
- [ ] CI gates green

