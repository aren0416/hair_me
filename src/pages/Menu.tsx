import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, menuItems, type MenuItem } from '../data/menuItems'

export default function Menu() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('all')
  const [selected, setSelected] = useState<MenuItem | null>(null)

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesQuery = item.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Treatment</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">시술 안내</h1>
          <p className="mt-4 text-ink/70">원하는 시술을 검색하거나 카테고리에서 찾아보세요</p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="시술명으로 검색 (예: 커트)"
            className="w-full rounded-full border border-accent/30 bg-white/60 px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none"
          />
        </div>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                category === c.id
                  ? 'bg-accent text-background'
                  : 'border border-accent/30 text-ink/70 hover:border-accent'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group overflow-hidden rounded-2xl border border-accent/20 bg-white/40 text-left transition hover:border-accent"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
                  <p className="mt-1 text-sm text-ink/60 line-clamp-1">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-accent/10 pt-3">
                    <span className="text-xs text-ink/50">{item.duration}</span>
                    <span className="font-semibold text-accent">{item.price}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-ink/50">해당 시술이 없습니다.</p>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.image} alt={selected.name} className="aspect-[4/3] w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-ink">{selected.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{selected.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-accent/10 pt-4">
                <span className="text-sm text-ink/60">소요시간 {selected.duration}</span>
                <span className="text-lg font-semibold text-accent">{selected.price}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex-1 rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
                >
                  닫기
                </button>
                <Link
                  to="/booking"
                  className="flex-1 rounded-full bg-accent py-3 text-center text-sm font-medium text-background transition hover:opacity-90"
                >
                  예약하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
