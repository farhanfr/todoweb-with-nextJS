"use client"
import { getTodos } from '@/app/api/todoApi'
import HorizontalProductList from '@/app/components/HorizontalProductList'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { FETCHING_TODO } from '@/app/utils/SWRkey'
import { data } from 'autoprefixer'
import React from 'react'
import useSWR, { preload } from 'swr'

const ListTodoSliderPage = () => {

  const { isLoading: todosLoading, data: dataTodos,isValidating, error: todosError,mutate} = useSWR(FETCHING_TODO, getTodos, {
    onSuccess: data => data.sort((a, b) => b.id - a.id),
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true
  })

  return (
    <>
      {todosLoading || isValidating ? <LoadingSpinner/> : <HorizontalProductList listProductData={dataTodos}/>}
        
    </>
  )
}

export default ListTodoSliderPage
