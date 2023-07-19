"use client"
import { deleteTodo, getTodos } from '@/app/api/todoApi'
import { deleteTodoOptions } from '@/app/api/todoSWROptions'
import ErrorUI from '@/app/components/ErrorUI'
import GeneralButton from '@/app/components/GeneralButton'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { FETCHING_TODO } from '@/app/utils/SWRkey'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR, { preload } from 'swr'

export default function ListTodoPage() {

  const router = useRouter()

  const { isLoading: todosLoading, data: dataTodos,isValidating, error: todosError,mutate} = useSWR(FETCHING_TODO, getTodos, {
    onSuccess: data => data.sort((a, b) => b.id - a.id),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  })

  const deleteDataTodo = async(id) =>{
    try {
      await mutate(deleteTodo({
        id:id
      }),deleteTodoOptions({
        id:id
      }))
      console.log("SUKSES DELETE")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="px-8 py-4">
        <span className="font-bold text-2xl">My Todo</span>
        <br /><br />
        <GeneralButton title="Add Todo" onClick={()=>router.push("/pages/form-entry/create")}/>
        <br />
        <div class="relative overflow-x-auto">
          {todosLoading||isValidating ? <LoadingSpinner /> :
            todosError ?
              <ErrorUI message={todosError.message} />
              :
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Todo
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    dataTodos.map((data, index) => {
                      return (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </th>
                          <td class="px-6 py-4">
                            {data.title}
                          </td>
                          <td class="px-6 py-4">
                            {data.description}
                          </td>
                          <td class="px-6 py-4">
                          <Link href={{
                            pathname:'/pages/form-entry/edit',
                            query:{
                              "id":data.id,
                              "title":data.title,
                              "description":data.description
                            }
                          }}><GeneralButton title="Edit"/></Link> 
                          <GeneralButton title="Delete" onClick={()=>deleteDataTodo(data.id)}/>
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
          }


        </div>
      </div>
    </>
  )
}
