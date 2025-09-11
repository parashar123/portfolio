import { useState } from 'react'
import CalendarModal from './CalendarModal'

export default function FloatingBook() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-primary-500/40"
      >
        Book a call
      </button>
      <CalendarModal
        isOpen={open}
        onClose={() => setOpen(false)}
        calendlyUrl="https://calendly.com/parasharsuraj123/30min"
      />
    </>
  )
}


