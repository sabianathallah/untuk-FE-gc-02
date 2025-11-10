import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from 'react-toastify';
import baseUrl from "../constant/url";
import axios from "axios";

export default function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState({})

async function fetchProductDetail() {
  try {
    const { data } = await axios.get(`${baseUrl}/pub/products/${id}`)
    setProduct(data.data)
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Failed to load product details. Please try again later.");
  }
}

    useEffect(() => {
        fetchProductDetail()
    }, [])

    useEffect(() => {
  console.log(product);
  }, [product]);

  return (
    <>

  <div className="container mx-auto px-4 py-10">
    <div className="flex flex-col md:flex-row gap-10">

      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt="Jeep Wrangler"
          className="rounded-2xl shadow-lg w-full max-w-md"
        />
      </div>

      <div className="md:w-1/2">

        <h1 className="text-4xl font-extrabold mb-4 text-dark-jeep">
          {product.name}
        </h1>

        <span className="text-[#b6c867] font-bold text-2xl mb-6 block">
          Rp {product.price}
        </span>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-dark-jeep">
            Description
          </h3>
          <p className="text-lg text-dark-jeep">
            {product.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-dark-jeep">Stock</h3>
          <p className="text-lg text-dark-jeep">
            Available:{" "}
            <span className="font-bold text-[#b6c867]">{product.stock} units</span>
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-dark-jeep">
            Category
          </h3>
          <p className="text-lg text-dark-jeep">
            <span className="bg-[#b6c867] text-[#232f24] px-4 py-2 rounded-full font">
              {product.Category?.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</>
  )
}