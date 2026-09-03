import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Designer } from '../data/designers'
import type { MenuRow } from '../data/menuItems'
import { supabase } from '../lib/supabase'
import { formatDateLabel } from '../utils/date'

interface BookingState {
  menuId: string | null
  designerId: string | null | undefined
  date: string
  time: string
  name: string
  phone: string
  notes: string
}

export default function BookingComplete() {
  const location = useLocation()
  const state = location.state as BookingState | null

  const [menuItem, setMenuItem] = useState<MenuRow | null | undefined>(undefined)
  const [designer, setDesigner] = useState<Designer | null>(null)

  useEffect(() => {
    if (!state?.menuId) {
      setMenuItem(null)
      return
    }

    supabase
      .from('menus')
      .select('*')
      .eq('id', state.menuId)
      .maybeSingle()
      .then(({ data }) => setMenuItem((data as MenuRow | null) ?? null))

    if (state.designerId) {
      supabase
        .from('designers')
        .select('*')
        .eq('id', state.designerId)
        .maybeSingle()
        .then(({ data }) => setDesigner((data as Designer | null) ?? null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (menuItem === undefined) {
    return null
  }

  if (!state || !menuItem) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-ink">예약 정보를 찾을 수 없습니다</h1>
        <Link to="/booking" className="mt-4 inline-block text-accent underline">
          예약하러 가기
        </Link>
      </div>
    )
  }

  const rows = [
    { label: '시술', value: `${menuItem.name} (${menuItem.duration_minutes}분)` },
    { label: '디자이너', value: designer ? `${designer.name} ${designer.title}` : '상관없음' },
    { label: '일시', value: `${formatDateLabel(state.date)} ${state.time}` },
    { label: '예약자', value: `${state.name} / ${state.phone}` },
  ]

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6 sm:py-28">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">Booking Complete</p>
      <h1 className="mt-3 text-2xl font-semibold text-ink">예약이 완료되었습니다</h1>
      <p className="mt-3 text-sm text-ink/70">입력하신 연락처로 예약 확인 안내를 드릴게요.</p>

      <div className="mt-8 rounded-2xl border border-accent/20 bg-white/40 p-6 text-left">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 py-2.5 first:pt-0">
            <span className="shrink-0 text-sm text-ink/50">{row.label}</span>
            <span className="text-right text-sm font-medium text-ink">{row.value}</span>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="mt-10 inline-block rounded-full bg-accent px-8 py-3 text-sm font-medium text-background transition hover:opacity-90"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
