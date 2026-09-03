-- 4개 버킷(designer-photos/designer-portfolio/menu-photos/avatars) 설계를 단일 버킷으로 재설계
-- 버킷 자체와 업로드된 파일은 Storage API 경로로만 삭제 가능해서(SQL 직접 삭제 불가), Supabase 대시보드에서 수동 삭제함.
-- 여기서는 해당 버킷을 참조하던 RLS 정책만 정리

drop policy if exists "public_read_designer_photos" on storage.objects;
drop policy if exists "public_read_designer_portfolio" on storage.objects;
drop policy if exists "public_read_menu_photos" on storage.objects;
drop policy if exists "public_read_avatars" on storage.objects;
drop policy if exists "admin_write_designer_photos" on storage.objects;
drop policy if exists "admin_write_designer_portfolio" on storage.objects;
drop policy if exists "admin_write_menu_photos" on storage.objects;
drop policy if exists "user_write_own_avatar" on storage.objects;
