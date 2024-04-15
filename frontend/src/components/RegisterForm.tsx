'use client';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import { FetchUser, useGetCategories } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

import { InputMask } from 'primereact/inputmask';

interface InputsForm {
  user: {
    email: string;
    password: string;
    role: string;
    name: string;
    phone: string;
    country: string;
    birth_date: string;
  };
  business: {
    name: string;
    category_id: string;
  };
}
export default function RegisterForm() {
  const { postUser } = FetchUser();
  const router = useRouter();
  const { data: categories } = useGetCategories();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InputsForm>();
  const onSubmit: SubmitHandler<InputsForm> = (data) => {
    postUser.mutate({
      ...data
    });
  };
  useEffect(() => {
    if (postUser.isSuccess) {
      router.replace('/dashboard');
    }
  }, [postUser.isSuccess]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col max-w-xs m-auto'
    >
      <section className='flex flex-col gap-3'>
        <h2 className='mt-6 mb-3 font-medium text-lg'>Sobre ti</h2>
        <Input
          inputProps={{
            placeholder: 'Tu nombre...',
            type: 'text',
            ...register('user.name', {
              required: {
                value: true,
                message: 'El nombre es obligatorio'
              }
            })
          }}
          errorMessage={errors.user?.name?.message}
        />
        <Input
          inputProps={{
            placeholder: 'Correo electrónico...',
            type: 'email',
            ...register('user.email', {
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Ingrese un email valido'
              },
              required: {
                value: true,
                message: 'El email es obligatorio'
              }
            })
          }}
          errorMessage={errors.user?.email?.message}
        />
        <Input
          inputProps={{
            placeholder: 'Establece tu contraseña...',
            type: 'password',
            ...register('user.password', {
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              },
              required: {
                value: true,
                message: 'La contraseña es obligatoria'
              }
            })
          }}
          errorMessage={errors.user?.password?.message}
        />
        <Input
          inputProps={{
            placeholder: 'País de residencia...',
            type: 'text',
            ...register('user.country', {
              required: {
                value: true,
                message: 'El país es obligatorio'
              }
            })
          }}
          errorMessage={errors.user?.country?.message}
        />
        <label className='form-control pt-2'>
          <InputMask
            slotChar='YYYY-MM-DD'
            mask='9999-99-99'
            placeholder='Tu fecha de nacimiento...'
            className='input w-full max-w-xs text-center h-auto p-2 border-b border-b-gray-400 rounded-none focus-within:outline-none'
            {...register('user.birth_date', {
              required: {
                value: true,
                message: 'La fecha de nacimiento es obligatoria'
              }
            })}
          />
          <div className='label'>
            {errors.user?.birth_date && (
              <p className='label-text-alt text-red-500'>
                {errors.user.birth_date.message}
              </p>
            )}
          </div>
        </label>
        <Input
          inputProps={{
            placeholder: 'Número telefónico...',
            type: 'text',
            ...register('user.phone', {
              required: {
                value: true,
                message: 'El número telefónico es obligatorio'
              }
            })
          }}
          errorMessage={errors.user?.phone?.message}
        />
      </section>
      <section>
        <h2 className='mt-6 mb-3 font-medium text-lg'>Sobre tu negocio</h2>
        <Input
          inputProps={{
            placeholder: 'Nombre de tu negocio...',
            type: 'text',
            ...register('business.name', {
              required: {
                value: true,
                message: 'El nombre de tu negocio es obligatorio'
              }
            })
          }}
          errorMessage={errors.business?.name?.message}
        />
        <select
          className='select w-full max-w-xs border-gray-500 border-2 bg-transparent text-center rounded-3xl focus-within:outline-none min-h-0 h-[2rem] font-medium text-base text-gray-500'
          defaultValue={''}
          {...register('business.category_id', {
            required: {
              value: true,
              message: 'La categoría es obligatoria'
            }
          })}
        >
          <option value={''} disabled>
            Elige la categoría de tu negocio
          </option>
          {categories?.map((category) => (
            <option value={category.id} key={`category-${category.id}`}>
              {category.name}
            </option>
          ))}
        </select>
        {
          <div className='label'>
            <p className='label-text-alt text-red-500'>
              {errors.business?.category_id?.message}
            </p>
          </div>
        }
      </section>
      <Button text='Comenzar' type='submit' primary />
    </form>
  );
}
