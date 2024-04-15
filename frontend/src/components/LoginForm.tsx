'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

/*React Hook Form*/
import { useForm } from 'react-hook-form';

/*API*/
import { FetchUser } from '@/hooks/useApi';

/*Components*/
import Input from './Input';
import Button from './Button';

/*Models*/
import { FormFieldLogin } from '@/models/model';
import { useEffect, useState } from 'react';

/*JS-Cookie*/
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();

  const [rememberMe, setrememberMe] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormFieldLogin>();
  const { loginUser } = FetchUser();

  useEffect(() => {
    const storedUserCredential = Cookies.get('userCredential');
    const storedRememberMe = Cookies.get('rememberMe');

    if (storedUserCredential && storedRememberMe === 'true') {
      const { identifier, password } = JSON.parse(storedUserCredential);
      setValue('identifier', identifier);
      setValue('password', password);
      setValue('rememberme', rememberMe);
      setrememberMe(JSON.parse(storedRememberMe));
    }
  }, []);

  useEffect(() => {
    if (loginUser.isSuccess) {
      router.replace('/dashboard');
    }
  }, [loginUser.isSuccess]);

  return (
    <>
      <h6 className='text-xs font-bold my-4'>Mprendr</h6>

      <section className='flex flex-col gap-4 my-4'>
        <div className='w-52 h-52 bg-gray-500 rounded-full self-center text-center content-center'>
          LOGO
        </div>
        <p className='text-center h-20 bg-gray-500 content-center rounded-full'>
          Decir a dios es crecer - Cerati
        </p>
      </section>

      <form
        onSubmit={handleSubmit(({ identifier, password, rememberme }) => {
          loginUser.mutate({ identifier, password });
          if (rememberme) {
            Cookies.set(
              'userCredential',
              JSON.stringify({ identifier, password }),
              { expires: 7 }
            );
            Cookies.set('rememberMe', JSON.stringify(rememberme));
          }
        })}
        className='flex flex-col'
      >
        {/* Identificador */}
        <Input
          tabIndex={1}
          inputProps={{
            type: 'text',
            placeholder: 'Correo electronico o numero telefonico',
            ...register('identifier', {
              required: {
                value: true,
                message: 'email o telefono es requerdio'
              }
            })
          }}
          errorMessage={errors.identifier?.message}
        />

        {/* Password */}
        <Input
          tabIndex={2}
          inputProps={{
            type: 'password',
            placeholder: 'Contraseña',
            ...register('password', {
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              },
              required: { value: true, message: 'La contraseña es obligatoria' }
            })
          }}
          errorMessage={errors.password?.message}
        />

        <Link href='#' tabIndex={5} className='self-end text-[#515151] text-sm'>
          Olvidé mi contraseña
        </Link>

        {/* RememberMe */}
        <section className='flex gap-2 mb-20'>
          <input
            type='checkbox'
            id='rememberMe'
            {...register('rememberme')}
            tabIndex={3}
            checked={rememberMe}
            onClick={() => setrememberMe(!rememberMe)}
          />
          <label htmlFor='rememberMe'>Recordarme</label>
        </section>

        <Button primary text='Iniciar sesión' type='submit' tabIndex={4} />
      </form>

      <section className='w-full text-center my-4'>
        <Link href='/auth/register' tabIndex={6}>
          ¿No tienes cuenta? Crea una aquí
        </Link>
      </section>
    </>
  );
}
