type Props = { isOpen: boolean; onClose: () => void; calendlyUrl: string }

export default function CalendarModal({ isOpen, onClose, calendlyUrl }: Props) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      <div className="min-h-screen grid place-items-center p-4">
        <div className="bg-[#0b0f1a] border border-gray-700 rounded-xl w-full max-w-3xl h-[85vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h3 className="text-sm font-medium">Book a meeting</h3>
          <button onClick={onClose} className="px-2 py-1 text-gray-400 hover:text-white">✕</button>
        </div>
        <iframe src={calendlyUrl} className="w-full h-full" frameBorder={0} />
        </div>
      </div>
    </div>
  )
}


