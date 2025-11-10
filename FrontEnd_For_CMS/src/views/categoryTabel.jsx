import { useEffect, useState } from "react"
import {useNavigate} from 'react-router'

import axios from 'axios'
import baseUrl from "../constant/url"

export default function CategoryTabel() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function goToEditCategory(id){
    navigate(`/editCategory/${id}`);
  }

  function goToCreateCategory(){
    navigate('/addCategory');
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f8f8f8]"> {/* background lembut */}

        <main className="flex-grow container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-dark-jeep">Categories</h1>
            <a
              onClick={goToCreateCategory}
              className="text-[#232f24] border border-[#232f24] px-6 py-3 rounded-full font-semibold hover:bg-[#232f24] hover:text-white transition"
            >
              + Add Category
            </a>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-black">ID</th>
                  <th className="px-6 py-4 text-left font-bold text-black">Category Name</th>
                  <th className="px-6 py-4 text-right font-bold text-black w-40">Action</th>
                </tr>
              </thead>
              <tbody id="categoryTableBody" className="divide-y divide-gray-200">
                {categories.map((c) => (
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-black">{c.id}</td>
                  <td className="px-6 py-4 font-semibold text-black">{c.name}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      onClick={() => goToEditCategory(c.id)}
                      className="inline-block px-4 py-2 border border-[#232f24] text-[#232f24] rounded-full font-semibold text-sm hover:bg-[#232f24] hover:text-white transition"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </>
  );
}
