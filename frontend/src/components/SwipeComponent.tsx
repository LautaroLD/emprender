'use client';
import React, { useState } from 'react';
import { useGetBalance } from '@/hooks/useApi';
import Expenses_earnings from './Expenses_earnings';

export default function SwipeComponent() {
  const { data, isLoading, isSuccess } = useGetBalance();
  const [tab, setTab] = useState(1);
  return (
    <section className='w-full flex flex-col items-center '>
      <div
        role='tablist '
        className='tabs bg-[#F5F5F5] font-medium max-w-md rounded-3xl shadow-inner w-full object-contain'
      >
        <a
          onClick={() => setTab(1)}
          role='tab'
          className={`tab rounded-3xl ${tab === 1 ? 'bg-[#D40838] text-white' : 'text-[#7A7A7A]'} `}
        >
          Ganancias
        </a>
        <a
          onClick={() => setTab(2)}
          role='tab'
          className={`tab rounded-3xl ${tab === 2 ? 'bg-[#D40838] text-white' : 'text-[#7A7A7A]'}`}
        >
          Gastos
        </a>
      </div>
      {isLoading && (
        <span className='loading loading-bars loading-lg m-auto'></span>
      )}
      {!isLoading && isSuccess && (
        <div className='w-full max-w-md h-[90%] flex flex-col'>
          {tab === 1 ? (
            <Expenses_earnings content={data.earnings} type={'Ganancias'} />
          ) : (
            <Expenses_earnings content={data.expenses} type={'Gastos'} />
          )}
        </div>
      )}
    </section>
  );
}
