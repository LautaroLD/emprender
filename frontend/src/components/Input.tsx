import React from 'react';
export default function Input({
  inputProps,
  errorMessage,
  label,
  tabIndex
}: {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
  label?: string;
  tabIndex?: number;
}): React.JSX.Element {
  return (
    <label className='form-control'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        className='input w-full max-w-xs text-center h-auto p-2 border-b border-b-gray-400 rounded-none focus-within:outline-none'
        tabIndex={tabIndex}
        {...inputProps}
      />
      <div className='label'>
        <p className='label-text-alt text-red-500'>{errorMessage}</p>
      </div>
    </label>
  );
}
