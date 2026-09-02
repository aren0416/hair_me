import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabaseAdmin } from '../lib/supabaseAdmin'

type AdminRole = 'customer' | 'admin'

interface AdminAuthContextValue {
  isLoggedIn: boolean
  loading: boolean
  isAdmin: boolean
  roleLoading: boolean
  logout: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<AdminRole | null>(null)
  const [roleLoading, setRoleLoading] = useState(true)

  useEffect(() => {
    supabaseAdmin.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabaseAdmin.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return

    let cancelled = false
    setRoleLoading(true)

    supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        if (cancelled) return
        setRole((data?.role as AdminRole | undefined) ?? null)
        setRoleLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [session])

  const effectiveRole = session ? role : null
  const effectiveRoleLoading = session ? roleLoading : false

  const logout = async () => {
    await supabaseAdmin.auth.signOut()
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isLoggedIn: !!session,
        loading,
        isAdmin: effectiveRole === 'admin',
        roleLoading: effectiveRoleLoading,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
