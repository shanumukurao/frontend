import { fetchProducts } from '@/app/api/mainpage/route';
import BuyNow from '@/components/buynow/BuyNow'
import React from 'react'


export default async function page(){
  const data= await fetchProducts();
  return (
    <BuyNow data={data}/>
  )
}