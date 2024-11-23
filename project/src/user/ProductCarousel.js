import React, { useState } from 'react';

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerSlide = 4; // Show 4 products per slide

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / productsPerSlide));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / productsPerSlide)) % Math.ceil(products.length / productsPerSlide));
  };

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto"> {/* Adjust width as needed */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / productsPerSlide)}%)` }}>
          {products.map((product, index) => (
            <div key={index} className="w-1/4 p-4 flex-shrink-0"> {/* Use w-1/4 to fit 4 products */}
              <div className="border rounded p-2">
                <img
                  src={product.photo}
                  alt={product.pname}
                  className="block w-full h-auto rounded"
                />
                <h5 className="mt-2 text-center">{product.pname}</h5>
                <p className="text-center text-danger fs-5">
                  <i className="fa fa-rupee text-primary"></i> {product.pprice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={prevSlide}
        disabled={products.length <= 1}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={nextSlide}
        disabled={products.length <= 1}
      >
        ›
      </button>
    </div>
  );
};

export default ProductCarousel;
