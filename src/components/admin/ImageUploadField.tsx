import { useRef, useState, type ChangeEvent } from 'react'
import ImageCropUploader from '../ImageCropUploader'
import { deleteImageIfOwned } from '../../lib/deleteImage'

interface ImageUploadFieldProps {
  label: string
  folder: string
  value: string
  onChange: (url: string) => void
  aspect?: number
}

export default function ImageUploadField({ label, folder, value, onChange, aspect = 4 / 3 }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setSelectedImage(URL.createObjectURL(file))
  }

  const closeCropModal = () => {
    if (selectedImage) URL.revokeObjectURL(selectedImage)
    setSelectedImage(null)
  }

  const handleUploaded = (url: string) => {
    const previous = value
    onChange(url)
    if (previous) deleteImageIfOwned(previous)
    closeCropModal()
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink/60">{label}</label>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      {value ? (
        <div className="relative">
          <img src={value} alt={label} className="w-full rounded-xl object-cover" style={{ aspectRatio: aspect }} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-ink"
          >
            변경
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-accent/30 bg-white/40 py-8 text-sm text-ink/50 transition hover:border-accent"
        >
          이미지 선택
        </button>
      )}

      {selectedImage && (
        <ImageCropUploader
          imageSrc={selectedImage}
          aspect={aspect}
          folder={folder}
          onCancel={closeCropModal}
          onUploaded={handleUploaded}
        />
      )}
    </div>
  )
}
