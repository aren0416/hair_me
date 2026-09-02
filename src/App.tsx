import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Booking from './pages/Booking'
import BookingComplete from './pages/BookingComplete'
import Brand from './pages/Brand'
import DesignerDetail from './pages/DesignerDetail'
import Designers from './pages/Designers'
import Home from './pages/Home'
import Location from './pages/Location'
import Login from './pages/Login'
import Menu from './pages/Menu'
import MenuDetail from './pages/MenuDetail'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'

// 관리자 화면은 일반 방문자에게 다운로드되지 않도록 별도 번들로 분리
const AdminRoot = lazy(() => import('./pages/admin/AdminRoot'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminCustomers = lazy(() => import('./pages/admin/AdminCustomers'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminDesigners = lazy(() => import('./pages/admin/AdminDesigners'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminMenus = lazy(() => import('./pages/admin/AdminMenus'))
const AdminReservations = lazy(() => import('./pages/admin/AdminReservations'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/designers" element={<Designers />} />
        <Route path="/designers/:id" element={<DesignerDetail />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/complete" element={<BookingComplete />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/reservations" element={<Navigate to="/mypage" replace />} />
      </Route>

      <Route
        element={
          <Suspense fallback={null}>
            <AdminRoot />
          </Suspense>
        }
      >
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="designers" element={<AdminDesigners />} />
          <Route path="menus" element={<AdminMenus />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
