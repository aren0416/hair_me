import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, type MenuRow } from '../data/menuItems'
import { supabase } from '../lib/supabase'

export default function Menu() {
  const [items, setItems] = useState<MenuRow[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]['id']>('all')

  const loadItems = useCallback(async () => {
    setDataLoading(true)
    const { data } = await supabase.from('menus').select('*').order('created_at', { ascending: true })
    setItems((data ?? []) as MenuRow[])
    setDataLoading(false)
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesQuery = item.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [items, query, category])

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
        {dataLoading ? (
          <p className="mt-16 text-center text-sm text-ink/50">불러오는 중...</p>
        ) : filtered.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <Link
                key={item.id}
                to={`/menu/${item.id}`}
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
                    <span className="text-xs text-ink/50">{item.duration_minutes}분</span>
                    <span className="font-semibold text-accent">{item.price.toLocaleString('ko-KR')}원</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-ink/50">해당 시술이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
