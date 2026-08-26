import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../../components/icons'
import { useReservations, type Reservation } from '../../context/ReservationsContext'
import { designers } from '../../data/designers'
import { menuItems } from '../../data/menuItems'
import { buildCustomers } from '../../utils/customers'
import { addDays, toDateKey } from '../../utils/date'

const statusBadgeClass: Record<Reservation['status'], string> = {
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

export default function AdminDashboard() {
  const { reservations } = useReservations()

  const stats = useMemo(() => {
    const todayKey = toDateKey(new Date())
    const weekEndKey = toDateKey(addDays(new Date(), 6))

    const todayReservations = reservations
      .filter((r) => r.date === todayKey)
      .sort((a, b) => a.time.localeCompare(b.time))

    const upcomingThisWeek = reservations.filter(
      (r) => r.status === '예정' && r.date >= todayKey && r.date <= weekEndKey,
    ).length

    const cancelCount = reservations.filter((r) => r.status === '취소됨').length
    const cancelRate = reservations.length ? Math.round((cancelCount / reservations.length) * 100) : 0

    const customerCount = buildCustomers(reservations).length

    return { todayReservations, upcomingThisWeek, cancelRate, customerCount }
  }, [reservations])

  const summaryCards = [
    { label: '오늘 예약', value: `${stats.todayReservations.length}건` },
    { label: '이번 주 예정 예약', value: `${stats.upcomingThisWeek}건` },
    { label: '전체 고객', value: `${stats.customerCount}명` },
    { label: '취소율', value: `${stats.cancelRate}%` },
  ]

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-ink">대시보드</h1>
        <p className="mt-1 text-sm text-ink/60">오늘의 예약 현황을 한눈에 확인해요.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-accent/20 bg-white/40 p-5">
            <p className="text-xs font-medium text-ink/50">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink">오늘의 예약</h2>

        {stats.todayReservations.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
            오늘 예정된 예약이 없어요.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
            {stats.todayReservations.map((r) => {
              const menuName = menuItems.find((m) => m.id === r.menuId)?.name ?? '알 수 없음'
              const designerName = r.designerId
                ? (designers.find((d) => d.id === r.designerId)?.name ?? '알 수 없음')
                : '상관없음'

              return (
                <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex items-center gap-4">
                    <p className="w-14 shrink-0 text-sm font-medium text-ink">{r.time}</p>
                    <div>
                      <p className="font-medium text-ink">
                        {r.name} <span className="font-normal text-ink/50">· {menuName}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-ink/50">담당 {designerName}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass[r.status]}`}>
                    {r.status}
                  </span>
                </div>
              )
            })}
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
