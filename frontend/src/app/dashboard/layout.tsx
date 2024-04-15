import BottomNavigation from '@/components/BottomNavigation';
import React from 'react';

export default function layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-dvh'>
      {children}
      <BottomNavigation />
    </div>
  );
}
