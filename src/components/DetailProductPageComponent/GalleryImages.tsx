'use client'
import { Product } from "@/type/typeProduct"
import { useEffect, useState } from 'react'

type ProductDetail = {
  data: Product
}

export default function GalleryImages({ dataProductDetail }: { dataProductDetail: ProductDetail }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const changeImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  useEffect(() => {
  }, [selectedImageIndex])

  return (
    <>
      <div className="h-64 md:h-80 rounded-lg mb-4">
        {dataProductDetail.data.images.map((imageUrl, index) => (
          <div
            key={index}
            style={{ display: selectedImageIndex === index ? 'block' : 'none' }}
            className="h-64 md:h-80 rounded-lg mb-4 flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt={`Product ${dataProductDetail.data.name} Image ${index + 1}`}
              className="w-full h-64 md:h-80 rounded-lg object-cover border-base-content border"
            />
          </div>
        ))}
      </div>
      <div className="flex -mx-2 mb-4">
        {dataProductDetail.data.images.map((imageUrl, index) => (
          <div className="flex-1 px-2" key={index}>
            <img
              onClick={() => changeImage(index)}
              src={imageUrl}
              alt={`Product ${dataProductDetail.data.name} Small Image ${index + 1}`}
              className={`border border-base-content cursor-pointer focus:outline-none w-full rounded-lg h-24 md:h-32 object-cover ${
                selectedImageIndex === index ? 'shadow-lg hover:shadow-xl scale-105 border-2' : ''
              }`}
              
            />
          </div>
        ))}
      </div>
    </>
  )
}
