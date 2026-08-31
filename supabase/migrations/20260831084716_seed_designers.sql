-- designers 시드 데이터 (기존 프론트엔드 더미 데이터 이관)

insert into public.designers (id, name, title, specialties, years, image, career, intro, portfolio)
values
  (
    'd8843252-fe2f-4af3-8999-94c2b8ec69b6',
    '김하나',
    '원장',
    array['커트', '펌'],
    12,
    'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=800&q=80',
    array['JS 헤어 아카데미 수료', '강남 소재 살롱 헤어 실장 역임 (8년)', 'HAIRME 원장 (4년째)'],
    '고객님의 이야기를 듣는 것부터 시작합니다. 얼굴형과 라이프스타일에 맞는 스타일을 함께 찾아가요.',
    array[
      'https://images.unsplash.com/photo-1647462741351-4e7a5e7317c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1635273051937-a0ddef9573b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1629397685944-7073f5589754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1647462741268-e5724e5886c0?auto=format&fit=crop&w=800&q=80'
    ]
  ),
  (
    'fee6a268-f6bf-425e-80b6-dbd16ed30abe',
    '이도윤',
    '디자이너',
    array['컬러', '스타일링'],
    7,
    'https://images.unsplash.com/photo-1700760934268-8aa0ef52ce0a?auto=format&fit=crop&w=800&q=80',
    array['컬러 전문 아카데미 수료', '홍대 소재 컬러 전문 살롱 근무 (5년)', 'HAIRME 디자이너 (2년째)'],
    '트렌드보다 당신에게 어울리는 컬러를 제안합니다.',
    array[
      'https://images.unsplash.com/photo-1638064432648-bc2f9a91b06b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695527081848-1e46c06e6458?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1785860333038-5c6dce348544?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614838280822-4fdea45dc3c3?auto=format&fit=crop&w=800&q=80'
    ]
  );
