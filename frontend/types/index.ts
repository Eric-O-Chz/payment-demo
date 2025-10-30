export interface IUser {
  _id: string;
  name: string;
  email: string;
}
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  priceInCents: number;
}
export interface IOrderItem {
  _id: string;
  name: string;
  priceInCents: number;
  quantity: number;
}
export interface IOrder {
  _id: string;
  products: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string | Date;
}
