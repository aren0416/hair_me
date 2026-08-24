import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-accent/20 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-wide text-ink">
          HAIRME
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink/80 md:flex">
          <Link to="/brand" className="hover:text-ink">
            브랜드
          </Link>
          <Link to="/menu" className="hover:text-ink">
            시술
          </Link>
          <Link to="/designers" className="hover:text-ink">
            디자이너
          </Link>
          <Link to="/location" className="hover:text-ink">
            위치
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className="hidden text-sm text-ink/80 hover:text-ink sm:inline"
            >
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="hidden text-sm text-ink/80 hover:text-ink sm:inline">
              로그인
            </Link>
          )}
          <Link
            to="/booking"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            예약하기
          </Link>
        </div>
      </div>
    </header>
  )
}
