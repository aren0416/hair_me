import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { useSession } from './SessionContext'

export interface AuthUser {
  name: string
  email: string
  avatarUrl: string
}

export type UserRole = 'customer' | 'admin'

const DEFAULT_AVATAR_URL =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'

interface AuthContextValue {
  isLoggedIn: boolean
  loading: boolean
  user: AuthUser | null
  role: UserRole | null
  roleLoading: boolean
  isAdmin: boolean
  logout: () => Promise<void>
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, loading } = useSession()
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR_URL)
  const [role, setRole] = useState<UserRole | null>(null)
  const [roleLoading, setRoleLoading] = useState(true)

  useEffect(() => {
    if (!session) return

    let cancelled = false
    setRoleLoading(true)

    supabase
      .from('profiles')
      .select('role, avatar_url')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        if (cancelled) return
        setRole((data?.role as UserRole | undefined) ?? null)
        setAvatarUrl((data?.avatar_url as string | null) || DEFAULT_AVATAR_URL)
        setRoleLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [session])

  const effectiveRole = session ? role : null
  const effectiveRoleLoading = session ? roleLoading : false

  const updateAvatar = (url: string) => {
    setAvatarUrl(url)
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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!session,
        loading,
        user,
        role: effectiveRole,
        roleLoading: effectiveRoleLoading,
        isAdmin: effectiveRole === 'admin',
        logout,
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
