// menuItems.ts / designers.ts의 로컬 더미 id를 실제 Supabase menus/designers 테이블의 UUID로 매핑.
// 프론트엔드가 아직 이 목록들을 Supabase에서 직접 안 불러오고 로컬 더미를 쓰고 있어서,
// 예약 저장 시점에만 실제 DB의 id로 바꿔주는 임시 다리 역할. (매핑은 시드 마이그레이션 파일과 동일)

export const menuIdToSupabaseId: Record<string, string> = {
  'cut-women': '316ede18-818f-4783-aa2b-069a6b3fdc1c',
  'cut-men': 'b52c069b-10c1-417e-a156-d2c425085a0f',
  'cut-clinic': '46e94386-5b4c-4aee-9ec1-e86d9c1dc03d',
  'perm-volume': '42df9d9b-b20f-44d9-8f0f-81dc9ecf08bc',
  'perm-digital': '845b2940-f608-471f-a70b-bd6c672c5416',
  'perm-setting': 'fe5f5aa3-13b8-4098-82b1-9ff2d65c91fc',
  'color-full': 'e519e3cf-a45d-4ab5-a932-c73e2f4f08e4',
  'color-root': '0ef3021c-583c-4e82-a3cd-55e7d9bd0739',
  'color-balayage': '1b67e8c1-0309-4332-87a2-9102ad682e8e',
  'clinic-protein': 'b7d6bb53-0f82-4031-81dd-a7a1d34a5674',
  'clinic-scalp': 'f237cd3f-2d30-488e-89b4-b7be2a83e3d6',
}

export const designerIdToSupabaseId: Record<string, string> = {
  '1': 'd8843252-fe2f-4af3-8999-94c2b8ec69b6',
  '2': 'fee6a268-f6bf-425e-80b6-dbd16ed30abe',
}
