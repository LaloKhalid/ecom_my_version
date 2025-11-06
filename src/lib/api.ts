import { Product, Collection } from '@/types/api';

// Read environment variables safely
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // make it public if used on client side

if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in .env.local');
if (!API_KEY) throw new Error('NEXT_PUBLIC_API_KEY is not defined in .env.local');

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
