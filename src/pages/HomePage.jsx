import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function HomePage() {
  const user = useSelector(state => state.user.user)

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <header className="flex justify-between items-center px-8 py-4 border-b border-neutral-700">
        <div className="flex relative">
          <h1 className="text-xl font-bold hover:text-green-500 cursor-default">DevConnect</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" absolute left-28 w-12 h-12 pb-5 pr-3 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h6m-6 0v6m6-6v6" />
          </svg>
        </div>

        <div className="space-x-4">
          {!user.username ?
            <>
              <Link to="/login" className="text-sm hover:underline">Login</Link>
              <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-sm hover:cursor-pointer active:bg-green-400">Sign Up</Link>
            </>
          :
            <Link to="/register" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-sm hover:cursor-pointer active:bg-green-400">Dashboard</Link>
          }
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Organize Your Projects Visually
        </h2>
        <p className="text-neutral-400 mb-8 max-w-md">
          A simple Trello-style board to manage your tasks with drag and drop.
        </p>
        <Link
          to="/register"
          className="bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-500 hover:cursor-pointer active:bg-green-400"
        >
          Get Started
        </Link>
      </main>
    </div>
  )
}

export default HomePage
