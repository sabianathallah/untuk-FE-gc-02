import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../constant/url";
import Button from "../component/button";
import { toast } from 'react-toastify';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    CategoryId: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load category list. ");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      

      const productData = {
        ...formData,
        imageUrl: "" 
      };
      
      const { data } = await axios.post(
        `${baseUrl}/products`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      navigate(`/image-upload/${data.data.id}`);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Failed to add product.");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-dark-jeep text-center">
            Add New Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label
                htmlFor="name"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
                placeholder="e.g., Jeep Wrangler Sport"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
                placeholder="Enter product description..."
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Price (Rp)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
                placeholder="e.g., 1200000000"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label
                htmlFor="categoryId"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="categoryId"
                name="CategoryId"
                value={formData.CategoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Button nameProp="Add Product" />
              </div>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="flex-1 bg-gray-300 text-[#232f24] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-400 transition text-center"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
