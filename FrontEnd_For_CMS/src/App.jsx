import { BrowserRouter, Routes, Route } from "react-router"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddCategory from "./views/addCategory"
import CategoryTabel from "./views/categoryTabel"
import CreateProduct from "./views/createProduct"
import ImageUpload  from "./views/imageUpload"
import Login from "./views/login"
import ProductTabel from "./views/productTabel"
import Register from "./views/register"
import BaseLayout from "./views/baseLayout";
import EditCategory from "./views/editCategory";
import EditProduct from "./views/editProduct";
import ProtectedRoute from "./component/protectedRoute";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route element={
                    <ProtectedRoute>
                      <BaseLayout />
                    </ProtectedRoute>
                  }>
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<ProductTabel />} />
                    <Route path="/editProduct/:id" element={<EditProduct />} />
                    <Route path="/addProduct" element={<CreateProduct />} />
                    <Route path="/categories" element={<CategoryTabel />} />
                    <Route path="/editCategory/:id" element={<EditCategory />} /> 
                    <Route path="/addCategory" element={<AddCategory />} />
                    <Route path="/image-upload/:id" element={<ImageUpload />} />
                  </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastStyle={{
                    backgroundColor: '#ffffff',
                    color: '#232f24',
                    borderLeft: '4px solid #b6c867'
                }}
            />
        </>
    )
}