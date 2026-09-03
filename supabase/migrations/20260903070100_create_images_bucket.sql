-- 모든 이미지(디자이너 사진/포트폴리오, 시술 사진, 아바타)를 단일 버킷에 폴더로 구분해서 저장
-- public 버킷: 공개 URL로 읽기 가능. 업로드/수정/삭제 정책은 별도 마이그레이션에서 추가 예정(아래 작업리스트 참고)

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;
