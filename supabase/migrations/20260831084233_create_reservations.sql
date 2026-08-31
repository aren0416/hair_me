-- reservations: 예약 (고객 마이페이지/예약 플로우 + 관리자 예약/고객/대시보드 화면에서 공유)

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users (id) on delete cascade,
  menu_id uuid not null references public.menus (id) on delete restrict,
  designer_id uuid references public.designers (id) on delete set null,
  date date not null,
  time time not null,
  name text not null,
  phone text not null,
  notes text not null default '',
  status text not null default '예정' check (status in ('예정', '완료', '취소됨')),
  created_at timestamptz not null default now()
);

create index reservations_customer_id_idx on public.reservations (customer_id);
create index reservations_date_idx on public.reservations (date);

alter table public.reservations enable row level security;

-- 본인 예약 또는 관리자만 조회 가능
create policy "reservations_select_own_or_admin"
on public.reservations for select
to authenticated
using (customer_id = auth.uid() or public.is_admin());

-- 본인 명의로만, 상태는 '예정'으로만 새 예약 생성 가능
create policy "reservations_insert_own"
on public.reservations for insert
to authenticated
with check (customer_id = auth.uid() and status = '예정');

-- 수정은 본인 또는 관리자만 (실제 허용 범위는 아래 트리거가 다시 한 번 제한)
create policy "reservations_update_own_or_admin"
on public.reservations for update
to authenticated
using (customer_id = auth.uid() or public.is_admin())
with check (customer_id = auth.uid() or public.is_admin());

-- 일반 고객은 자신의 '예정' 예약을 '취소됨'으로 바꾸는 것만 가능 (완료 처리 등은 관리자만)
create or replace function public.enforce_reservation_update_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if old.status = '예정' and new.status = '취소됨' then
    new.menu_id := old.menu_id;
    new.designer_id := old.designer_id;
    new.date := old.date;
    new.time := old.time;
    new.name := old.name;
    new.phone := old.phone;
    new.notes := old.notes;
    new.customer_id := old.customer_id;
    return new;
  end if;

  raise exception '예약 취소 외의 변경은 관리자만 가능합니다.';
end;
$$;

create trigger reservations_enforce_update_rules
before update on public.reservations
for each row execute function public.enforce_reservation_update_rules();
