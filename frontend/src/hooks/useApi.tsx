/*Axios Config*/
import api from '@/api/config';
/*Store- Zustand*/
import { useStore } from '@/store/storeIndex';

/*Tanstack*/
import { useMutation, useQuery } from '@tanstack/react-query';

/*JS-Cookie*/
import Cookies from 'js-cookie';

/*Models*/
import {
  Business,
  Category,
  Earnings,
  Expenses,
  FormFieldLogin,
  User,
  UserResponse
} from '@/models/model';

/*
 *
 *FETCHS AUTH USER - Login| Register
 */

export function FetchUser() {
  const { setUser, setBusiness } = useStore((state) => state);

  const postUser = useMutation({
    mutationFn: (newUser: {
      user: Partial<User>;
      business: Partial<Business>;
    }) => {
      return api.post('/auth/business/signup', newUser);
    },
    onSuccess: ({ data }) => {
      Cookies.set('token', data.access_token);
      setUser(data.user, data.access_token);
      setBusiness(data.business);
    },
    onError: (data) => {
      console.log(data);
    }
  });

  const loginUser = useMutation({
    mutationFn: async ({ identifier, password }: FormFieldLogin) => {
      const { data } = await api.post<Promise<UserResponse>>('/auth/login', {
        identifier,
        password
      });
      return data;
    },
    onSuccess: async ({ acces_token, user }: UserResponse) => {
      if (!user) throw new Error('No existe usuario');

      setUser(user, acces_token);
      Cookies.set('token', acces_token);
      api
        .get('/businesses', {
          headers: {
            Authorization: 'Bearer ' + acces_token
          }
        })
        .then((res) => setBusiness(res.data.businesses[0]));
    },
    onError: (error) => {
      console.error('Ocurrio un err', error);
    }
  });

  return { postUser, loginUser };
}

/*
 *
 *GETTERS
 */

export async function getCategories() {
  const res = await api.get('/categories');
  return res.data.categories;
}

export function useGetCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () =>
      api.get('/categories').then((res) => res.data.categories)
  });
}
export async function getBalance() {
  const business_id = JSON.parse(localStorage.getItem('store') as string).state
    .business.id;
  const options = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('store') as string).state.token}`
    }
  };
  const resExpenses = await api.get<{ expenses: Expenses[] }>(
    `/expenses/${business_id}/business`,
    {
      ...options
    }
  );
  const resEarnings = await api.get<{ earnings: Earnings[] }>(
    `/earnings/${business_id}/business`,
    {
      ...options
    }
  );
  console.log({
    expenses: resExpenses.data.expenses,
    earnings: resEarnings.data.earnings
  });

  return {
    expenses: resExpenses.data.expenses,
    earnings: resEarnings.data.earnings
  };
}
export function useGetBalance() {
  return useQuery<{ expenses: Expenses[]; earnings: Earnings[] }>({
    queryKey: ['balance'],
    queryFn: getBalance
  });
}
