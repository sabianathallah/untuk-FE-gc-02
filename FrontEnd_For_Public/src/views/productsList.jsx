import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseUrl from '../constant/url.js'

import Card from '../component/card.jsx';
import Loading from '../component/loading.jsx';

export default function ProductsList() {


  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pages = generatePages();


  async function fetchProducts() {
  try {
  setLoading(true);
  const {data} = await axios.get(`${baseUrl}/pub/products?search=${search}&pages=${currentPage}&limits=6`);

    const result = data.data;

    setProducts(result.data);
    setCurrentPage(result.currentPage);
    setTotalPage(result.totalPage);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault()
    if (currentPage === 1) {
      fetchProducts()
    } else {
      setCurrentPage(1)
    }
  }

    function generatePages() {
        const array = []
        for (let i = 1; i <= totalPage; i++) {
            array.push(i)
        }

        return array
    }

  function handlePage(page){
    setCurrentPage(page)
  }

  function handlePrevious(){
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNext(){
    if(currentPage < totalPage){
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // useEffect(() => {
  // console.log(products);
  // })


  // Render the product list page
    return (
        <>

  <div className="container mx-auto px-4 py-10">

      {/* Search */}
      <form className='max-w-md mx-auto border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]' onSubmit={handleSearch}>
        <div className="relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            {defaultIcon}
          </div>
          <input
            className= 'peer h-full w-full outline-none text-sm text-gray-800 pr-2'
            type="text"
            id= "search"
            placeholder= 'search products...'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

    {loading ? (
      <Loading />
    ) : (
      <>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2">

            {/* cannot get property, soalnya itu ga di end point public abangku */}

            {/* <select className="rounded border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6c867]">
              <option>All Categories</option>
              <option>SUV</option>
              <option>Mobil</option>
              {}
            </select> */}
            
            {/* <select className="rounded border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b6c867]">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A-Z</option>
            </select> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            return <Card product={product} key={product.id} fetchProducts={fetchProducts} />
          })}
        </div>

        <br></br>

        <div className="flex justify-center mb-10">

          <nav className="flex items-center justify-center gap-x-1">
            <button
              type="button"
              className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
              onClick={handlePrevious}
              disabled={currentPage <= 1 ? true : false}
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="{2}"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-x-1">
              {pages.map((page) => {
                return (
                  <div key={page}>
                    <button
                      type="button"
                      className={page === currentPage ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-purple-400 py-2 px-3 text-sm border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                      onClick={() => handlePage(page)}
                    >
                      {page}
                    </button>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
              onClick={handleNext}
              disabled={currentPage >= totalPage ? true : false}
            >
              <span>Next</span>
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="{2}"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </nav>
        </div>
      </>
    )}
  </div>
</>



    )
}