'use client'

import { useSearchParams } from 'next/navigation';

export default function AddCart() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const parsedData = data ? JSON.parse(data) : {};
    console.log(parsedData);
  return (
    <div className='text-black'>
      <h1>Add Cart</h1>
      {parsedData ? (
        <div>
          <h2>{parsedData.name}</h2>
          <p>Brand: {parsedData.brand}</p>
          <p>Price: {parsedData.price}</p>
          {parsedData.image && <img src={parsedData.image} alt={parsedData.name} />}
        </div>
      ) : (
        <p>No item found</p>
      )}
    </div>
  );
}
