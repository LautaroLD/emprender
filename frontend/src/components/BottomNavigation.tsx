'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const path = usePathname();

  return (
    <div className='btm-nav bg-[#D40838] h-12'>
      <Link href={'/dashboard/products'}>
        <Image
          alt=''
          src={
            path.endsWith('products') ? '/icons/bag.fill.svg' : '/icons/bag.svg'
          }
          width={35}
          height={35}
          color='#ffffff'
          className='invert'
          priority={false}
        />
      </Link>
      <Link href={'/dashboard'}>
        <Image
          alt=''
          src={
            path.endsWith('dashboard')
              ? '/icons/house.fill.svg'
              : '/icons/house.svg'
          }
          width={35}
          height={35}
          className='invert'
          priority={false}
        />
      </Link>
      <Link href={'/dashboard/perfil'}>
        <Image
          alt=''
          src={
            path.endsWith('perfil') ? '/icons/User.fill.svg' : '/icons/User.svg'
          }
          width={30}
          height={30}
          className='invert'
          priority={false}
        />
      </Link>
    </div>
  );
}
