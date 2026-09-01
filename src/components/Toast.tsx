interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed left-1/2 top-20 z-[60] -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background shadow-lg">
      {message}
    </div>
  )
}
