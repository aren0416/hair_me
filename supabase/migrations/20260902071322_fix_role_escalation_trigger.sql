-- prevent_role_escalation을 "앱을 통해 로그인한 요청"에만 적용되게 수정.
-- auth.uid()가 NULL이면(=SQL Editor 등 앱 바깥에서 DB에 직접 접속한 경우)
-- 관리자 계정을 부트스트랩할 수 있도록 통과시킴.
-- 로그인한 일반 회원이 자기 role을 스스로 바꾸는 실제 위협 시나리오는
-- auth.uid()가 항상 채워져 있으므로 여전히 그대로 막힘.

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;
