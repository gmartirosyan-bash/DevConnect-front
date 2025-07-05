import { useState, useEffect } from 'react'
import BoardSidebar from './BoardSidebar'
import BoardEmpty from './BoardEmpty'
import Board from './Board'
import { useSelector } from 'react-redux'

function DashboardBoard() {
  const board = useSelector(state => state.dashboard.board)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showSidebarContent, setShowSidebarContent] = useState(true)

  useEffect(() => {
    if (sidebarOpen) {
      const timeout = setTimeout(() => setShowSidebarContent(true), 100)
      return () => clearTimeout(timeout)
    } else {
      setShowSidebarContent(false)
    }
  }, [sidebarOpen])

  return (
    <div className="flex h-full ">
      <div className={`bg-neutral-900 divide-y divide-neutral-500/45 text-right text-neutral-300 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-10'}`}
      >
        <div className="flex justify-between my-3 pb-3">
          <p className={`ml-3 ${sidebarOpen ? '' : 'hidden'}`}>Workspace</p>
          <button
            className=" hover:bg-gray-500 mx-1 py-1 px-2"
            onClick={() => setSidebarOpen(open => !open)}
          >
            {sidebarOpen ? '❮' : '❯'}
          </button>
        </div>
        {showSidebarContent &&
          <BoardSidebar />
        }
      </div>
      <div className="flex flex-1 overflow-y-hidden">
        {board ? <Board board={board} sidebarOpen={sidebarOpen}/> : <BoardEmpty />}
      </div>

    </div>
  )
}

export default DashboardBoard
