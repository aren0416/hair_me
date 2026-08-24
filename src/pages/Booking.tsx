import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'

export default function Booking() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 text-center sm:px-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Booking</p>
        <h1 className="mt-3 text-2xl font-semibold text-ink">로그인 완료</h1>
        <p className="mt-3 text-sm text-ink/70">예약 진행 화면은 다음 단계에서 제작할 예정입니다.</p>
      </div>
    </div>
  )
}
