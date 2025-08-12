import fetchProducts from '@/app/api/mainpage/route'
import MainPage from '@/components/mainpage/MainPage'
import React from 'react'

export default async function page(){
  const data= await fetchProducts();
  console.log(data);
  return <MainPage data={data}/>
}