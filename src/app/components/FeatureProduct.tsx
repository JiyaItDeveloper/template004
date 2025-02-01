'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from '@/sanity/lib/image'; // Adjust import path as necessary
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/quires";
import Swal from 'sweetalert2'
import { addToCart } from "../actions/act";
const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handlrAddToCart = (e: React.MouseEvent,product:Product)=>{
    e.preventDefault()
    Swal.fire({
      position:'top-right',
      icon:'success',
      title:`${product.name} added to cart`,
      showConfirmButton:false,
      timer:1000
    })
    addToCart(product)  
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Heading */}
      <h2 className="text-[#3F509E] text-4xl text-center font-bold mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            <Link href={`/product/${product.slug?.current || "#"}`} passHref>
              
                {product.image && (
                  <Image
                    src={urlFor(product.image).url()}
                    alt={product.name || "Product Image"}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                )}
              
            </Link>
            <h2 className="text-[#3F509E] text-lg font-semibold mt-4">
              {product.name}
            </h2>
            <p className="text-gray-500 mt-2">
              {product.price ? `$${product.price}` : "Price not available"}
            </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 *
          rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out "
          onClick={(e) => handlrAddToCart(e,product)}
          >
         Add To Cart
          </button>
        </div>
  

          
        ))}
      </div>
    </div>
  );
};

 export default FeaturedProducts    
  
  










