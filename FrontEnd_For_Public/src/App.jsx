import { BrowserRouter, Routes, Route } from "react-router"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BaseLayout from "./views/baseLayout"
import LandingPage from "./views/landingPage"
import ProductList from "./views/productsList"
import ProductDetail from "./views/productDetail"

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                  <Route element={<BaseLayout />}>
                        <Route path="/" index element={<LandingPage />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
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