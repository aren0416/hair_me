interface PagePlaceholderProps {
  title: string
  description: string
}

export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <span className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">준비 중인 화면</span>
      <h1 className="text-3xl font-semibold text-ink">{title}</h1>
      <p className="mt-3 text-ink/70">{description}</p>
    </div>
  )
}
