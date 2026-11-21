create extension if not exists pgcrypto;

create type app_role as enum ('admin', 'manager', 'staff');
create type waitlist_status as enum ('waiting', 'notified', 'seated', 'cancelled');

create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text,
  phone text,
  email text,
  instagram_url text,
  tripadvisor_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  role app_role not null default 'staff',
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  slug text not null,
  sort_order integer not null default 0,
  unique (restaurant_id, slug)
);

create table if not exists public.dishes (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text,
  price_cents integer check (price_cents is null or price_cents >= 0),
  image_url text,
  ingredients text,
  allergens jsonb not null default '[]'::jsonb,
  dietary_tags jsonb not null default '[]'::jsonb,
  is_available boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  model_url text,
  model_ios_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dish_translations (
  dish_id uuid not null references public.dishes(id) on delete cascade,
  locale text not null check (locale in ('es', 'en', 'fr')),
  name text,
  description text,
  primary key (dish_id, locale)
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  guest_name text not null,
  phone text not null,
  party_size integer not null check (party_size between 1 and 20),
  status waitlist_status not null default 'waiting',
  expected_at timestamptz,
  arrived_at timestamptz not null default now(),
  notified_at timestamptz,
  seated_at timestamptz,
  privacy_consent_at timestamptz not null,
  retention_expires_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.restaurants enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.dishes enable row level security;
alter table public.dish_translations enable row level security;
alter table public.waitlist_entries enable row level security;

create policy "published dishes are public" on public.dishes
  for select using (is_published = true);

create policy "published dish translations are public" on public.dish_translations
  for select using (exists (
    select 1 from public.dishes d
    where d.id = dish_id and d.is_published = true
  ));

create policy "restaurant config is public" on public.restaurants
  for select using (true);

create policy "categories are public" on public.categories
  for select using (true);

create policy "staff can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "staff can read restaurant data" on public.categories
  for select using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = categories.restaurant_id
  ));

create policy "staff can manage dishes" on public.dishes
  for all using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = dishes.restaurant_id
      and p.role in ('admin', 'manager')
  )) with check (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = dishes.restaurant_id
      and p.role in ('admin', 'manager')
  ));

create policy "public can join waitlist" on public.waitlist_entries
  for insert with check (deleted_at is null);

create policy "staff can read waitlist" on public.waitlist_entries
  for select using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = waitlist_entries.restaurant_id
  ));

create policy "staff can manage waitlist" on public.waitlist_entries
  for update using (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = waitlist_entries.restaurant_id
  )) with check (exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.restaurant_id = waitlist_entries.restaurant_id
  ));

insert into public.restaurants (
  name,
  slug,
  address,
  phone,
  email,
  instagram_url,
  tripadvisor_url
)
values (
  'TÍPICO BARRA DE TAPAS',
  'tipico',
  'Calle Pagés del Corro 86, 41010 Sevilla, España',
  '+34 955 70 49 41',
  'tipicotapas@gmail.com',
  'https://www.instagram.com/tipicobarradetapas/',
  'https://www.tripadvisor.es/Restaurant_Review-g187443-d13564282-Reviews-Tipico_Barra_De_Tapas-Seville_Province_of_Seville_Andalucia.html'
)
on conflict (slug) do update set
  name = excluded.name,
  address = excluded.address,
  phone = excluded.phone,
  email = excluded.email,
  instagram_url = excluded.instagram_url,
  tripadvisor_url = excluded.tripadvisor_url;
