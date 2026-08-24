import { Link } from 'react-router-dom'

export default function Booking() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-accent/20 bg-white/40 p-10 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Booking</p>
        <h1 className="mt-3 text-2xl font-semibold text-ink">로그인이 필요합니다</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          예약 확인과 안내를 위해 로그인 후 이용하실 수 있어요.
        </p>

        <Link
          to="/login"
          className="mt-8 block w-full rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          로그인
        </Link>
        <Link to="/signup" className="mt-4 block text-sm text-ink/60 hover:text-accent">
          아직 계정이 없으신가요? <span className="font-medium text-accent">회원가입</span>
        </Link>
      </div>
    </div>
  )
}
