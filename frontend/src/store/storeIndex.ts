import { Business, User } from '@/models/model';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface Store {
  user: User;
  business: Business;
  token: string | null;
  setUser: (userData: User, token: string) => void;
  setBusiness: (businessData: Business) => void;
  setToken: (token: string) => void;
}
export const useStore = create(
  persist<Store>(
    (set) => ({
      token: Cookies.get('token') ?? null,
      business: {
        id: '',
        name: '',
        description: '',
        image_url: '',
        category_id: '',
        user_id: ''
      },
      user: {
        id: '',
        email: '',
        password: '',
        name: '',
        country: '',
        birth_date: ''
      },
      setUser: (userData, token) => set({ user: userData, token }),
      setBusiness: (businessData) => set({ business: businessData }),
      setToken: (token) => set({ token })
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
