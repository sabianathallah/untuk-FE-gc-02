import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import baseUrl from "../constant/url";
import Button from "../component/button";
import { toast } from 'react-toastify';

export default function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `${baseUrl}/categories`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Category added successfully!");
      navigate("/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold mb-6 text-dark-jeep text-center">
            Add Category
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-dark-jeep font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]"
                placeholder="e.g., Wrangler"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Button nameProp="Add Category" />
              </div>
              <button
                type="button"
                onClick={() => navigate("/categories")}
                className="flex-1 bg-gray-300 text-[#232f24] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-400 transition text-center"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-auto">
      </footer>
    </div>
  );
}
