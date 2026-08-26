import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { useReservations, type Reservation } from '../../context/ReservationsContext'
import { designers } from '../../data/designers'
import { menuItems } from '../../data/menuItems'
import { formatDateLabel } from '../../utils/date'

interface ReservationRow extends Reservation {
  menuName: string
  designerName: string
}

const statusOptions = ['전체', '예정', '완료', '취소됨'] as const

const statusBadgeClass: Record<Reservation['status'], string> = {
  예정: 'bg-accent/10 text-accent',
  완료: 'bg-ink/10 text-ink/60',
  취소됨: 'bg-ink/5 text-ink/40',
}

const columnHelper = createColumnHelper<ReservationRow>()

export default function AdminReservations() {
  const { reservations, cancelReservation, completeReservation } = useReservations()
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>('전체')
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'dateTime', desc: false }])
  const [selected, setSelected] = useState<ReservationRow | null>(null)

  const rows = useMemo<ReservationRow[]>(
    () =>
      reservations.map((r) => ({
        ...r,
        menuName: menuItems.find((m) => m.id === r.menuId)?.name ?? '알 수 없음',
        designerName: r.designerId
          ? (designers.find((d) => d.id === r.designerId)?.name ?? '알 수 없음')
          : '상관없음',
      })),
    [reservations],
  )

  const filteredRows = useMemo(
    () =>
      rows.filter((r) => {
        if (statusFilter !== '전체' && r.status !== statusFilter) return false
        const keyword = search.trim()
        if (!keyword) return true
        return r.name.includes(keyword) || r.phone.includes(keyword)
      }),
    [rows, statusFilter, search],
  )

  const columns = useMemo(
    () => [
      columnHelper.accessor((r) => `${r.date}T${r.time}`, {
        id: 'dateTime',
        header: '날짜/시간',
        cell: (info) => (
          <span>
            {formatDateLabel(info.row.original.date)} {info.row.original.time}
          </span>
        ),
      }),
      columnHelper.accessor('name', {
        header: '고객',
        cell: (info) => (
          <div>
            <p className="font-medium text-ink">{info.getValue()}</p>
            <p className="text-xs text-ink/50">{info.row.original.phone}</p>
          </div>
        ),
      }),
      columnHelper.accessor('menuName', { header: '메뉴' }),
      columnHelper.accessor('designerName', { header: '디자이너' }),
      columnHelper.accessor('status', {
        header: '상태',
        cell: (info) => (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass[info.getValue()]}`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: '접수일',
        cell: (info) => new Date(info.getValue()).toLocaleDateString('ko-KR'),
      }),
      columnHelper.display({
        id: 'actions',
        header: '관리',
        cell: (info) => {
          const reservation = info.row.original
          return (
            <div className="flex items-center gap-2">
              {reservation.status === '예정' && (
                <>
                  <button
                    type="button"
                    onClick={() => completeReservation(reservation.id)}
                    className="rounded-full border border-accent/30 px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent/10"
                  >
                    완료 처리
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('이 예약을 취소할까요?')) cancelReservation(reservation.id)
                    }}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink/50 transition hover:bg-red-50 hover:text-red-500"
                  >
                    취소 처리
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setSelected(reservation)}
                className="rounded-full border border-accent/20 px-3 py-1 text-xs font-medium text-ink/60 transition hover:border-accent"
              >
                상세
              </button>
            </div>
          )
        },
      }),
    ],
    [cancelReservation, completeReservation],
  )

  const table = useReactTable({
    data: filteredRows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-ink">예약 관리</h1>
        <p className="mt-1 text-sm text-ink/60">전체 예약을 확인하고 상태를 관리할 수 있어요.</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5 rounded-full border border-accent/20 bg-white/40 p-1">
          {statusOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                statusFilter === option ? 'bg-accent text-background' : 'text-ink/60 hover:bg-accent/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름 또는 연락처로 검색"
          className="w-full max-w-xs rounded-xl border border-accent/20 bg-white/60 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {filteredRows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
          {reservations.length === 0 ? '등록된 예약이 없어요.' : '조건에 맞는 예약이 없어요.'}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-accent/20 bg-white/40">
          <table className="w-full min-w-[760px] border-collapse text-sm">
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
          const reservation = selected
          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4"
              onClick={() => setSelected(null)}
            >
              <div
                className="w-full max-w-md overflow-hidden rounded-2xl bg-background p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink">{reservation.menuName}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass[reservation.status]}`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 border-t border-accent/10 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/50">일시</span>
                    <span className="font-medium text-ink">
                      {formatDateLabel(reservation.date)} {reservation.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/50">고객</span>
                    <span className="font-medium text-ink">{reservation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/50">연락처</span>
                    <span className="font-medium text-ink">{reservation.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/50">디자이너</span>
                    <span className="font-medium text-ink">{reservation.designerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/50">요청사항</span>
                    <span className="font-medium text-ink">{reservation.notes || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/50">접수일</span>
                    <span className="font-medium text-ink">
                      {new Date(reservation.createdAt).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="flex-1 rounded-full border border-accent/30 py-3 text-sm font-medium text-ink/70 transition hover:border-accent"
                  >
                    닫기
                  </button>
                  {reservation.status === '예정' && (
                    <button
                      type="button"
                      onClick={() => {
                        completeReservation(reservation.id)
                        setSelected(null)
                      }}
                      className="flex-1 rounded-full bg-accent py-3 text-sm font-medium text-background transition hover:opacity-90"
                    >
                      완료 처리
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
