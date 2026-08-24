export default function Footer() {
  return (
    <footer className="border-t border-accent/20 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink/70 sm:px-6">
        <p className="text-base font-semibold text-ink">HAIRME</p>
        <p className="mt-2">서울특별시 성동구 서울숲길 42, 2층</p>
        <p className="mt-1">화–토 10:00–20:00 · 일 11:00–18:00 · 매주 월요일 휴무</p>
        <p className="mt-1">02-555-2847</p>
        <p className="mt-6 text-xs text-ink/50">© {new Date().getFullYear()} HAIRME. All rights reserved.</p>
      </div>
    </footer>
  )
}
