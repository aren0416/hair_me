import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useReservations } from '../context/ReservationsContext'
import { designers } from '../data/designers'
import { menuItems } from '../data/menuItems'
import { formatDateLabel } from '../utils/date'

export default function MyReservations() {
  const { isLoggedIn } = useAuth()
  const { reservations, cancelReservation } = useReservations()

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">My Reservations</p>
      <h1 className="mt-3 text-2xl font-semibold text-ink">내 예약 내역</h1>

      {reservations.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-accent/20 bg-white/40 p-10 text-center">
          <p className="text-sm text-ink/60">아직 예약 내역이 없어요.</p>
          <Link
            to="/booking"
            className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            예약하러 가기
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {reservations.map((reservation) => {
            const menuItem = menuItems.find((m) => m.id === reservation.menuId)
            const designer = designers.find((d) => d.id === reservation.designerId)
            if (!menuItem) return null

            return (
              <div key={reservation.id} className="rounded-2xl border border-accent/20 bg-white/40 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-ink">{menuItem.name}</h2>
                    <p className="mt-1 text-sm text-ink/60">
                      {formatDateLabel(reservation.date)} {reservation.time} ·{' '}
                      {designer ? `${designer.name} ${designer.title}` : '디자이너 상관없음'}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      reservation.status === '예정'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-ink/5 text-ink/40'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>

                {reservation.status === '예정' && (
                  <button
                    type="button"
                    onClick={() => cancelReservation(reservation.id)}
                    className="mt-4 rounded-full border border-accent/30 px-5 py-2 text-sm font-medium text-ink/70 transition hover:border-accent"
                  >
                    예약 취소
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
