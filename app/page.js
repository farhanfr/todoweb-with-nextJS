import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <p>Todo List With NEXT.JS</p>
      <Link href="/pages/list-todo">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Masuk
      </button>
      </Link>
      <br/>
      <Link href="/pages/list-todo-slider">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Masuk ke slider
      </button>
      </Link>

    </main>
  )
}
