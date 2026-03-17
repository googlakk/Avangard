-- Stage 2 hotfix
-- Enable authenticated uploads for gallery-images bucket used by CMS page builder.

insert into storage.buckets (id, name, public)
values ('gallery-images', 'gallery-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Gallery images bucket public read" on storage.objects;
drop policy if exists "Gallery images bucket authenticated insert" on storage.objects;
drop policy if exists "Gallery images bucket authenticated update" on storage.objects;
drop policy if exists "Gallery images bucket authenticated delete" on storage.objects;

create policy "Gallery images bucket public read"
on storage.objects
for select
using (bucket_id = 'gallery-images');

create policy "Gallery images bucket authenticated insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'gallery-images');

create policy "Gallery images bucket authenticated update"
on storage.objects
for update
to authenticated
using (bucket_id = 'gallery-images')
with check (bucket_id = 'gallery-images');

create policy "Gallery images bucket authenticated delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'gallery-images');
