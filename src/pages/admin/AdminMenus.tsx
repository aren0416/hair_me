import { useEffect, useState } from 'react'
import MenuFormModal, { type MenuFormValues } from '../../components/admin/MenuFormModal'
import { PencilIcon, PlusIcon, TrashIcon } from '../../components/icons'
import { categories, menuItems as initialMenuItems, type MenuItem } from '../../data/menuItems'

const editableCategories = categories.filter((c) => c.id !== 'all')
const STORAGE_KEY = 'hairme_mock_admin_menu_items'

export default function AdminMenus() {
  const [items, setItems] = useState<MenuItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as MenuItem[]) : initialMenuItems
  })
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const openAddForm = () => {
    setEditingItem(null)
    setFormOpen(true)
  }

  const openEditForm = (item: MenuItem) => {
    setEditingItem(item)
    setFormOpen(true)
  }

  const handleSubmit = (values: MenuFormValues) => {
    if (editingItem) {
      setItems((prev) => prev.map((item) => (item.id === editingItem.id ? { ...item, ...values } : item)))
    } else {
      setItems((prev) => [...prev, { ...values, id: crypto.randomUUID() }])
    }
    setFormOpen(false)
  }

  const handleDelete = (item: MenuItem) => {
    if (!window.confirm(`'${item.name}' 메뉴를 삭제할까요?`)) return
    setItems((prev) => prev.filter((i) => i.id !== item.id))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">시술 관리</h1>
          <p className="mt-1 text-sm text-ink/60">시술 메뉴를 등록하고 수정할 수 있어요.</p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          <PlusIcon className="size-4" />
          메뉴 추가
        </button>
      </div>

      <div className="mt-8 space-y-10">
        {editableCategories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category.id)

          return (
            <div key={category.id}>
              <h2 className="text-sm font-semibold text-accent">{category.label}</h2>

              {categoryItems.length === 0 ? (
                <p className="mt-3 rounded-2xl border border-dashed border-accent/20 px-5 py-6 text-sm text-ink/40">
                  등록된 메뉴가 없어요.
                </p>
              ) : (
                <div className="mt-3 divide-y divide-accent/10 overflow-hidden rounded-2xl border border-accent/20 bg-white/40">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                      <img src={item.image} alt={item.name} className="size-14 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="mt-0.5 truncate text-xs text-ink/50">{item.description}</p>
                      </div>
                      <div className="shrink-0 text-right text-sm">
                        <p className="text-ink">{item.price}</p>
                        <p className="text-xs text-ink/40">{item.duration}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          aria-label="메뉴 수정"
                          className="flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-accent/10 hover:text-accent"
                        >
                          <PencilIcon className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          aria-label="메뉴 삭제"
                          className="flex size-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-red-50 hover:text-red-500"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {formOpen && (
        <MenuFormModal
          initialValue={editingItem}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
