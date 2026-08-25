import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { CalendarIcon, ChevronRightIcon, ListIcon, PhoneIcon } from '../components/icons'
import { useAuth } from '../context/AuthContext'
import { useReservations, type Reservation } from '../context/ReservationsContext'
import { designers } from '../data/designers'
import { menuItems } from '../data/menuItems'
import { formatDateLabel } from '../utils/date'

const quickActions = [
  { to: '/booking', label: '새 예약', icon: CalendarIcon },
  { to: '/menu', label: '시술 메뉴', icon: ListIcon },
  { to: 'tel:02-555-2847', label: '고객센터', icon: PhoneIcon },
]

export default function MyPage() {
  const { isLoggedIn, user } = useAuth()
  const { reservations, cancelReservation } = useReservations()
  const [selected, setSelected] = useState<Reservation | null>(null)

  if (!isLoggedIn || !user) {
    return <LoginForm />
  }

  const sortedReservations = [...reservations].sort((a, b) =>
    `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`),
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28">
      {/* 내 정보 */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="size-28 rounded-full object-cover"
        />
        <h1 className="mt-4 text-xl font-semibold text-ink">{user.name}</h1>
        <p className="mt-1 text-sm text-ink/60">{user.email}</p>

        <button
          type="button"
          disabled
          className="mt-4 flex cursor-not-allowed items-center gap-1.5 rounded-full border border-accent/20 px-5 py-2 text-sm text-ink/40"
        >
          내 정보 수정
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">준비중</span>
        </button>
      </div>

      {/* 퀵 액션 */}
      <div className="mt-10 grid grid-cols-3 gap-3">
        {quickActions.map((action) => {
          const className =
            'flex flex-col items-center gap-2 rounded-2xl border border-accent/20 bg-white/40 py-5 transition hover:border-accent'
          const content = (
            <>
              <span className="flex size-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <action.icon />
              </span>
              <span className="text-xs font-medium text-ink/70">{action.label}</span>
            </>
          )
          return action.to.startsWith('tel:') ? (
            <a key={action.label} href={action.to} className={className}>
              {content}
            </a>
          ) : (
            <Link key={action.label} to={action.to} className={className}>
              {content}
            </Link>
          )
        })}
      </div>

      {/* 예약내역 */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink">예약내역</h2>

        {sortedReservations.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-accent/20 bg-white/40 p-10 text-center">
            <p className="text-sm text-ink/60">아직 예약 내역이 없어요.</p>
            <Link
              to="/booking"
              className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              예약하러 가기
            </Link>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
            {sortedReservations.map((reservation) => {
              const menuItem = menuItems.find((m) => m.id === reservation.menuId)
              if (!menuItem) return null

              return (
                <button
                  key={reservation.id}
                  type="button"
                  onClick={() => setSelected(reservation)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-accent/5"
                >
                  <div>
                    <p className="font-medium text-ink">{menuItem.name}</p>
                    <p className="mt-1 text-xs text-ink/50">
                      {formatDateLabel(reservation.date)} {reservation.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        reservation.status === '예정'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-ink/5 text-ink/40'
                      }`}
                    >
                      {reservation.status}
                    </span>
                    <ChevronRightIcon className="size-4 text-ink/30" />
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* 예약 상세 모달 */}
      {selected &&
        (() => {
          const menuItem = menuItems.find((m) => m.id === selected.menuId)
          const designer = designers.find((d) => d.id === selected.designerId)
          if (!menuItem) return null

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
              onClick={() => setSelected(null)}
            >
              <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-background"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={menuItem.image} alt={menuItem.name} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-ink">{menuItem.name}</h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        selected.status === '예정' ? 'bg-accent/10 text-accent' : 'bg-ink/5 text-ink/40'
                      }`}
                    >
                      {selected.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-accent/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ink/50">일시</span>
                      <span className="font-medium text-ink">
                        {formatDateLabel(selected.date)} {selected.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/50">디자이너</span>
                      <span className="font-medium text-ink">
                        {designer ? `${designer.name} ${designer.title}` : '상관없음'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/50">요청사항</span>
                      <span className="font-medium text-ink">{selected.notes || '-'}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="flex-1 rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
                    >
                      닫기
                    </button>
                    {selected.status === '예정' && (
                      <button
                        type="button"
                        onClick={() => {
                          cancelReservation(selected.id)
                          setSelected(null)
                        }}
                        className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90"
                      >
                        예약 취소
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
