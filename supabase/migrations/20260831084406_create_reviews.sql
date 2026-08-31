-- reviews: 시술 후기 (메뉴 상세 페이지에서 노출)
-- 지금은 고객이 직접 후기를 작성하는 기능이 없어서 관리자만 등록/수정 가능하게 둠

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  menu_id uuid not null references public.menus (id) on delete cascade,
  designer_id uuid references public.designers (id) on delete set null,
  user_name text not null,
  rating integer not null check (rating between 1 and 5),
  content text not null default '',
  created_at timestamptz not null default now()
);

create index reviews_menu_id_idx on public.reviews (menu_id);

alter table public.reviews enable row level security;

-- 누구나(비로그인 포함) 조회 가능 - 메뉴 상세 페이지에서 필요
create policy "reviews_select_all"
on public.reviews for select
to anon, authenticated
using (true);

-- 등록/수정/삭제는 관리자만
create policy "reviews_admin_write"
on public.reviews for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
