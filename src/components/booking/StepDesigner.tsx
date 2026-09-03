import type { Designer } from '../../data/designers'

interface StepDesignerProps {
  designers: Designer[]
  loading: boolean
  selectedId: string | null | undefined
  onSelect: (id: string | null) => void
  onNext: () => void
  onBack: () => void
}

export default function StepDesigner({ designers, loading, selectedId, onSelect, onNext, onBack }: StepDesignerProps) {
  return (
    <div>
      <h2 className="text-center text-xl font-semibold text-ink">디자이너를 선택해주세요</h2>

      {loading ? (
        <p className="mt-10 text-center text-sm text-ink/50">불러오는 중...</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {designers.map((designer) => {
            const isSelected = designer.id === selectedId
            return (
              <button
                key={designer.id}
                type="button"
                onClick={() => onSelect(designer.id)}
                className={`overflow-hidden rounded-2xl border bg-white/40 text-left transition ${
                  isSelected ? 'border-accent ring-2 ring-accent/30' : 'border-accent/20 hover:border-accent'
                }`}
              >
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-ink">
                    {designer.name} <span className="font-normal text-ink/60">{designer.title}</span>
                  </h3>
                  <p className="mt-1 text-xs text-ink/50">{designer.specialties.join(' · ')}</p>
                </div>
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
              selectedId === null ? 'border-accent ring-2 ring-accent/30' : 'border-accent/20 hover:border-accent'
            }`}
          >
            <span className="font-semibold text-ink">디자이너 상관없음</span>
            <span className="mt-1 text-xs text-ink/50">가능한 디자이너로 배정해드려요</span>
          </button>
        </div>
      )}

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
          disabled={selectedId === undefined}
          onClick={onNext}
          className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
