import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLastScannerRunner } from '../utils/api';
import type { Runner } from '../utils/api';

function BibPage() {

  const { data, isLoading, isError, error } = useQuery<Runner, Error>({
    queryKey: ['runnersData'],
    queryFn: async () => {
      const { data: runners, error: apiError } = await getLastScannerRunner();
      if (apiError || !runners) {
        throw new Error(apiError ? 'Failed to fetch data' : 'No data found');
      }
      return runners;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 1000,
  });

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">Memuat data pelari...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold text-red-600">Error: {error?.message}</p>
      </main>
    );
  }

  // Jika data tidak ada atau array kosong
  if (!data) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">Tidak ada data pelari yang ditemukan.</p>
      </main>
    );
  }

  
  // console.log(data);
  // const firstRunner = data[0];
  // console.log(firstRunner);

  // const id = [
  //   { id: 1, name: "Fulan", bib: "5-1265", tipe: "5k" },
  //   { id: 2, name: "Lorem", bib: 1, tipe: "5k" },
  // ]
  
  return (
    <main>
      <section className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-700 mb-2 leading-tight">
          {data.run_type}
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-center text-indigo-800 my-2 leading-tight">
          {data.bib}
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-600 mt-2 leading-tight">
          {/* Brand: {firstProduct.brand} | Harga: ${firstProduct.price} */}
          {data.name}
        </p>
        {/* {firstProduct.thumbnail && (
          <img src={firstProduct.thumbnail} alt={firstProduct.title} className="w-48 h-48 object-cover rounded-lg shadow-lg mt-8" />
        )} */}
        
      </section>
    </main>
  )
}

export default BibPage;