create extension if not exists pgcrypto;
create type public.user_role as enum ('subscriber','admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.user_role not null default 'subscriber',
  created_at timestamptz not null default now()
);

create table public.charities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  image_url text,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan text not null check (plan in ('monthly','yearly')),
  status text not null default 'inactive',
  renewal_date date,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create table public.user_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  charity_id uuid references public.charities(id) on delete set null,
  charity_percent integer not null default 10 check (charity_percent between 10 and 100)
);

create table public.golf_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score integer not null check (score between 1 and 45),
  score_date date not null,
  created_at timestamptz not null default now(),
  unique(user_id,score_date)
);

create table public.draws (
  id uuid primary key default gen_random_uuid(),
  month date not null unique,
  draw_type text not null check (draw_type in ('random','algorithmic')),
  status text not null default 'draft',
  seed text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.draw_results (
  id uuid primary key default gen_random_uuid(),
  draw_id uuid not null references public.draws(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  matched_numbers integer not null check (matched_numbers in (3,4,5)),
  prize_amount numeric(12,2) not null default 0,
  winner_status text not null default 'pending',
  proof_url text,
  paid_at timestamptz
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index golf_scores_user_date_idx on public.golf_scores(user_id,score_date desc);
create index draw_results_draw_idx on public.draw_results(draw_id);
create index audit_logs_entity_idx on public.audit_logs(entity_type,entity_id,created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.trim_golf_scores()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.golf_scores
  where user_id = new.user_id
    and id not in (
      select id from public.golf_scores
      where user_id = new.user_id
      order by score_date desc, created_at desc
      limit 5
    );
  return new;
end;
$$;

create trigger golf_scores_keep_latest_five
after insert on public.golf_scores
for each row execute function public.trim_golf_scores();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id,full_name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''));
  insert into public.user_preferences(user_id,charity_percent) values(new.id,10);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.charities enable row level security;
alter table public.subscriptions enable row level security;
alter table public.user_preferences enable row level security;
alter table public.golf_scores enable row level security;
alter table public.draws enable row level security;
alter table public.draw_results enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles self read" on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy "profiles self update" on public.profiles for update using (id=auth.uid() or public.is_admin()) with check (id=auth.uid() or public.is_admin());

create policy "charities public read" on public.charities for select using (active=true or public.is_admin());
create policy "charities admin insert" on public.charities for insert with check (public.is_admin());
create policy "charities admin update" on public.charities for update using (public.is_admin()) with check (public.is_admin());
create policy "charities admin delete" on public.charities for delete using (public.is_admin());

create policy "subscriptions own read" on public.subscriptions for select using (user_id=auth.uid() or public.is_admin());
create policy "subscriptions admin write" on public.subscriptions for insert with check (public.is_admin());
create policy "subscriptions admin update" on public.subscriptions for update using (public.is_admin()) with check (public.is_admin());
create policy "subscriptions admin delete" on public.subscriptions for delete using (public.is_admin());

create policy "preferences own read" on public.user_preferences for select using (user_id=auth.uid() or public.is_admin());
create policy "preferences own insert" on public.user_preferences for insert with check (user_id=auth.uid() or public.is_admin());
create policy "preferences own update" on public.user_preferences for update using (user_id=auth.uid() or public.is_admin()) with check (user_id=auth.uid() or public.is_admin());

create policy "scores own read" on public.golf_scores for select using (user_id=auth.uid() or public.is_admin());
create policy "scores own insert" on public.golf_scores for insert with check (user_id=auth.uid() or public.is_admin());
create policy "scores own update" on public.golf_scores for update using (user_id=auth.uid() or public.is_admin()) with check (user_id=auth.uid() or public.is_admin());
create policy "scores own delete" on public.golf_scores for delete using (user_id=auth.uid() or public.is_admin());

create policy "draws public read published" on public.draws for select using (status='published' or public.is_admin());
create policy "draws admin insert" on public.draws for insert with check (public.is_admin());
create policy "draws admin update" on public.draws for update using (public.is_admin()) with check (public.is_admin());
create policy "draws admin delete" on public.draws for delete using (public.is_admin());

create policy "draw results own read" on public.draw_results for select using (user_id=auth.uid() or public.is_admin());
create policy "draw results admin insert" on public.draw_results for insert with check (public.is_admin());
create policy "draw results admin update" on public.draw_results for update using (public.is_admin()) with check (public.is_admin());
create policy "draw results admin delete" on public.draw_results for delete using (public.is_admin());

create policy "audit own insert" on public.audit_logs for insert with check (actor_id=auth.uid() or public.is_admin());
create policy "audit admin read" on public.audit_logs for select using (public.is_admin());
