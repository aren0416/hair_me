import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useReservations } from '../context/ReservationsContext'

export default function MyPage() {
  const { isLoggedIn, logout } = useAuth()
  const { reservations } = useReservations()

  if (!isLoggedIn) {
    return <LoginForm />
  }

  const upcomingCount = reservations.filter((r) => r.status === '예정').length

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">My Page</p>
      <h1 className="mt-3 text-2xl font-semibold text-ink">마이페이지</h1>
      <p className="mt-2 text-sm text-ink/60">예약 내역을 확인하고 관리할 수 있어요.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/mypage/reservations"
          className="rounded-2xl border border-accent/20 bg-white/40 p-6 transition hover:border-accent"
        >
          <h2 className="font-semibold text-ink">내 예약 내역</h2>
          <p className="mt-2 text-sm text-ink/60">예정된 예약 {upcomingCount}건</p>
        </Link>

        <Link
          to="/booking"
          className="rounded-2xl border border-accent/20 bg-white/40 p-6 transition hover:border-accent"
        >
          <h2 className="font-semibold text-ink">새 예약하기</h2>
          <p className="mt-2 text-sm text-ink/60">원하는 시간에 새로운 예약을 진행해요</p>
        </Link>
      </div>

      <button
        type="button"
        onClick={logout}
        className="mt-10 rounded-full border border-accent/30 px-6 py-2.5 text-sm font-medium text-ink/70 transition hover:border-accent"
      >
        로그아웃
      </button>
    </div>
  )
}
