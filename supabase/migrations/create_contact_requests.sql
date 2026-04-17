create table public.contact_requests (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    phone text not null,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contact_requests enable row level security;
create policy "Allow anonymous inserts" on public.contact_requests for insert with check (true);
create policy "Allow all for authenticated" on public.contact_requests for all using (true);
create policy "Allow anonymous selects" on public.contact_requests for select using (true);
create policy "Allow anonymous deletes" on public.contact_requests for delete using (true);
