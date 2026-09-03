import { useRef, useState, type ChangeEvent } from 'react'
import ImageCropUploader from '../ImageCropUploader'
import { TrashIcon } from '../icons'
import { deleteImageIfOwned } from '../../lib/deleteImage'

interface PortfolioUploadFieldProps {
  label: string
  folder: string
  value: string[]
  onChange: (urls: string[]) => void
  aspect?: number
}

export default function PortfolioUploadField({
  label,
  folder,
  value,
  onChange,
  aspect = 4 / 3,
}: PortfolioUploadFieldProps) {
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
    onChange([...value, url])
    closeCropModal()
  }

  const handleRemove = (index: number) => {
    const removed = value[index]
    onChange(value.filter((_, i) => i !== index))
    deleteImageIfOwned(removed)
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink/60">{label}</label>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <div className="grid grid-cols-3 gap-2">
        {value.map((url, index) => (
          <div key={url} className="relative">
            <img
              src={url}
              alt={`${label} ${index + 1}`}
              className="w-full rounded-xl object-cover"
              style={{ aspectRatio: aspect }}
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              aria-label="이미지 삭제"
              className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-ink/70 text-white transition hover:bg-red-500"
            >
              <TrashIcon className="size-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{ aspectRatio: aspect }}
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-accent/30 bg-white/40 text-sm text-ink/50 transition hover:border-accent"
        >
          + 추가
        </button>
      </div>

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
