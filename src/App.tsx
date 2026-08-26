import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import MainLayout from './layouts/MainLayout'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDesigners from './pages/admin/AdminDesigners'
import AdminMenus from './pages/admin/AdminMenus'
import AdminReservations from './pages/admin/AdminReservations'
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

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="designers" element={<AdminDesigners />} />
        <Route path="menus" element={<AdminMenus />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
