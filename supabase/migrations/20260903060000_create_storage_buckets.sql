-- 이미지 업로드용 스토리지 버킷 4개: 디자이너 대표사진 / 포트폴리오 / 시술 사진 / 아바타
-- 전부 public 버킷(이미지 URL을 그대로 img src에 써야 하므로) + 파일명은 매번 랜덤 UUID라 캐시 충돌 없음

insert into storage.buckets (id, name, public)
values
  ('designer-photos', 'designer-photos', true),
  ('designer-portfolio', 'designer-portfolio', true),
  ('menu-photos', 'menu-photos', true),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 누구나 조회 가능 (공개 이미지)
create policy "public_read_designer_photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'designer-photos');

create policy "public_read_designer_portfolio"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'designer-portfolio');

create policy "public_read_menu_photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'menu-photos');

create policy "public_read_avatars"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'avatars');

-- 업로드/수정/삭제는 관리자만 (디자이너/포트폴리오/시술 사진)
create policy "admin_write_designer_photos"
on storage.objects for all
to authenticated
using (bucket_id = 'designer-photos' and public.is_admin())
with check (bucket_id = 'designer-photos' and public.is_admin());

create policy "admin_write_designer_portfolio"
on storage.objects for all
to authenticated
using (bucket_id = 'designer-portfolio' and public.is_admin())
with check (bucket_id = 'designer-portfolio' and public.is_admin());

create policy "admin_write_menu_photos"
on storage.objects for all
to authenticated
using (bucket_id = 'menu-photos' and public.is_admin())
with check (bucket_id = 'menu-photos' and public.is_admin());

-- 아바타는 본인 폴더(첫 경로 세그먼트 = auth.uid())에만 업로드/수정/삭제 가능
create policy "user_write_own_avatar"
on storage.objects for all
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
