import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Designer } from '../data/designers'
import { supabase } from '../lib/supabase'

export default function DesignerDetail() {
  const { id } = useParams()
  const [designer, setDesigner] = useState<Designer | null | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    supabase
      .from('designers')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        setDesigner((data as Designer | null) ?? null)
      })
  }, [id])

  if (designer === undefined) {
    return null
  }

  if (!designer) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-ink">디자이너를 찾을 수 없습니다</h1>
        <Link to="/designers" className="mt-4 inline-block text-accent underline">
          디자이너 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Profile */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-start gap-10 sm:grid-cols-2 sm:gap-16">
          <img
            src={designer.image}
            alt={designer.name}
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-accent">Designer</p>
            <h1 className="mt-3 text-3xl font-semibold text-ink">
              {designer.name} <span className="text-xl font-normal text-ink/60">{designer.title}</span>
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {designer.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <p className="mt-6 leading-relaxed text-ink/70">"{designer.intro}"</p>

            <div className="mt-8 border-t border-accent/10 pt-6">
              <h2 className="text-sm font-semibold text-ink">경력 {designer.years}년차</h2>
              <ul className="mt-3 space-y-2">
                {designer.career.map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-ink/70">
                    <span className="text-accent">·</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/booking"
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              이 디자이너에게 예약하기
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="border-t border-accent/20 bg-white/40 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">포트폴리오</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {designer.portfolio.map((image) => (
              <img
                key={image}
                src={image}
                alt={`${designer.name} 시술 포트폴리오`}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
