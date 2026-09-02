import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/icons'
import { supabase } from '../../lib/supabase'
import { formatDateLabel, toDateKey } from '../../utils/date'

type ReservationStatus = '예정' | '완료' | '취소됨'

interface RecentReservation {
  id: string
  date: string
  time: string
  status: ReservationStatus
  customerName: string
  menuName: string
  designerName: string
}

const statusBadgeClass: Record<ReservationStatus, string> = {
  예정: 'bg-accent/10 text-accent',
  완료: 'bg-ink/10 text-ink/60',
  취소됨: 'bg-ink/5 text-ink/40',
}

const quickLinks = [
  { to: '/admin/reservations', label: '예약 관리', description: '전체 예약을 확인하고 상태를 관리해요.' },
  { to: '/admin/customers', label: '고객 관리', description: '예약 기록 기반 고객 목록을 확인해요.' },
  { to: '/admin/designers', label: '디자이너 관리', description: '디자이너 정보를 등록/수정해요.' },
  { to: '/admin/menus', label: '시술 관리', description: '시술 메뉴와 가격을 등록/수정해요.' },
]

const RECENT_LIMIT = 8

export default function AdminDashboard() {
  const [statsLoading, setStatsLoading] = useState(true)
  const [todayCount, setTodayCount] = useState(0)
  const [monthCount, setMonthCount] = useState(0)
  const [menuCount, setMenuCount] = useState(0)
  const [designerCount, setDesignerCount] = useState(0)
  const [recent, setRecent] = useState<RecentReservation[]>([])
  const [recentLoading, setRecentLoading] = useState(true)

  const loadDashboard = useCallback(async () => {
    setStatsLoading(true)
    setRecentLoading(true)

    const today = new Date()
    const todayKey = toDateKey(today)
    const monthStart = toDateKey(new Date(today.getFullYear(), today.getMonth(), 1))
    const monthEnd = toDateKey(new Date(today.getFullYear(), today.getMonth() + 1, 0))

    const [todayRes, monthRes, menusRes, designersRes, recentRes] = await Promise.all([
      supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('date', todayKey),
      supabase
        .from('reservations')
        .select('id', { count: 'exact', head: true })
        .gte('date', monthStart)
        .lte('date', monthEnd),
      supabase.from('menus').select('id', { count: 'exact', head: true }),
      supabase.from('designers').select('id', { count: 'exact', head: true }),
      supabase
        .from('reservations')
        .select('id, date, time, status, name, menus(name), designers(name, title)')
        .order('created_at', { ascending: false })
        .limit(RECENT_LIMIT),
    ])

    setTodayCount(todayRes.count ?? 0)
    setMonthCount(monthRes.count ?? 0)
    setMenuCount(menusRes.count ?? 0)
    setDesignerCount(designersRes.count ?? 0)
    setStatsLoading(false)

    setRecent(
      (recentRes.data ?? []).map((r) => ({
        id: r.id as string,
        date: r.date as string,
        time: (r.time as string).slice(0, 5),
        status: r.status as ReservationStatus,
        customerName: r.name as string,
        menuName: (r.menus as unknown as { name: string } | null)?.name ?? '알 수 없음',
        designerName: r.designers
          ? (() => {
              const designer = r.designers as unknown as { name: string; title: string }
              return `${designer.name} ${designer.title}`
            })()
          : '상관없음',
      })),
    )
    setRecentLoading(false)
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const summaryCards = [
    { label: '오늘 예약', value: `${todayCount}건` },
    { label: '이번 달 예약', value: `${monthCount}건` },
    { label: '등록된 시술', value: `${menuCount}개` },
    { label: '스타일리스트', value: `${designerCount}명` },
  ]

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-ink">대시보드</h1>
        <p className="mt-1 text-sm text-ink/60">매장 현황을 한눈에 확인해요.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-accent/20 bg-white/40 p-5">
            <p className="text-xs font-medium text-ink/50">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{statsLoading ? '-' : card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink">최근 예약</h2>

        {recentLoading ? (
          <p className="mt-4 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
            불러오는 중...
          </p>
        ) : recent.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
            등록된 예약이 없어요.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-4">
                  <p className="w-20 shrink-0 text-sm font-medium text-ink">
                    {formatDateLabel(r.date)} {r.time}
                  </p>
                  <div>
                    <p className="font-medium text-ink">
                      {r.customerName} <span className="font-normal text-ink/50">· {r.menuName}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-ink/50">담당 {r.designerName}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass[r.status]}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink">빠른 이동</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-white/40 px-5 py-4 transition hover:border-accent"
            >
              <div>
                <p className="font-medium text-ink">{link.label}</p>
                <p className="mt-0.5 text-xs text-ink/50">{link.description}</p>
              </div>
              <ChevronRightIcon className="size-4 shrink-0 text-ink/30" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
