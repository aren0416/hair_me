import { useState, type FormEvent } from 'react'
import ImageUploadField from './ImageUploadField'
import { categories, type MenuItem } from '../../data/menuItems'

const editableCategories = categories.filter((c) => c.id !== 'all')

export interface MenuRow {
  id: string
  category: MenuItem['category']
  name: string
  description: string
  detail: string
  duration_minutes: number
  price: number
  image: string
}

export type MenuFormValues = Omit<MenuRow, 'id'>

interface MenuFormModalProps {
  initialValue: MenuRow | null
  onClose: () => void
  onSubmit: (values: MenuFormValues) => Promise<string | null>
}

const emptyForm = {
  category: 'cut' as MenuItem['category'],
  name: '',
  description: '',
  detail: '',
  duration: '',
  price: '',
  image: '',
}

export default function MenuFormModal({ initialValue, onClose, onSubmit }: MenuFormModalProps) {
  const [category, setCategory] = useState<MenuItem['category']>(initialValue?.category ?? emptyForm.category)
  const [name, setName] = useState(initialValue?.name ?? emptyForm.name)
  const [description, setDescription] = useState(initialValue?.description ?? emptyForm.description)
  const [detail, setDetail] = useState(initialValue?.detail ?? emptyForm.detail)
  const [duration, setDuration] = useState(String(initialValue?.duration_minutes ?? ''))
  const [price, setPrice] = useState(String(initialValue?.price ?? ''))
  const [image, setImage] = useState(initialValue?.image ?? emptyForm.image)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!image) {
      setError('이미지를 등록해주세요.')
      return
    }
    setSubmitting(true)
    setError('')
    const message = await onSubmit({
      category,
      name,
      description,
      detail,
      duration_minutes: Number(duration) || 0,
      price: Number(price) || 0,
      image,
    })
    if (message) {
      setError('저장에 실패했습니다. 잠시 후 다시 시도해주세요.')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 py-10" onClick={onClose}>
      <div
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-background p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-ink">{initialValue ? '메뉴 수정' : '메뉴 추가'}</h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">분류</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as MenuItem['category'])}
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            >
              {editableCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">이름</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 여성 커트"
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">소요 시간(분)</label>
              <input
                required
                type="number"
                min={0}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="예: 40"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">가격(원)</label>
              <input
                required
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="예: 55000"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">한 줄 소개</label>
            <input
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="목록/카드에 보여줄 짧은 설명"
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">상세 설명</label>
            <textarea
              required
              rows={3}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="상세 페이지에 보여줄 긴 설명"
              className="w-full resize-none rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <ImageUploadField label="이미지" folder="menus" value={image} onChange={setImage} aspect={4 / 3} />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
