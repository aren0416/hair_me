import { useState } from 'react'
import { categories, menuItems } from '../../data/menuItems'

interface StepMenuProps {
  selectedId: string | null
  onSelect: (id: string) => void
  onNext: () => void
}

export default function StepMenu({ selectedId, onSelect, onNext }: StepMenuProps) {
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('all')

  const filtered = menuItems.filter((item) => category === 'all' || item.category === category)

  return (
    <div>
      <h2 className="text-center text-xl font-semibold text-ink">시술 메뉴를 선택해주세요</h2>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c.id
                ? 'bg-accent text-background'
                : 'border border-accent/30 text-ink/70 hover:border-accent'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const isSelected = item.id === selectedId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`overflow-hidden rounded-2xl border bg-white/40 text-left transition ${
                isSelected ? 'border-accent ring-2 ring-accent/30' : 'border-accent/20 hover:border-accent'
              }`}
            >
              <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-4">
                <h3 className="font-semibold text-ink">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-ink/50">{item.duration}</span>
                  <span className="text-sm font-semibold text-accent">{item.price}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          type="button"
          disabled={!selectedId}
          onClick={onNext}
          className="rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  )
}
