-- Create programs table
create table if not exists public.programs (
    id uuid not null default gen_random_uuid(),
    slug text not null,
    title jsonb not null default '{}'::jsonb,
    description jsonb not null default '{}'::jsonb,
    hero_image text,
    age_group text,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint programs_pkey primary key (id),
    constraint programs_slug_key unique (slug)
);

-- Create program_sections table
create table if not exists public.program_sections (
    id uuid not null default gen_random_uuid(),
    program_id uuid not null,
    type text not null,
    title text,
    content jsonb not null default '{}'::jsonb,
    order_index integer not null default 0,
    is_enabled boolean not null default true,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    constraint program_sections_pkey primary key (id),
    constraint program_sections_program_id_fkey foreign key (program_id) references programs (id) on delete cascade
);

-- Indexes
create index if not exists programs_slug_idx on public.programs (slug);
create index if not exists program_sections_program_id_idx on public.program_sections (program_id);
create index if not exists program_sections_order_index_idx on public.program_sections (order_index);

-- Enable RLS
alter table public.programs enable row level security;
alter table public.program_sections enable row level security;

-- Grants
grant select on table public.programs to anon, authenticated, service_role;
grant select on table public.program_sections to anon, authenticated, service_role;
grant all on table public.programs to service_role;
grant all on table public.program_sections to service_role;

-- RLS Policies for programs
create policy "Enable read access for all users"
    on public.programs for select
    using (true);

create policy "Enable all access for admins and service role"
    on public.programs for all
    using (
        (auth.jwt() ->> 'role' = 'service_role') or
        (exists (
            select 1 from auth.users
            where auth.uid() = id and (raw_user_meta_data ->> 'role')::text = 'admin'
        ))
    );

-- RLS Policies for program_sections
create policy "Enable read access for all users"
    on public.program_sections for select
    using (true);

create policy "Enable all access for admins and service role"
    on public.program_sections for all
    using (
        (auth.jwt() ->> 'role' = 'service_role') or
        (exists (
            select 1 from auth.users
            where auth.uid() = id and (raw_user_meta_data ->> 'role')::text = 'admin'
        ))
    );

-- Realtime
alter publication supabase_realtime add table public.programs;
alter publication supabase_realtime add table public.program_sections;
