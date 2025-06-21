import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4 text-green-500">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-neutral-400 mb-6 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/"
        className="bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-500 transition"
      >
        Go Home
      </Link>
    </div>
  )
}
