export interface MenuItem {
  id: string
  category: 'cut' | 'perm' | 'color' | 'clinic'
  name: string
  description: string
  duration: string
  price: string
  image: string
}

export const categories = [
  { id: 'all', label: '전체' },
  { id: 'cut', label: '커트' },
  { id: 'perm', label: '펌' },
  { id: 'color', label: '컬러' },
  { id: 'clinic', label: '클리닉' },
] as const

export const menuItems: MenuItem[] = [
  {
    id: 'cut-women',
    category: 'cut',
    name: '여성 커트',
    description: '얼굴형과 모질을 고려한 맞춤 디자인 커트',
    duration: '40분',
    price: '55,000원',
    image: 'https://images.unsplash.com/photo-1647462741351-4e7a5e7317c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-men',
    category: 'cut',
    name: '남성 커트',
    description: '얼굴형에 맞춘 클래식 & 트렌디 스타일링 커트',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-clinic',
    category: 'cut',
    name: '클리닉컷',
    description: '손상모를 정리하는 정교한 라인 트리밍',
    duration: '15분',
    price: '15,000원',
    image: 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-volume',
    category: 'perm',
    name: '볼륨펌',
    description: '자연스러운 볼륨과 웨이브를 살리는 맞춤 펌',
    duration: '120분',
    price: '110,000원',
    image: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-digital',
    category: 'perm',
    name: '디지털펌',
    description: '세팅력이 오래 유지되는 히트 펌',
    duration: '150분',
    price: '130,000원',
    image: 'https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-setting',
    category: 'perm',
    name: '셋팅펌',
    description: '차분한 웨이브로 아침 스타일링 시간을 줄여주는 펌',
    duration: '130분',
    price: '120,000원',
    image: 'https://images.unsplash.com/photo-1647462741268-e5724e5886c0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-full',
    category: 'color',
    name: '전체 염색',
    description: '퍼스널 컬러와 피부톤을 고려한 맞춤 헤어 컬러',
    duration: '90분',
    price: '95,000원',
    image: 'https://images.unsplash.com/photo-1638064432648-bc2f9a91b06b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-root',
    category: 'color',
    name: '뿌리 염색',
    description: '자란 새치와 뿌리 부분만 깔끔하게 정리',
    duration: '60분',
    price: '65,000원',
    image: 'https://images.unsplash.com/photo-1695527081848-1e46c06e6458?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-balayage',
    category: 'color',
    name: '발레아쥬',
    description: '자연스러운 그러데이션을 살린 컬러 디자인',
    duration: '150분',
    price: '180,000원',
    image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-protein',
    category: 'clinic',
    name: '단백질 클리닉',
    description: '손상모 회복을 위한 집중 단백질 케어',
    duration: '40분',
    price: '40,000원',
    image: 'https://images.unsplash.com/photo-1785860333038-5c6dce348544?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-scalp',
    category: 'clinic',
    name: '두피 스케일링',
    description: '두피 건강을 위한 딥클렌징 케어',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1626379464632-cc45ac86daae?auto=format&fit=crop&w=800&q=80',
  },
]
