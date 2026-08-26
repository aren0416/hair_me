import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface MockUser {
  name: string
  email: string
  avatarUrl: string
}

export const MOCK_USER: MockUser = {
  name: '홍길동',
  email: 'test@hairme.com',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
}

interface AuthContextValue {
  isLoggedIn: boolean
  user: MockUser | null
  login: () => void
  logout: () => void
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'hairme_mock_auth'
const AVATAR_STORAGE_KEY = 'hairme_mock_avatar'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')
  const [avatarUrl, setAvatarUrl] = useState(() => localStorage.getItem(AVATAR_STORAGE_KEY) || MOCK_USER.avatarUrl)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isLoggedIn))
  }, [isLoggedIn])

  const updateAvatar = (url: string) => {
    setAvatarUrl(url)
    localStorage.setItem(AVATAR_STORAGE_KEY, url)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user: isLoggedIn ? { ...MOCK_USER, avatarUrl } : null,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
