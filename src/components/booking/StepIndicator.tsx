const steps = ['메뉴', '디자이너', '날짜/시간', '정보', '확인']

interface StepIndicatorProps {
  current: number
  onStepClick: (step: number) => void
}

export default function StepIndicator({ current, onStepClick }: StepIndicatorProps) {
  return (
    <div className="mx-auto flex max-w-lg items-center justify-between">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber < current
        const isCurrent = stepNumber === current
        const isReachable = stepNumber <= current

        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => onStepClick(stepNumber)}
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition ${
                  isDone || isCurrent
                    ? 'bg-accent text-background'
                    : 'border border-accent/30 text-ink/40'
                } ${isReachable ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
              >
                {stepNumber}
              </button>
              <span className={`text-xs ${isCurrent ? 'font-medium text-ink' : 'text-ink/40'}`}>{label}</span>
            </div>
            {stepNumber !== steps.length && (
              <div className={`mx-2 h-px flex-1 ${isDone ? 'bg-accent' : 'bg-accent/20'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
