-- profiles.role를 text+check 대신 진짜 enum 타입으로 바꿈
-- check 제약조건은 나중에 실수로 지워질 수 있는 "규칙"일 뿐이지만,
-- enum은 컬럼 타입 자체가 customer/admin 외의 값을 저장할 수 없게 만듦

create type public.user_role as enum ('customer', 'admin');

alter table public.profiles
  alter column role drop default;

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  alter column role type public.user_role using role::public.user_role;

alter table public.profiles
  alter column role set default 'customer'::public.user_role;
