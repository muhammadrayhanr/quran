'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ReloadIcon } from '@radix-ui/react-icons';

const Index = () => {
  const searchParams = useSearchParams();
  const numberSurah = searchParams.get('surah');
  const [data, setData] = useState(null); // Ubah menjadi null untuk menunjukkan bahwa data belum dimuat
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_KEY}/surah/${numberSurah}.json`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [numberSurah]); // Tambahkan numberSurah sebagai dependency

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-[#fceddc]">
        <p className="m-auto">
          <ReloadIcon className="animate-spin w-6 h-6" />
        </p>
      </div>
    ); // Menampilkan loading jika data masih dimuat
  }

  const handlePush = () => {
    router.push('/');
  };

  return (
    <div className="relative bg-[#fceddc]">
      <header className="absolute top-0 p-3 bg-[#145750] w-full text-center text-white">
        <span
          className="font-bold cursor-pointer"
          onClick={() => handlePush()}>
          Al-Qur`an
        </span>
      </header>
      <Suspense>
        <main className="flex min-h-screen flex-col items-center px-0 pt-12 md:p-12">
          <h1 className="mt-8 font-semibold text-lg">{data.name}</h1>
          <p className="text-xl">{data.name_translations.ar}</p>
          <p className="text-sm">{data.name_translations.id}</p>

          <Table className="my-10">
            <TableBody>
              {data.verses.map((item) => (
                <TableRow key={item.number}>
                  <TableCell className="w-[30px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-md flex items-center">{item.number}.</span>
                      <p className="text-3xl text-end">{item.text}</p>
                    </div>
                    <p className="py-3">{item.translation_id}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </Suspense>
    </div>
  );
};

export default Index;
