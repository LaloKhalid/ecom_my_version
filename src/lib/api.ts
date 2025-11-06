// src/lib/api.ts

import { Product, Collection } from '@/type/api'

// ✅ Environment variables (private, server-side only)
const BASE_URL = process.env.API_BASE_URL || 'https://xperimental-api-17977816405.europe-west1.run.app'
const API_KEY = process.env.API_KEY || 'zPbjwPa453VicJ7xkFCA/aA5ELKgqrcj65WzmWOP57Y='

if (!BASE_URL) throw new Error('API_BASE_URL is not defined in .env')
if (!API_KEY) throw new Error('API_KEY is not defined in .env')

// ✅ Generic fetch helper
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      apikey: API_KEY,
    },
    // Disable caching for fresh data
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    console.error(`API error ${res.status}: ${res.statusText}`)
    throw new Error(`API error: ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

// ✅ Fetch Products
export async function getProducts(count: number): Promise<Product[]> {
  if (!count || count <= 0) return []
  return fetchFromAPI<Product[]>(`/api/products?count=${count}`)
}

// ✅ Fetch Collections
export async function getCollections(count: number): Promise<Collection[]> {
  if (!count || count <= 0) return []
  return fetchFromAPI<Collection[]>(`/api/collections?count=${count}`)
}
