-- menus: 시술 메뉴 (고객용 메뉴 페이지 + 관리자 시술 관리 화면에서 공유)
-- 가격/소요시간은 매출 계산을 위해 처음부터 숫자형으로 저장

create table public.menus (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('cut', 'perm', 'color', 'clinic')),
  name text not null,
  description text not null default '',
  detail text not null default '',
  duration_minutes integer not null default 0,
  price integer not null default 0,
  image text,
  created_at timestamptz not null default now()
);

alter table public.menus enable row level security;

-- 누구나(비로그인 포함) 조회 가능 - 고객용 메뉴 페이지에서 필요
create policy "menus_select_all"
on public.menus for select
to anon, authenticated
using (true);

-- 등록/수정/삭제는 관리자만
create policy "menus_admin_write"
on public.menus for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
