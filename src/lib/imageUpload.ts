import imageCompression from 'browser-image-compression'
import { supabase } from './supabase'

const BUCKET = 'images'
const MAX_SIZE_BEFORE_COMPRESS = 5 * 1024 * 1024

async function compressIfNeeded(blob: Blob): Promise<Blob> {
  if (blob.size <= MAX_SIZE_BEFORE_COMPRESS) return blob
  const file = blob instanceof File ? blob : new File([blob], 'image.jpg', { type: blob.type || 'image/jpeg' })
  return imageCompression(file, {
    maxSizeMB: 5,
    maxWidthOrHeight: 2400,
    useWebWorker: true,
  })
}

// folder 예: 'designers', 'designer-portfolio', 'menus', 'avatars/{userId}'
// 매번 랜덤 파일명으로 업로드하므로 URL이 항상 새로 생겨 브라우저/CDN 캐시에 이전 이미지가 걸릴 일이 없음
export async function uploadImage(folder: string, blob: Blob): Promise<string> {
  const compressed = await compressIfNeeded(blob)
  const ext = compressed.type === 'image/png' ? 'png' : 'jpg'
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, compressed, {
    contentType: compressed.type || 'image/jpeg',
    cacheControl: '31536000',
  })
  if (error) throw error

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}
