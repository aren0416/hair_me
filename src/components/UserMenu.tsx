import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoutIcon, UserIcon } from './icons'

export default function UserMenu() {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="사용자 메뉴"
        className="flex size-9 items-center justify-center rounded-full bg-accent text-background transition hover:opacity-90"
      >
        <UserIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-accent/20 bg-background shadow-lg">
          <Link
            to="/mypage"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink/80 hover:bg-accent/10 hover:text-ink"
          >
            <UserIcon />
            마이페이지
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink/80 hover:bg-accent/10 hover:text-ink"
          >
            <LogoutIcon />
            로그아웃
          </button>
        </div>
      )}
    </div>
  )
}
