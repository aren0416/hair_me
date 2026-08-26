import { useState, type FormEvent } from 'react'
import { categories, type MenuItem } from '../../data/menuItems'

const editableCategories = categories.filter((c) => c.id !== 'all')

export type MenuFormValues = Omit<MenuItem, 'id'>

interface MenuFormModalProps {
  initialValue: MenuItem | null
  onClose: () => void
  onSubmit: (values: MenuFormValues) => void
}

const emptyForm: MenuFormValues = {
  category: 'cut',
  name: '',
  description: '',
  detail: '',
  duration: '',
  price: '',
  image: '',
}

export default function MenuFormModal({ initialValue, onClose, onSubmit }: MenuFormModalProps) {
  const [form, setForm] = useState<MenuFormValues>(
    initialValue
      ? {
          category: initialValue.category,
          name: initialValue.name,
          description: initialValue.description,
          detail: initialValue.detail,
          duration: initialValue.duration,
          price: initialValue.price,
          image: initialValue.image,
        }
      : emptyForm,
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
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
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as MenuFormValues['category'] })}
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="예: 여성 커트"
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">소요 시간</label>
              <input
                required
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="예: 40분"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">가격</label>
              <input
                required
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="예: 55,000원"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">한 줄 소개</label>
            <input
              required
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="목록/카드에 보여줄 짧은 설명"
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">상세 설명</label>
            <textarea
              required
              rows={3}
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              placeholder="상세 페이지에 보여줄 긴 설명"
              className="w-full resize-none rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">이미지 URL</label>
            <input
              required
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
              className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
            {form.image && (
              <img
                src={form.image}
                alt="미리보기"
                className="mt-3 aspect-[4/3] w-full rounded-xl object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                onLoad={(e) => {
                  e.currentTarget.style.display = 'block'
                }}
              />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
