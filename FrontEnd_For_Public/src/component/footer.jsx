export default function Footer() {
  return (
    <footer className="bg-[#232f24]/95 backdrop-blur-sm text-[#b6c867] py-8">
      <div className="container mx-auto px-6 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jeep.svg/1280px-Jeep.svg.png"
          alt="Jeep Logo"
          className="h-8 mx-auto mb-2"
        />
        <div className="mb-2 text-white">
          © 2025 Jeep Indonesia. All Rights Reserved.
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:text-white">
            Instagram
          </a>
          <a href="#" className="hover:text-white">
            Facebook
          </a>
          <a href="#" className="hover:text-white">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  )
};

