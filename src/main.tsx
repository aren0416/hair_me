import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ReservationsProvider } from './context/ReservationsContext.tsx'
import { SessionProvider } from './context/SessionContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <AuthProvider>
          <ReservationsProvider>
            <App />
          </ReservationsProvider>
        </AuthProvider>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>,
)
