export interface MenuItem {
  id: string
  category: 'cut' | 'perm' | 'color' | 'clinic'
  name: string
  description: string
  detail: string
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
    detail:
      '얼굴형과 모질, 두상의 밸런스를 세심하게 분석한 뒤 진행하는 맞춤 디자인 커트입니다. 정면뿐 아니라 옆모습과 뒷모습까지 고려해 전체적인 라인을 다듬어, 손질이 편하면서도 자연스러운 스타일을 완성합니다.',
    duration: '40분',
    price: '55,000원',
    image: 'https://images.unsplash.com/photo-1647462741351-4e7a5e7317c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-men',
    category: 'cut',
    name: '남성 커트',
    description: '얼굴형에 맞춘 클래식 & 트렌디 스타일링 커트',
    detail:
      '클래식한 스타일부터 트렌디한 스타일까지, 얼굴형과 라이프스타일에 맞춰 제안하는 남성 전용 커트입니다. 관리가 쉬우면서도 스타일리시한 라인을 살리는 데 중점을 둡니다.',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cut-clinic',
    category: 'cut',
    name: '클리닉컷',
    description: '손상모를 정리하는 정교한 라인 트리밍',
    detail:
      '손상되거나 갈라진 모발 끝을 정교하게 다듬어 전체적인 인상을 깔끔하게 정리하는 짧은 트리밍 시술입니다. 부담 없는 시간 안에 스타일을 새로 고칠 수 있습니다.',
    duration: '15분',
    price: '15,000원',
    image: 'https://images.unsplash.com/photo-1541533848490-bc8115cd6522?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-volume',
    category: 'perm',
    name: '볼륨펌',
    description: '자연스러운 볼륨과 웨이브를 살리는 맞춤 펌',
    detail:
      '힘없이 처지는 모발에 자연스러운 볼륨과 웨이브를 더하는 맞춤 펌입니다. 모발 상태와 원하는 분위기를 먼저 진단한 뒤, 뿌리부터 볼륨감을 살려 생기 있는 인상을 만들어 드립니다.',
    duration: '120분',
    price: '110,000원',
    image: 'https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-digital',
    category: 'perm',
    name: '디지털펌',
    description: '세팅력이 오래 유지되는 히트 펌',
    detail:
      '열을 이용해 세팅력을 오래 유지시키는 히트 펌입니다. 시간이 지나도 웨이브가 쉽게 풀리지 않아, 아침 스타일링 시간을 줄이고 싶은 분들에게 추천드립니다.',
    duration: '150분',
    price: '130,000원',
    image: 'https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'perm-setting',
    category: 'perm',
    name: '셋팅펌',
    description: '차분한 웨이브로 아침 스타일링 시간을 줄여주는 펌',
    detail:
      '잔잔하고 차분한 웨이브로 자연스러운 볼륨을 더하는 펌입니다. 과하지 않은 웨이브감으로 데일리 스타일링 부담을 줄여줍니다.',
    duration: '130분',
    price: '120,000원',
    image: 'https://images.unsplash.com/photo-1647462741268-e5724e5886c0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-full',
    category: 'color',
    name: '전체 염색',
    description: '퍼스널 컬러와 피부톤을 고려한 맞춤 헤어 컬러',
    detail:
      '퍼스널 컬러와 피부톤을 분석해 얼굴을 화사하게 밝혀주는 전체 염색입니다. 원하는 톤과 어울리는 톤을 함께 고려해 자연스러운 발색을 만들어 드립니다.',
    duration: '90분',
    price: '95,000원',
    image: 'https://images.unsplash.com/photo-1638064432648-bc2f9a91b06b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-root',
    category: 'color',
    name: '뿌리 염색',
    description: '자란 새치와 뿌리 부분만 깔끔하게 정리',
    detail:
      '새로 자란 뿌리 부분만 정교하게 컬러를 맞춰 경계 없이 자연스럽게 이어지도록 하는 시술입니다. 전체 염색보다 빠르고 부담 없이 컬러를 유지할 수 있습니다.',
    duration: '60분',
    price: '65,000원',
    image: 'https://images.unsplash.com/photo-1695527081848-1e46c06e6458?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'color-balayage',
    category: 'color',
    name: '발레아쥬',
    description: '자연스러운 그러데이션을 살린 컬러 디자인',
    detail:
      '빗질하듯 자연스러운 그러데이션을 표현하는 컬러 디자인입니다. 뿌리 부분은 자연스럽게, 모발 끝으로 갈수록 밝은 톤을 살려 입체적인 인상을 만들어 드립니다.',
    duration: '150분',
    price: '180,000원',
    image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-protein',
    category: 'clinic',
    name: '단백질 클리닉',
    description: '손상모 회복을 위한 집중 단백질 케어',
    detail:
      '손상된 모발에 단백질 성분을 집중적으로 채워 넣어 탄력과 윤기를 되찾아주는 클리닉입니다. 시술 직후부터 부드러워진 손끝 감촉을 느끼실 수 있습니다.',
    duration: '40분',
    price: '40,000원',
    image: 'https://images.unsplash.com/photo-1785860333038-5c6dce348544?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'clinic-scalp',
    category: 'clinic',
    name: '두피 스케일링',
    description: '두피 건강을 위한 딥클렌징 케어',
    detail:
      '두피에 쌓인 노폐물과 각질을 깨끗하게 정리하는 딥클렌징 케어입니다. 두피 건강을 개선해 모발이 자랄 수 있는 환경을 만들어 드립니다.',
    duration: '30분',
    price: '35,000원',
    image: 'https://images.unsplash.com/photo-1626379464632-cc45ac86daae?auto=format&fit=crop&w=800&q=80',
  },
]
