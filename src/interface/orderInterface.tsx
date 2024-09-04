export interface Order {
  id: string;
  company: string;
  userId: string;
  tableId: string;
  status: string;
  total: number;
  quantity: number;
  products: Product[];
  table: Table[];
  user: User[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  status: boolean;
  image: string;
  code: string;
  company: string;
}

export interface Table {
  _id: string;
  name: string;
  company: string;
  description: string;
  status: boolean;
  image: string;
  occupied?: boolean;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  documentType: string;
  typePerson: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  company: string;
  status: boolean;
}
