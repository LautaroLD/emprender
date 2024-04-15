import { Earnings, Expenses } from '@/models/model';
import React from 'react';
import Button from './Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
interface Props {
  content: Earnings[] | Expenses[];
  type: string;
}
export default function Expenses_earnings({ content, type }: Props) {
  const recents = content.slice(0, 4);
  const total = recents.reduce((acc, curr) => acc + curr.price, 0);
  return (
    <>
      <div className='w-full h-full'>
        <p className='font-semibold text-base mt-4'>{type} recientes</p>
        <div className='w-full h-full flex'>
          {content.length > 0 ? (
            <div className='mx-3 w-full'>
              <DataTable value={recents}>
                <Column
                  className='text-base border-b font-medium text-slate-400 px-1'
                  field='description'
                />
                <Column
                  className='text-base border-b font-bold text-slate-500 text-end px-1'
                  field='price'
                  body={(data) => (
                    <p>
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(data.price / 100)}
                    </p>
                  )}
                />
              </DataTable>
              <div className='flex justify-between mt-auto'>
                <b>
                  {`Total:
                  ${Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(total / 100)}`}
                </b>
                <Link
                  className='text-[#D40838] font-semibold text-base mr-2'
                  href={''}
                >
                  ver todo
                </Link>
              </div>
            </div>
          ) : (
            <p className='m-auto font-medium text-base text-slate-500'>
              No tienes {type} semanales actualmente
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-auto'>
        <Button text={`Ingresar ${type}`} primary />
      </div>
    </>
  );
}
