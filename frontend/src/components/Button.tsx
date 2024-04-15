'use client';
import { useRouter } from 'next/navigation';
import React, { MouseEventHandler } from 'react';
interface Props {
  text: string;
  action?: MouseEventHandler;
  navigate?: string;
  primary?: boolean;
  arialLabel?: string;
  tabIndex?: number;
  type?: 'submit' | 'reset' | 'button' | undefined;
}
export default function Button({
  text,
  action,
  primary,
  navigate,
  arialLabel,
  tabIndex,
  type
}: Props) {
  const router = useRouter();
  const useNavigation = () => {
    navigate && router.push(navigate);
  };
  return (
    <button
      role='button'
      aria-label={arialLabel}
      type={type}
      tabIndex={tabIndex}
      className={`${primary ? 'hover:bg-[#D40838] bg-[#D40838] text-white font-semibold text-[18px]' : 'btn-link'} btn border-none rounded-3xl h-auto py-3 min-h-0 hover:scale-105`}
      onClick={action ?? useNavigation}
    >
      {text}
    </button>
  );
}
