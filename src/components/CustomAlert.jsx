import { useEffect } from 'react'

function CustomAlert({ message, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape')
        onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg text-center w-80">
        <p className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-6">{message}</p>
        <button
          className="hover:cursor-pointer bg-green-700 hover:bg-green-600 active:bg-green-500 text-white font-medium py-2 px-4 rounded"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default CustomAlert
