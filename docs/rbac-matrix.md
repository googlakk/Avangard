# RBAC Matrix for CMS Admin Roles (INT-25)

## Roles

- `owner`
- `admin`
- `editor`
- `reviewer`

## Actions

- `read`
- `create`
- `update`
- `delete`
- `publish`
- `manage`

## Resource Permission Matrix

| Resource | owner | admin | editor | reviewer |
|---|---|---|---|---|
| dashboard | read, manage | read | read | read |
| staff | read, create, update, delete, publish, manage | read, create, update, delete, publish | read | read |
| programs | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read, publish |
| news | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read, publish |
| documents | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read, publish |
| gallery | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read, publish |
| pages | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read, publish |
| sections | read, create, update, delete, publish, manage | read, create, update, delete, publish | read, create, update | read |
| settings | read, create, update, delete, publish, manage | read, update | read | read |
| users | read, create, update, delete, manage | read, update | none | none |

## Implementation References

- Runtime matrix: `lib/auth/rbac.ts`
- Server helpers: `lib/auth/server.ts`
- Client helpers: `lib/auth/client.ts`
- Route protection: `middleware.ts`

## Notes

- Admin panel access is granted to all CMS roles with at least `dashboard:read`.
- Fine-grained checks are applied with `hasPermission(role, resource, action)`.
- Database-level RLS hardening is handled separately in `INT-26`.

