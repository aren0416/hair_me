export type MenuCategory = 'cut' | 'perm' | 'color' | 'clinic'

// 실제 Supabase menus 테이블 행 모양
export interface MenuRow {
  id: string
  category: MenuCategory
  name: string
  description: string
  detail: string
  duration_minutes: number
  price: number
  image: string
}

export const categories = [
  { id: 'all', label: '전체' },
  { id: 'cut', label: '커트' },
  { id: 'perm', label: '펌' },
  { id: 'color', label: '컬러' },
  { id: 'clinic', label: '클리닉' },
] as const
