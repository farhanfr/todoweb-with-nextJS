"use client"
import { addTodo, getTodos } from '@/app/api/todoApi'
import { addTodoOptions } from '@/app/api/todoSWROptions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useSWR,{ useSWRConfig } from 'swr'

export default function FormEntryCreatePage() {

  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const {mutate} = useSWR('fetchingTodo', getTodos)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate(
        addTodo({
          "title": title,
          "description": description
        }),
        addTodoOptions({
        "title": title,
        "description": description
      })
      )
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div class="w-full px-12 py-4">
      <span className="font-bold text-2xl">Form Create Todo</span>
      <br /><br />
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Title
          </label>
          <input required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Description
          </label>
          <textarea required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Add Data
        </button>
      </form>
    </div>

  )
}
