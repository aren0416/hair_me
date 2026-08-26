import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/admin', label: '대시보드', end: true },
  { to: '/admin/reservations', label: '예약 관리' },
  { to: '/admin/customers', label: '고객 관리' },
  { to: '/admin/designers', label: '디자이너 관리' },
  { to: '/admin/menus', label: '시술 관리' },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background text-ink">
      <aside className="w-56 shrink-0 border-r border-accent/20 px-4 py-6">
        <p className="mb-8 px-2 text-lg font-semibold">HAIRME Admin</p>
        <nav className="flex flex-col gap-1">
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
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
