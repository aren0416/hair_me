import { NavLink, Outlet } from 'react-router-dom'
import { LogoutIcon } from '../components/icons'
import { useAdminAuth } from '../context/AdminAuthContext'
import NotFound from '../pages/NotFound'

const navItems = [
  { to: '/admin', label: '대시보드', end: true },
  { to: '/admin/reservations', label: '예약 관리' },
  { to: '/admin/customers', label: '고객 관리' },
  { to: '/admin/designers', label: '디자이너 관리' },
  { to: '/admin/menus', label: '시술 관리' },
  { to: '/admin/settings', label: '매장 설정' },
]

export default function AdminLayout() {
  const { isLoggedIn, loading, isAdmin, roleLoading, logout } = useAdminAuth()

  if (loading || (isLoggedIn && roleLoading)) {
    return null
  }

  if (!isLoggedIn || !isAdmin) {
    return <NotFound />
  }

  return (
    <div className="flex min-h-screen bg-background text-ink">
      <aside className="flex w-56 shrink-0 flex-col border-r border-accent/20 px-4 py-6">
        <p className="mb-8 px-2 text-lg font-semibold">HAIRME Admin</p>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-accent text-background' : 'text-ink/80 hover:bg-accent/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/60 transition hover:bg-accent/10 hover:text-ink"
        >
          <LogoutIcon className="size-4" />
          로그아웃
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
