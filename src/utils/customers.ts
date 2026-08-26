import type { Reservation } from '../context/ReservationsContext'
import { designers } from '../data/designers'

export interface CustomerRow {
  phone: string
  name: string
  visitCount: number
  lastVisitDate: string | null
  favoriteDesignerName: string
  reservations: Reservation[]
}

export function buildCustomers(reservations: Reservation[]): CustomerRow[] {
  const groups = new Map<string, Reservation[]>()
  for (const reservation of reservations) {
    const list = groups.get(reservation.phone) ?? []
    list.push(reservation)
    groups.set(reservation.phone, list)
  }

  return Array.from(groups.entries()).map(([phone, list]) => {
    const latestByCreated = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]
    const completed = list.filter((r) => r.status === '완료')
    const lastVisit = completed.length
      ? completed.reduce((latest, r) => (`${r.date}T${r.time}` > `${latest.date}T${latest.time}` ? r : latest)).date
      : null

    const designerCounts = new Map<string, number>()
    for (const r of list) {
      if (r.designerId) designerCounts.set(r.designerId, (designerCounts.get(r.designerId) ?? 0) + 1)
    }
    let favoriteDesignerId: string | null = null
    let maxCount = 0
    for (const [id, count] of designerCounts) {
      if (count > maxCount) {
        maxCount = count
        favoriteDesignerId = id
      }
    }

    return {
      phone,
      name: latestByCreated.name,
      visitCount: completed.length,
      lastVisitDate: lastVisit,
      favoriteDesignerName: favoriteDesignerId
        ? (designers.find((d) => d.id === favoriteDesignerId)?.name ?? '알 수 없음')
        : '-',
      reservations: list,
    }
  })
}
