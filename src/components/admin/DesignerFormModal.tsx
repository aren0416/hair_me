import { useState, type FormEvent } from 'react'
import ImageUploadField from './ImageUploadField'
import PortfolioUploadField from './PortfolioUploadField'
import type { Designer } from '../../data/designers'

export type DesignerFormValues = Omit<Designer, 'id'>

interface DesignerFormModalProps {
  initialValue: Designer | null
  onClose: () => void
  onSubmit: (values: DesignerFormValues) => Promise<string | null>
}

const emptyForm: DesignerFormValues = {
  name: '',
  title: '',
  specialties: [],
  years: 0,
  image: '',
  career: [],
  intro: '',
  portfolio: [],
}

function toLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function toTags(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export default function DesignerFormModal({ initialValue, onClose, onSubmit }: DesignerFormModalProps) {
  const [name, setName] = useState(initialValue?.name ?? emptyForm.name)
  const [title, setTitle] = useState(initialValue?.title ?? emptyForm.title)
  const [specialties, setSpecialties] = useState(initialValue?.specialties.join(', ') ?? '')
  const [years, setYears] = useState(String(initialValue?.years ?? ''))
  const [image, setImage] = useState(initialValue?.image ?? emptyForm.image)
  const [career, setCareer] = useState(initialValue?.career.join('\n') ?? '')
  const [intro, setIntro] = useState(initialValue?.intro ?? emptyForm.intro)
  const [portfolio, setPortfolio] = useState<string[]>(initialValue?.portfolio ?? [])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!image) {
      setError('대표 사진을 등록해주세요.')
      return
    }
    setSubmitting(true)
    setError('')
    const message = await onSubmit({
      name,
      title,
      specialties: toTags(specialties),
      years: Number(years) || 0,
      image,
      career: toLines(career),
      intro,
      portfolio,
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
        <h2 className="text-lg font-semibold text-ink">{initialValue ? '디자이너 수정' : '디자이너 추가'}</h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">이름</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 김하나"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">직급</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 원장"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">전문 분야</label>
              <input
                type="text"
                value={specialties}
                onChange={(e) => setSpecialties(e.target.value)}
                placeholder="쉼표로 구분, 예: 커트, 펌"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink/60">경력 연차</label>
              <input
                required
                type="number"
                min={0}
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="예: 12"
                className="w-full rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
          </div>

          <ImageUploadField label="대표 사진" folder="designers" value={image} onChange={setImage} aspect={4 / 3} />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">소개글</label>
            <textarea
              required
              rows={2}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="디자이너 상세 페이지에 보여줄 소개 문구"
              className="w-full resize-none rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink/60">경력 사항</label>
            <textarea
              rows={3}
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              placeholder={'한 줄에 하나씩 입력\n예: JS 헤어 아카데미 수료'}
              className="w-full resize-none rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          <PortfolioUploadField
            label="포트폴리오"
            folder="designer-portfolio"
            value={portfolio}
            onChange={setPortfolio}
            aspect={4 / 3}
          />

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
