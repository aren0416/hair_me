import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserMenu from './UserMenu'

export default function Header() {
  const { isLoggedIn } = useAuth()
  const isHome = useLocation().pathname === '/'

  return (
    <header
      className={
        isHome
          ? 'absolute inset-x-0 top-0 z-50'
          : 'sticky top-0 z-50 border-b border-accent/20 bg-background/95 backdrop-blur'
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className={`text-xl font-semibold tracking-wide drop-shadow-sm ${
            isHome ? 'text-background' : 'text-ink'
          }`}
        >
          HAIRME
        </Link>

        <nav className={`hidden items-center gap-8 text-sm md:flex ${isHome ? 'text-background/90' : 'text-ink/80'}`}>
          <Link to="/brand" className={isHome ? 'hover:text-background' : 'hover:text-ink'}>
            브랜드
          </Link>
          <Link to="/menu" className={isHome ? 'hover:text-background' : 'hover:text-ink'}>
            시술
          </Link>
          <Link to="/designers" className={isHome ? 'hover:text-background' : 'hover:text-ink'}>
            디자이너
          </Link>
          <Link to="/location" className={isHome ? 'hover:text-background' : 'hover:text-ink'}>
            위치
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <Link
              to="/login"
              className={`hidden text-sm sm:inline ${
                isHome ? 'text-background/90 hover:text-background' : 'text-ink/80 hover:text-ink'
              }`}
            >
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
