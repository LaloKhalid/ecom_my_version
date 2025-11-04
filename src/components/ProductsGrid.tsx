import React from 'react'
import { Product } from '@/type/api'

interface ProductsGridProps {
  products: Product[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products found.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4 hover:shadow-lg transition">
          {product.images[0] && (
            <img
              src={product.images[0].url}
              alt={product.images[0].alt || product.title}
              className="w-full h-40 object-cover mb-2"
            />
          )}
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-gray-700">
            {product.price.currency} {product.price.amount}
          </p>
          {product.brand && <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>}
        </div>
      ))}
    </div>
  )
}
