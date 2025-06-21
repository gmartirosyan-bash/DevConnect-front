import { useState } from 'react'
import BoardSidebar from './BoardSidebar'
import BoardEmpty from './BoardEmpty'
import Board from './Board'

function DashboardBoard({ board }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-1">
      <div className={`bg-neutral-900 divide-y divide-neutral-500/45 text-right text-neutral-300 transition-[width] duration-400
        ${sidebarOpen ? 'w-1/6' : 'w-9'}`}
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
        <BoardSidebar className={` relative p-3 ${sidebarOpen ? '' : ' hidden'}`} />
      </div>
      {board
        ? (<Board className={sidebarOpen ? 'w-5/6' : 'w-full'} />)
        : <BoardEmpty />}

    </div>
  )
}

export default DashboardBoard
