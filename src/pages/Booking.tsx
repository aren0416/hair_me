import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepDateTime from '../components/booking/StepDateTime'
import StepDesigner from '../components/booking/StepDesigner'
import StepDetails from '../components/booking/StepDetails'
import StepIndicator from '../components/booking/StepIndicator'
import StepMenu from '../components/booking/StepMenu'
import StepReview from '../components/booking/StepReview'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'
import { useReservations } from '../context/ReservationsContext'
import { designers } from '../data/designers'
import { menuItems } from '../data/menuItems'

interface Selection {
  menuId: string | null
  designerId: string | null | undefined
  date: string
  time: string
  name: string
  phone: string
  notes: string
}

const initialSelection: Selection = {
  menuId: null,
  designerId: undefined,
  date: '',
  time: '',
  name: '',
  phone: '',
  notes: '',
}

export default function Booking() {
  const { isLoggedIn } = useAuth()
  const { addReservation } = useReservations()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selection, setSelection] = useState<Selection>(initialSelection)

  if (!isLoggedIn) {
    return <LoginForm />
  }

  const goNext = () => setStep((s) => Math.min(s + 1, 5))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleConfirm = () => {
    addReservation({
      menuId: selection.menuId!,
      designerId: selection.designerId ?? null,
      date: selection.date,
      time: selection.time,
      name: selection.name,
      phone: selection.phone,
      notes: selection.notes,
    })
    navigate('/booking/complete', { state: selection })
  }

  const selectedMenu = menuItems.find((m) => m.id === selection.menuId)
  const selectedDesigner = designers.find((d) => d.id === selection.designerId) ?? null

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <StepIndicator current={step} onStepClick={setStep} />

      <div className="mt-12">
        {step === 1 && (
          <StepMenu
            selectedId={selection.menuId}
            onSelect={(menuId) => setSelection((s) => ({ ...s, menuId }))}
            onNext={goNext}
          />
        )}

        {step === 2 && (
          <StepDesigner
            selectedId={selection.designerId}
            onSelect={(designerId) => setSelection((s) => ({ ...s, designerId }))}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 3 && (
          <StepDateTime
            date={selection.date || null}
            time={selection.time || null}
            onChangeDate={(date) => setSelection((s) => ({ ...s, date }))}
            onChangeTime={(time) => setSelection((s) => ({ ...s, time }))}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 4 && (
          <StepDetails
            name={selection.name}
            phone={selection.phone}
            notes={selection.notes}
            onChangeName={(name) => setSelection((s) => ({ ...s, name }))}
            onChangePhone={(phone) => setSelection((s) => ({ ...s, phone }))}
            onChangeNotes={(notes) => setSelection((s) => ({ ...s, notes }))}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === 5 && selectedMenu && (
          <StepReview
            menuItem={selectedMenu}
            designer={selectedDesigner}
            date={selection.date}
            time={selection.time}
            name={selection.name}
            phone={selection.phone}
            notes={selection.notes}
            onConfirm={handleConfirm}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  )
}
