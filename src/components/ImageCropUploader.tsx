import { useState } from 'react'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import { getCroppedImageBlob } from '../lib/cropImage'
import { uploadImage } from '../lib/imageUpload'

interface ImageCropUploaderProps {
  imageSrc: string
  aspect: number
  folder: string
  onCancel: () => void
  onUploaded: (url: string) => void
}

export default function ImageCropUploader({ imageSrc, aspect, folder, onCancel, onUploaded }: ImageCropUploaderProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return
    setUploading(true)
    setError('')
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels)
      const url = await uploadImage(folder, blob)
      onUploaded(url)
    } catch {
      setError('이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.')
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-ink/90 p-4">
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
        />
      </div>
      <input
        type="range"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="mt-4 w-full accent-accent"
        aria-label="확대/축소"
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={uploading}
          className="flex-1 rounded-full border border-white/30 py-3 text-sm font-medium text-white transition hover:border-white disabled:opacity-60"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={uploading}
          className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {uploading ? '업로드 중...' : '적용'}
        </button>
      </div>
    </div>
  )
}
