"use client"
import { getTodos, updateTodo } from '@/app/api/todoApi'
import { updateTodoOptions } from '@/app/api/todoSWROptions'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'

export default function FormEntryEditPage() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [id, setId] = useState(searchParams.get('id'))
  const [title, setTitle] = useState(searchParams.get('title'))
  const [description, setDescription] = useState(searchParams.get('description'))

  const { mutate } = useSWR('fetchingTodo', getTodos)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await mutate(
        updateTodo({
          "id": id,
          "title": title,
          "description": description
        }),
        updateTodoOptions({
          "id": id,
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
      <span className="font-bold text-2xl">Form Update Todo</span>
      <br /><br />
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Title
          </label>
          <input required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Description
          </label>
          <textarea required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} />
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Edit Data
        </button>
      </form>
    </div>

  )
}
