import { fetchCount, fetchCountries, fetchProducts } from '@/app/api/mainpage/route';
import MainPage from '@/components/mainpage/MainPage'
import React from 'react'

export default async function page(){
  const data= await fetchProducts();
  const count =await fetchCount();
  const countries=await fetchCountries();
  console.log(data);
  console.log(countries);
  console.log(count);
  return <MainPage data={data} count={count} countries={countries}/>
}