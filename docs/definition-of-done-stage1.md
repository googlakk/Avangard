# Definition of Done: Stage 1 Foundation

## Scope

Stage 1 covers `INT-23` to `INT-27` only.

## Mandatory Gates

1. Schema and types alignment:
- Supabase migrations reflect canonical schema decisions.
- `lib/database.types.ts` is regenerated when migrations change.

2. Security baseline:
- RBAC matrix implemented for `owner/admin/editor/reviewer`.
- RLS policies hardened for CMS resources.
- RLS smoke checks exist for all core roles.

3. CI quality gates:
- `npm run lint`
- `npm run type-check`
- `npm run build`
- migration/types sync check
- preview deploy workflow (when deploy secrets are configured)

## Completion Criteria Per Issue

- Plan written.
- Implementation delivered within issue scope.
- Checks executed and results recorded.
- Risks documented.
- Remaining work explicitly listed.

## Blocker Rule

If any required gate cannot be executed due to environment constraints, the issue must be marked with:

- comment prefix: `Status: Blocked`
- blocker cause
- unblock action required

