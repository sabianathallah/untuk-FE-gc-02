import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import baseUrl from '../constant/url';
import { toast } from 'react-toastify';
import Navbar from '../component/navbar.jsx';
import Footer from '../component/footer.jsx';

export default function ImageUpload() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select an image file.");
      return;
    }

    if (!id) {
      toast.error("Product ID not found. Please try again.");
      navigate("/products");
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("access_token");
      

      const formData = new FormData();
      formData.append("file", selectedFile); 


      const response = await axios.patch(
        `${baseUrl}/products/upload/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload response:", response.data);


      toast.success("Image uploaded successfully!");
      

      navigate("/products");
    } catch (error) {
      console.error("Error uploading image:", error);

      toast.error(errorMessage);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-extrabold mb-6 text-dark-jeep text-center">
            Upload Product Image
          </h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

            <div>
              <label
                htmlFor="fileInput"
                className="block text-dark-jeep font-semibold mb-2"
              >
                Select Image
              </label>
              <input
                type="file"
                id="fileInput"
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867]
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 
                file:bg-white/30 file:backdrop-blur-sm file:text-[#232f24] file:font-semibold 
                hover:file:bg-white/50 hover:file:backdrop-blur-md transition"
              />
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
              {selectedFile && (
                <p className="text-sm text-green-600 mt-2">Selected: {selectedFile.name}</p>
              )}
            </div>


            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-[#232f24] text-[#b6c867] px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#b6c867] hover:text-[#232f24] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={uploading}
                className="flex-1 bg-gray-300 text-[#232f24] px-6 py-3 rounded-full font-semibold text-lg hover:bg-gray-400 transition text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="mt-auto bg-transparent">
      </footer>
    </div>
  );
}
