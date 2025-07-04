import { X, Check } from 'lucide-react'

function ConfirmBox({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-neutral-800 text-white p-6 rounded-md shadow-md max-w-sm w-full">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="hover:cursor-pointer bg-red-700 hover:bg-red-600 active:bg-red-500 px-4 py-2 pr-5 rounded flex items-center gap-1"
          >
            <Check size={16} />
            {' '}
            Yes
          </button>
          <button
            onClick={onCancel}
            className="hover:cursor-pointer bg-green-700 hover:bg-green-600 active:bg-green-500 px-4 py-2 pr-5 rounded flex items-center gap-1"
          >
            <X size={16} />
            {' '}
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
