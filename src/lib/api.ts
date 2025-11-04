import { Product, Collection } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_KEY = process.env.API_KEY!;

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { apikey: API_KEY },
    next: { revalidate: 0 }, // disable caching
  });

  if (!res.ok) throw new Error(`API error: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function getProducts(count: number): Promise<Product[]> {
  return fetchFromAPI<Product[]>(`/api/products?count=${count}`);
}

export async function getCollections(count: number): Promise<Collection[]> {
  return fetchFromAPI<Collection[]>(`/api/collections?count=${count}`);
}
