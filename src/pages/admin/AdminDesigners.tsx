import { useEffect, useState } from 'react'
import DesignerFormModal, { type DesignerFormValues } from '../../components/admin/DesignerFormModal'
import { PencilIcon, PlusIcon, TrashIcon } from '../../components/icons'
import { designers as initialDesigners, type Designer } from '../../data/designers'

const STORAGE_KEY = 'hairme_mock_admin_designers'

export default function AdminDesigners() {
  const [designers, setDesigners] = useState<Designer[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Designer[]) : initialDesigners
  })
  const [editingDesigner, setEditingDesigner] = useState<Designer | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designers))
  }, [designers])

  const openAddForm = () => {
    setEditingDesigner(null)
    setFormOpen(true)
  }

  const openEditForm = (designer: Designer) => {
    setEditingDesigner(designer)
    setFormOpen(true)
  }

  const handleSubmit = (values: DesignerFormValues) => {
    if (editingDesigner) {
      setDesigners((prev) =>
        prev.map((designer) => (designer.id === editingDesigner.id ? { ...designer, ...values } : designer)),
      )
    } else {
      setDesigners((prev) => [...prev, { ...values, id: crypto.randomUUID() }])
    }
    setFormOpen(false)
  }

  const handleDelete = (designer: Designer) => {
    if (!window.confirm(`'${designer.name}' 디자이너를 삭제할까요?`)) return
    setDesigners((prev) => prev.filter((d) => d.id !== designer.id))
  }

  const filteredDesigners = designers.filter((designer) => designer.name.includes(search.trim()))

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">디자이너 관리</h1>
          <p className="mt-1 text-sm text-ink/60">디자이너 정보와 포트폴리오를 등록하고 수정할 수 있어요.</p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          <PlusIcon className="size-4" />
          디자이너 추가
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="이름으로 검색"
        className="mt-6 w-full max-w-xs rounded-xl border border-accent/20 bg-white/60 px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
      />

      {filteredDesigners.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
          {designers.length === 0 ? '등록된 디자이너가 없어요.' : '검색 결과가 없어요.'}
        </p>
      ) : (
        <div className="mt-4 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
          {filteredDesigners.map((designer) => (
            <div key={designer.id} className="flex items-center gap-4 px-5 py-4">
              <img src={designer.image} alt={designer.name} className="size-14 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink">
                  {designer.name} <span className="font-normal text-ink/60">{designer.title}</span>
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {designer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <p className="shrink-0 text-sm text-ink/60">경력 {designer.years}년차</p>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEditForm(designer)}
                  aria-label="디자이너 수정"
                  className="flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-accent/10 hover:text-accent"
                >
                  <PencilIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(designer)}
                  aria-label="디자이너 삭제"
                  className="flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-red-50 hover:text-red-500"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <DesignerFormModal
          initialValue={editingDesigner}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
