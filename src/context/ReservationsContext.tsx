import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface Reservation {
  id: string
  menuId: string
  designerId: string | null
  date: string
  time: string
  name: string
  phone: string
  notes: string
  status: '예정' | '완료' | '취소됨'
  createdAt: string
}

export type NewReservation = Omit<Reservation, 'id' | 'status' | 'createdAt'>

interface ReservationsContextValue {
  reservations: Reservation[]
  addReservation: (reservation: NewReservation) => void
  cancelReservation: (id: string) => void
  completeReservation: (id: string) => void
}

const ReservationsContext = createContext<ReservationsContextValue | null>(null)

const STORAGE_KEY = 'hairme_mock_reservations'

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Reservation[]) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (reservation: NewReservation) => {
    const newReservation: Reservation = {
      ...reservation,
      id: crypto.randomUUID(),
      status: '예정',
      createdAt: new Date().toISOString(),
    }
    setReservations((prev) => [newReservation, ...prev])
  }

  const cancelReservation = (id: string) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: '취소됨' } : r)))
  }

  const completeReservation = (id: string) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: '완료' } : r)))
  }

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, cancelReservation, completeReservation }}
    >
      {children}
    </ReservationsContext.Provider>
  )
}

export function useReservations() {
  const ctx = useContext(ReservationsContext)
  if (!ctx) throw new Error('useReservations must be used within ReservationsProvider')
  return ctx
}
