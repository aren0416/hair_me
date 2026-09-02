-- auth.users는 REST API로 직접 조회할 수 없어서, 관리자가 예약 목록에서
-- 고객 이메일을 볼 수 있도록 profiles에 email을 복사해서 저장함

alter table public.profiles add column email text not null default '';

-- 기존 계정들 이메일 백필
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id;

-- 신규 가입 시에도 email이 같이 채워지도록 트리거 갱신
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, phone, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    new.email,
    'customer'
  );
  return new;
end;
$$;

-- reservations.customer_id가 profiles와도 직접 연결되도록 FK 추가
-- (PostgREST가 예약 조회 시 고객 정보를 자동으로 같이 가져올 수 있게)
alter table public.reservations
  add constraint reservations_customer_id_profiles_fkey
  foreign key (customer_id) references public.profiles (id);
