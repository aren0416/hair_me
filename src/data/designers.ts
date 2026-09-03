// 실제 Supabase designers 테이블 행 모양
export interface Designer {
  id: string
  name: string
  title: string
  specialties: string[]
  years: number
  image: string
  career: string[]
  intro: string
  portfolio: string[]
}
