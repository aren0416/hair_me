import type { Designer } from '../../data/designers'
import type { MenuItem } from '../../data/menuItems'
import { formatDateLabel } from '../../utils/date'

interface StepReviewProps {
  menuItem: MenuItem
  designer: Designer | null
  date: string
  time: string
  name: string
  phone: string
  notes: string
  onConfirm: () => void
  onBack: () => void
}

export default function StepReview({
  menuItem,
  designer,
  date,
  time,
  name,
  phone,
  notes,
  onConfirm,
  onBack,
}: StepReviewProps) {
  const rows = [
    { label: '시술', value: `${menuItem.name} (${menuItem.duration})` },
    { label: '디자이너', value: designer ? `${designer.name} ${designer.title}` : '상관없음' },
    { label: '일시', value: `${formatDateLabel(date)} ${time}` },
    { label: '예약자', value: `${name} / ${phone}` },
    { label: '요청사항', value: notes || '-' },
    { label: '결제 예정 금액', value: menuItem.price },
  ]

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-center text-xl font-semibold text-ink">예약 내용을 확인해주세요</h2>

      <div className="mt-8 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
        <img src={menuItem.image} alt={menuItem.name} className="aspect-[16/9] w-full object-cover" />
        <div className="divide-y divide-accent/10 p-6">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <span className="shrink-0 text-sm text-ink/50">{row.label}</span>
              <span className="text-right text-sm font-medium text-ink">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-accent/30 px-8 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
        >
          이전
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          예약 확정하기
        </button>
      </div>
    </div>
  )
}
