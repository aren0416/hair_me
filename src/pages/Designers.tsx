import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Designer } from '../data/designers'
import { supabase } from '../lib/supabase'

export default function Designers() {
  const [designers, setDesigners] = useState<Designer[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('designers')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setDesigners((data ?? []) as Designer[])
        setDataLoading(false)
      })
  }, [])

  return (
    <div className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Designers</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">디자이너</h1>
          <p className="mt-4 text-ink/70">각 분야에서 경력을 쌓은 HAIRME의 디자이너를 소개합니다</p>
        </div>

        {dataLoading ? (
          <p className="mt-16 text-center text-sm text-ink/50">불러오는 중...</p>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {designers.map((designer) => (
              <Link
                key={designer.id}
                to={`/designers/${designer.id}`}
                className="group overflow-hidden rounded-2xl border border-accent/20 bg-white/40 transition hover:border-accent"
              >
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-ink">
                    {designer.name} <span className="font-normal text-ink/60">{designer.title}</span>
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {designer.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-ink/60">경력 {designer.years}년차</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
