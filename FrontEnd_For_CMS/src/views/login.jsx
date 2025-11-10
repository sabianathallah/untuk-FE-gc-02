import { useState } from "react"
import axios from 'axios'
import baseUrl from "../constant/url"
import { useNavigate } from "react-router"
import Button from "../component/button.jsx"
import { toast } from 'react-toastify';

export default function Login() {

  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()  
    try {
      const {data} = await axios.post(`${baseUrl}/login`, {
        email,
        password
      })
      localStorage.setItem("access_token", data.access_token)
      toast.success("Login successful! Welcome.")
      navigate("/products")
    } catch (error) {
      console.error("Login failed:", error)
      toast.error(error.response?.data?.message || "Login failed. Please check your email and password.")
    } 
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">

          <div className="relative z-10">
      <nav className="sticky top-0 z-50 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jeep.svg/1280px-Jeep.svg.png"
            alt="Jeep Logo"
            className="h-8"
          />
          <span className="text-[#b6c867] font-bold text-xl tracking-wide text-dark-jeep">CMS</span>
        </div>

      </nav>
    </div>


      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col items-center mb-8">
            <h1 className="text-2xl font-extrabold text-[#232f24]">
              Login 
            </h1>
          </div>


          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867] focus:border-[#b6c867]"
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b6c867] focus:border-[#b6c867]"
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>



            <Button nameProp={"Login"} />
          </form>

        </div>
      </main>


      <footer className="mt-auto bg-transparent">
      </footer>
    </div>
  );
}
