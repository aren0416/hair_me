import { supabase } from './supabase'

const BUCKET = 'images'

// 우리 버킷에 올라간 이미지가 아니면(과거 외부 URL 등) 조용히 무시
// 압축 라이브러리를 쓰지 않는 가벼운 파일로 따로 분리 — uploadImage와 묶으면
// 삭제만 하는 화면(예: 마이페이지)도 이미지 압축 라이브러리를 번들에 함께 받게 됨
export async function deleteImageIfOwned(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return
  const path = url.slice(idx + marker.length)
  await supabase.storage.from(BUCKET).remove([path])
}
