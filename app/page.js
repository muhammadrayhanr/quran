'use client';
import { TableData } from '@/components/molecules/TableData';

export default function Home() {
  return (
    <div className="relative bg-[#fceddc]">
      <header className="absolute top-0 p-3 bg-[#145750] w-full text-center text-white">
        <span className="font-bold cursor-pointer">Al-Qur`an</span>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between px-0 pt-12 md:p-12">
        <TableData />
      </main>
      <footer className='absolute bottom-0 w-full text-center mb-1'>
        <span className='text-center text-sm'>Made with ❤️ by Rayhan</span>
      </footer>
    </div>
  );
}
