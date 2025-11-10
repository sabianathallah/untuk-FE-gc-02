import {NavLink, useNavigate} from 'react-router'


export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }


  return (
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

        <ul className="flex items-center space-x-6">
          <li>
            <NavLink to="/products" className="text-gray-700 hover:text-gray-900">Products</NavLink>
          </li>
          <li>
            <NavLink to="/categories" className="text-gray-700 hover:text-gray-900">Categories</NavLink>
          </li>
          <li>
            <NavLink to="/register" className="text-gray-700 hover:text-gray-900">Add User</NavLink>
          </li>
          <li>
               <a onClick={handleLogout} className="text-2xl font-bold px-6 cursor-pointer text-red-700">
                <span>Logout</span>
              </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
