import {Link} from "react-router"
import baseUrl from "../constant/url"
import axios from 'axios'
import { useState } from "react"


export default function Card ({product, fetchProducts}){
    return(
        <>
              <div className="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col items-center">
        <img
          src={product.imageUrl}
          alt="product image"
          className="h-40 mb-4 rounded-lg"
        />
        <h3 className="font-semibold text-xl mb-2 text-dark-jeep">
          {product.name}
        </h3>
        <span className="text-[#b6c867] font-bold text-lg mb-4">
          {product.price}
        </span>
        <Link to={`/products/${product.id}`} className="bg-[#232f24] text-[#b6c867] px-6 py-2 rounded-full font-medium hover:bg-[#b6c867] hover:text-[#232f24] transition">
          View Details
        </Link>
      </div>
  
        </>
    )
}