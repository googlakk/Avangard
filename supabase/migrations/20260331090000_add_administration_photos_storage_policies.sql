-- Production hotfix
-- Ensure staff photos can be uploaded to the administration-photos bucket.

insert into storage.buckets (id, name, public)
values ('administration-photos', 'administration-photos', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Administration photos public read" on storage.objects;
drop policy if exists "Administration photos authenticated insert" on storage.objects;
drop policy if exists "Administration photos authenticated update" on storage.objects;
drop policy if exists "Administration photos authenticated delete" on storage.objects;

create policy "Administration photos public read"
on storage.objects
for select
using (bucket_id = 'administration-photos');

create policy "Administration photos authenticated insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'administration-photos');

create policy "Administration photos authenticated update"
on storage.objects
for update
to authenticated
using (bucket_id = 'administration-photos')
with check (bucket_id = 'administration-photos');

create policy "Administration photos authenticated delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'administration-photos');
