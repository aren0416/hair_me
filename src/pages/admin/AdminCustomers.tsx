import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { supabase } from '../../lib/supabase'
import { formatDateLabel } from '../../utils/date'

type ReservationStatus = '예정' | '완료' | '취소됨'

interface ReservationRow {
  id: string
  date: string
  time: string
  status: ReservationStatus
  menuName: string
  designerId: string | null
  designerName: string
}

interface CustomerRow {
  customerId: string
  name: string
  phone: string
  email: string
  visitCount: number
  lastVisitDate: string | null
  favoriteDesignerName: string
  reservations: ReservationRow[]
}

const statusBadgeClass: Record<ReservationStatus, string> = {
  예정: 'bg-accent/10 text-accent',
  완료: 'bg-ink/10 text-ink/60',
  취소됨: 'bg-ink/5 text-ink/40',
}

function buildCustomers(
  rows: {
    id: string
    date: string
    time: string
    status: ReservationStatus
    customerId: string
    name: string
    phone: string
    email: string
    menuName: string
    designerId: string | null
    designerName: string
  }[],
): CustomerRow[] {
  const groups = new Map<string, typeof rows>()
  for (const row of rows) {
    const list = groups.get(row.customerId) ?? []
    list.push(row)
    groups.set(row.customerId, list)
  }

  return Array.from(groups.entries()).map(([customerId, list]) => {
    const latest = [...list].sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`))[0]
    const completed = list.filter((r) => r.status === '완료')
    const lastVisit = completed.length
      ? completed.reduce((latest, r) => (`${r.date}T${r.time}` > `${latest.date}T${latest.time}` ? r : latest)).date
      : null

    const designerCounts = new Map<string, { name: string; count: number }>()
    for (const r of list) {
      if (!r.designerId) continue
      const entry = designerCounts.get(r.designerId) ?? { name: r.designerName, count: 0 }
      entry.count += 1
      designerCounts.set(r.designerId, entry)
    }
    let favoriteDesignerName = '-'
    let maxCount = 0
    for (const { name, count } of designerCounts.values()) {
      if (count > maxCount) {
        maxCount = count
        favoriteDesignerName = name
      }
    }

    return {
      customerId,
      name: latest.name,
      phone: latest.phone,
      email: latest.email,
      visitCount: completed.length,
      lastVisitDate: lastVisit,
      favoriteDesignerName,
      reservations: list.map((r) => ({
        id: r.id,
        date: r.date,
        time: r.time,
        status: r.status,
        menuName: r.menuName,
        designerId: r.designerId,
        designerName: r.designerName,
      })),
    }
  })
}

const columnHelper = createColumnHelper<CustomerRow>()

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'visitCount', desc: true }])
  const [selected, setSelected] = useState<CustomerRow | null>(null)

  const loadCustomers = useCallback(async () => {
    setDataLoading(true)
    const { data } = await supabase
      .from('reservations')
      .select('id, date, time, status, name, phone, customer_id, menus(name), designers(id, name, title), profiles(email)')

    const rows = (data ?? []).map((r) => ({
      id: r.id as string,
      date: r.date as string,
      time: (r.time as string).slice(0, 5),
      status: r.status as ReservationStatus,
      customerId: r.customer_id as string,
      name: r.name as string,
      phone: r.phone as string,
      email: (r.profiles as unknown as { email: string } | null)?.email ?? '알 수 없음',
      menuName: (r.menus as unknown as { name: string } | null)?.name ?? '알 수 없음',
      designerId: (r.designers as unknown as { id: string } | null)?.id ?? null,
      designerName: r.designers
        ? (() => {
            const designer = r.designers as unknown as { name: string; title: string }
            return `${designer.name} ${designer.title}`
          })()
        : '상관없음',
    }))

    setCustomers(buildCustomers(rows))
    setDataLoading(false)
  }, [])

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])

  const filteredCustomers = useMemo(() => {
    const keyword = search.trim()
    if (!keyword) return customers
    return customers.filter((c) => c.name.includes(keyword) || c.phone.includes(keyword))
  }, [customers, search])

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', { header: '이름' }),
      columnHelper.accessor('phone', { header: '연락처' }),
      columnHelper.accessor('visitCount', {
        header: '방문 횟수',
        cell: (info) => `${info.getValue()}회`,
      }),
      columnHelper.accessor((r) => r.lastVisitDate ?? '', {
        id: 'lastVisitDate',
        header: '최근 방문일',
        cell: (info) => {
          const value = info.row.original.lastVisitDate
          return value ? formatDateLabel(value) : '방문 이력 없음'
        },
      }),
      columnHelper.accessor('favoriteDesignerName', { header: '자주 이용한 디자이너' }),
      columnHelper.display({
        id: 'actions',
        header: '관리',
        cell: (info) => (
          <button
            type="button"
            onClick={() => setSelected(info.row.original)}
            className="rounded-full border border-accent/20 px-3 py-1 text-xs font-medium text-ink/60 transition hover:border-accent"
          >
            상세
          </button>
        ),
      }),
    ],
    [],
  )

  const table = useReactTable({
    data: filteredCustomers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-ink">고객 관리</h1>
        <p className="mt-1 text-sm text-ink/60">예약 기록을 바탕으로 정리된 고객 목록이에요.</p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="이름 또는 연락처로 검색"
        className="mt-6 w-full max-w-xs rounded-xl border border-accent/20 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />

      {dataLoading ? (
        <p className="mt-6 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
          불러오는 중...
        </p>
      ) : filteredCustomers.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
          {customers.length === 0 ? '예약 기록이 없어서 고객 목록이 비어 있어요.' : '검색 결과가 없어요.'}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-accent/20 bg-white/40">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-accent/10">
                  {headerGroup.headers.map((header) => {
                    const sortDir = header.column.getIsSorted()
                    return (
                      <th key={header.id} className="px-5 py-3 text-left text-xs font-medium text-ink/50">
                        {header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1 hover:text-ink"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {sortDir === 'asc' ? '↑' : sortDir === 'desc' ? '↓' : ''}
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-accent/10">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-accent/5">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4 align-top text-ink/80">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected &&
        (() => {
          const customer = selected
          const history = [...customer.reservations].sort((a, b) =>
            `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`),
          )

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 py-10"
              onClick={() => setSelected(null)}
            >
              <div
                className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-background p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold text-ink">{customer.name}</h2>
                <p className="mt-1 text-sm text-ink/50">
                  {customer.phone} · {customer.email}
                </p>

                <div className="mt-4 flex gap-4 border-t border-accent/10 pt-4 text-sm">
                  <div>
                    <p className="text-ink/50">방문 횟수</p>
                    <p className="mt-0.5 font-medium text-ink">{customer.visitCount}회</p>
                  </div>
                  <div>
                    <p className="text-ink/50">최근 방문일</p>
                    <p className="mt-0.5 font-medium text-ink">
                      {customer.lastVisitDate ? formatDateLabel(customer.lastVisitDate) : '방문 이력 없음'}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink/50">자주 이용한 디자이너</p>
                    <p className="mt-0.5 font-medium text-ink">{customer.favoriteDesignerName}</p>
                  </div>
                </div>

                <h3 className="mt-6 text-sm font-semibold text-ink">예약 이력</h3>
                <div className="mt-2 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20">
                  {history.map((r) => (
                    <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{r.menuName}</p>
                        <p className="mt-0.5 text-xs text-ink/50">
                          {formatDateLabel(r.date)} {r.time}
                        </p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass[r.status]}`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
                >
                  닫기
                </button>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
