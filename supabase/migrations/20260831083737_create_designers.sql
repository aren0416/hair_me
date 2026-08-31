-- designers: 디자이너 정보 (고객용 소개 페이지 + 관리자 디자이너 관리 화면에서 공유)

create table public.designers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null default '',
  specialties text[] not null default '{}',
  years integer not null default 0,
  image text,
  career text[] not null default '{}',
  intro text not null default '',
  portfolio text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.designers enable row level security;

-- 누구나(비로그인 포함) 조회 가능 - 고객용 디자이너 소개 페이지에서 필요
create policy "designers_select_all"
on public.designers for select
to anon, authenticated
using (true);

-- 등록/수정/삭제는 관리자만
create policy "designers_admin_write"
on public.designers for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
