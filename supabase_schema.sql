-- Enable RLS
alter table if exists settings enable row level security;
alter table if exists portfolio enable row level security;
alter table if exists testimonials enable row level security;
alter table if exists faqs enable row level security;
alter table if exists before_after enable row level security;

-- Create Tables
create table if not exists settings (
  key text primary key,
  value jsonb
);

create table if not exists portfolio (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text not null,
  image_url text not null
);

create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  location text not null,
  content text not null,
  avatar_url text,
  rating integer default 5
);

create table if not exists faqs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  question text not null,
  answer text not null
);

create table if not exists before_after (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  before_img text not null,
  after_img text not null,
  caption text not null
);

-- Policies (Table Access)
create policy "Public read access" on settings for select using (true);
create policy "Authenticated update access" on settings for update using (auth.role() = 'authenticated');
create policy "Authenticated insert access" on settings for insert with check (auth.role() = 'authenticated');

create policy "Public read access" on portfolio for select using (true);
create policy "Authenticated all access" on portfolio for all using (auth.role() = 'authenticated');

create policy "Public read access" on testimonials for select using (true);
create policy "Authenticated all access" on testimonials for all using (auth.role() = 'authenticated');

create policy "Public read access" on faqs for select using (true);
create policy "Authenticated all access" on faqs for all using (auth.role() = 'authenticated');

create policy "Public read access" on before_after for select using (true);
create policy "Authenticated all access" on before_after for all using (auth.role() = 'authenticated');

-- Storage Setup (Bucket and Policies)
insert into storage.buckets (id, name, public) 
values ('content', 'content', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'content' );

create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id = 'content' and auth.role() = 'authenticated' );
