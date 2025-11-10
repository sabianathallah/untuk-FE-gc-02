export default function Navbar() {
    return(
    <div className="relative z-10">
  <nav className="sticky top-0 z-50 backdrop-blur-sm px-6 py-4 flex items-center justify-between shadow">
    <div className="flex items-center space-x-3">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jeep.svg/1280px-Jeep.svg.png"
        alt="Jeep Logo"
        className="h-8"
      />
      <span className="text-[#b6c867] font-bold text-xl tracking-wide text-dark-jeep" />
    </div>
  </nav>
</div>

)

}
