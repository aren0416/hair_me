import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

interface MenuItem {
  id: string
  category: 'cut' | 'perm' | 'color' | 'clinic'
  name: string
  description: string
  duration: string
  price: string
  image: string
}

const categories = [
  { id: 'all', label: '전체' },
  { id: 'cut', label: '커트' },
  { id: 'perm', label: '펌' },
  { id: 'color', label: '컬러' },
  { id: 'clinic', label: '클리닉' },
] as const

const menuItems: MenuItem[] = [
  {
    id: 'cut-women',
    category: 'cut',
    name: '여성 커트',
    description: '얼굴형과 모질을 고려한 맞춤 디자인 커트',
    duration: '40분',
    price: '55,000원',
    image: 'https://images.unsplash.com/photo-1647462741351-4e7a5e7317c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-men',
    category: 'cut',
    name: '남성 커트',
    description: '얼굴형에 맞춘 클래식 & 트렌디 스타일링 커트',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-clinic',
    category: 'cut',
    name: '클리닉컷',
    description: '손상모를 정리하는 정교한 라인 트리밍',
    duration: '15분',
    price: '15,000원',
    image: 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-volume',
    category: 'perm',
    name: '볼륨펌',
    description: '자연스러운 볼륨과 웨이브를 살리는 맞춤 펌',
    duration: '120분',
    price: '110,000원',
    image: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-digital',
    category: 'perm',
    name: '디지털펌',
    description: '세팅력이 오래 유지되는 히트 펌',
    duration: '150분',
    price: '130,000원',
    image: 'https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-setting',
    category: 'perm',
    name: '셋팅펌',
    description: '차분한 웨이브로 아침 스타일링 시간을 줄여주는 펌',
    duration: '130분',
    price: '120,000원',
    image: 'https://images.unsplash.com/photo-1647462741268-e5724e5886c0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-full',
    category: 'color',
    name: '전체 염색',
    description: '퍼스널 컬러와 피부톤을 고려한 맞춤 헤어 컬러',
    duration: '90분',
    price: '95,000원',
    image: 'https://images.unsplash.com/photo-1638064432648-bc2f9a91b06b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-root',
    category: 'color',
    name: '뿌리 염색',
    description: '자란 새치와 뿌리 부분만 깔끔하게 정리',
    duration: '60분',
    price: '65,000원',
    image: 'https://images.unsplash.com/photo-1695527081848-1e46c06e6458?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-balayage',
    category: 'color',
    name: '발레아쥬',
    description: '자연스러운 그러데이션을 살린 컬러 디자인',
    duration: '150분',
    price: '180,000원',
    image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-protein',
    category: 'clinic',
    name: '단백질 클리닉',
    description: '손상모 회복을 위한 집중 단백질 케어',
    duration: '40분',
    price: '40,000원',
    image: 'https://images.unsplash.com/photo-1785860333038-5c6dce348544?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-scalp',
    category: 'clinic',
    name: '두피 스케일링',
    description: '두피 건강을 위한 딥클렌징 케어',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1626379464632-cc45ac86daae?auto=format&fit=crop&w=800&q=80',
  },
]

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
