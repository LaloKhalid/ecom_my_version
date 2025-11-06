// src/app/page.tsx
import React from 'react'
import { getProducts, getCollections } from '@/lib/api'
import ProductsGrid from '@/components/ProductsGrid'
import CollectionsGrid from '@/components/CollectionsGrid'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import SliderOne from '@/components/Slider/SliderOne'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import ModalNewsletter from '@/components/Modal/ModalNewsletter'

interface HomePageProps {
  searchParams?: {
    productCount?: string
    collectionCount?: string
  }
}

// This is a server component — fetch happens on the server
export default async function HomePage({ searchParams }: HomePageProps) {
  // Parse counts from query string, fallback to 4, max 20
  const productCount = Math.min(Number(searchParams?.productCount ?? 4), 20)
  const collectionCount = Math.min(Number(searchParams?.collectionCount ?? 4), 20)

  // Fetch products and collections on the server
  const [products, collections] = await Promise.all([
    getProducts(productCount),
    getCollections(collectionCount),
  ])

  return (
    <>
      {/* Header */}
      <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <SliderOne />
      </div>

      {/* Products Section */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {products.length ? <ProductsGrid products={products} /> : <p className="text-gray-500">No products found.</p>}
      </section>

      {/* Collections Section */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Collections</h2>
        {collections.length ? <CollectionsGrid collections={collections} /> : <p className="text-gray-500">No collections found.</p>}
      </section>

      {/* Other homepage components */}
      <Brand />
      <Footer />
      <ModalNewsletter />
    </>
  )
}

