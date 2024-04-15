export interface UserResponse {
  user: User;
  acces_token: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role?: string;
  name: string;
  phone?: string;
  country: string;
  birth_date: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  business_id: string;
}
export interface Business {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category_id: string;
  user_id: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface Orders {
  id: string;
  description: string;
  total_price: string;
  client_id: string;
  business_id: string;
}
export interface Products {
  id: string;
  description: string;
  name: string;
  price: number;
  business_id: string;
}
export interface Products_Orders {
  id: string;
  amount: string;
  client_id: string;
  order_id: string;
}
export interface Products_Catalogue {
  id: string;
  product_id: string;
  catalogue_id: string;
}
export interface Catalogue {
  id: string;
  name: string;
  description: string;
  business_id: string;
}
export interface Images {
  id: string;
  name: string;
  url: string;
  product_id: string;
}
export interface Expenses {
  id: string;
  price: number;
  description: string;
  business_id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Earnings {
  id: string;
  price: number;
  description: string;
  business_id: string;
  createdAt: string;
  updatedAt: string;
}
export type FormFieldLogin = {
  identifier: string;
  password: string;
  rememberme?: boolean;
};
