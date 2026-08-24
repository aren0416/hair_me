import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder'

export default function DesignerDetail() {
  const { id } = useParams()

  return (
    <PagePlaceholder
      title={`디자이너 상세 (id: ${id})`}
      description="디자이너 프로필, 전문 분야, 경력, 포트폴리오 이미지가 표시될 화면입니다."
    />
  )
}
