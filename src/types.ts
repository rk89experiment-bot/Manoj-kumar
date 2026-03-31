export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  image: string;
  category: string;
  rating: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
