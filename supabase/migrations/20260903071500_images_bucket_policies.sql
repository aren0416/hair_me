-- images 버킷 내 폴더별 접근 정책
-- designers/, designer-portfolio/, menus/ : 조회는 전체 공개, 쓰기는 관리자만
-- avatars/{userId}/ : 조회는 전체 공개, 쓰기는 본인 폴더만

create policy "images_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'images');

create policy "images_admin_write"
on storage.objects for all
to authenticated
using (
  bucket_id = 'images'
  and (storage.foldername(name))[1] in ('designers', 'designer-portfolio', 'menus')
  and public.is_admin()
)
with check (
  bucket_id = 'images'
  and (storage.foldername(name))[1] in ('designers', 'designer-portfolio', 'menus')
  and public.is_admin()
);

create policy "images_own_avatar_write"
on storage.objects for all
to authenticated
using (
  bucket_id = 'images'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'images'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);
