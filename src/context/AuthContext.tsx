import { createContext, useContext, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useSession } from './SessionContext'

export interface AuthUser {
  name: string
  email: string
  avatarUrl: string
}

const DEFAULT_AVATAR_URL =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'

interface AuthContextValue {
  isLoggedIn: boolean
  user: AuthUser | null
  logout: () => Promise<void>
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AVATAR_STORAGE_KEY = 'hairme_mock_avatar'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session } = useSession()
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem(AVATAR_STORAGE_KEY) || DEFAULT_AVATAR_URL,
  )

  const updateAvatar = (url: string) => {
    setAvatarUrl(url)
    localStorage.setItem(AVATAR_STORAGE_KEY, url)
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const user: AuthUser | null = session
    ? {
        name: (session.user.user_metadata?.name as string | undefined) || session.user.email || '',
        email: session.user.email ?? '',
        avatarUrl,
      }
    : null

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!session, user, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
