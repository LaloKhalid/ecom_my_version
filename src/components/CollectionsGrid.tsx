import React from 'react'
import { Collection } from '@/type/api'

interface CollectionsGridProps {
  collections: Collection[]
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
  if (!collections || collections.length === 0) {
    return <p className="text-gray-500">No collections found.</p>
  }

  // Handle footer-specific display logic (if needed)
  const displayCollections = collections.length > 5 ? collections.slice(0, 4) : collections

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {displayCollections.map((collection) => (
        <div key={collection.id} className="border rounded p-4 hover:shadow-lg transition">
          {collection.heroImage && (
            <img
              src={collection.heroImage.url}
              alt={collection.heroImage.alt || collection.title}
              className="w-full h-40 object-cover mb-2"
            />
          )}
          <h3 className="font-semibold text-lg">{collection.title}</h3>
        </div>
      ))}

      {/* Optional “View all collections” button if more than 5 */}
      {collections.length > 5 && (
        <button className="border rounded p-4 text-center hover:bg-gray-100 transition">
          View all collections
        </button>
      )}
    </div>
  )
}
