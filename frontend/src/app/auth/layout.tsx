import React from 'react';

export default function layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='content-center mx-auto w-[360px] max-w-[360px] min-h-dvh  px-3 pb-6'>
      {children}
    </div>
  );
}
