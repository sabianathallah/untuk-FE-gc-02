import { useNavigate } from "react-router"

export default function LandingPage() {
  const navigate = useNavigate();

  function goToProducts() {
    navigate("/products");
  }

  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jeep — Adventure Awaits</title>

  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    /* Smooth shadow + frosted card look */\n    .frosted {\n      backdrop-filter: blur(20px);\n      -webkit-backdrop-filter: blur(20px);\n      background: rgba(255,255,255,0.35);\n      box-shadow: 0 20px 60px rgba(0,0,0,0.35);\n    }\n    .soft-shadow {\n      box-shadow: 0 10px 30px rgba(0,0,0,0.25);\n    }\n  "
    }}
  />

  <div className="fixed inset-0 -z-10">
    <img
      src="https://www.wfyi.org/files/wfyi/articles/original/jp018-001mm.jpg"
      alt="Jeep background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
  </div>


  <main className="px-6">
    <div className="max-w-7xl mx-auto">
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-2xl frosted rounded-3xl p-8 md:p-12 border border-white/30">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
            Adventure Awaits
            <br />
            <span className="text-[#d4f14f]">Drive Your Freedom</span>
          </h1>
          <p className="mt-6 text-white/95 text-lg md:text-xl leading-relaxed">
            Explore Indonesia with the legendary Jeep. Built for adventure,
            designed for comfort. Discover the latest products and start your
            journey today.
          </p>
          <button
            onClick={goToProducts}
            className="inline-block bg-[#d4f14f] text-[#1a1a1a] px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition shadow-lg"
          >
            See Products
          </button>
        </div>
      </section>
    </div>
  </main>
</>



// ADUHHHHH

    // <>
    //   <div className="bg-gray-100 relative">
    //     {/* Background Image */}
    //     <div className="fixed inset-0 z-0">
    //       <img
    //         src="https://www.wfyi.org/files/wfyi/articles/original/jp018-001mm.jpg"
    //         alt="Jeep Background"
    //         className="w-full h-full object-cover"
    //       />
    //       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />
    //     </div>

    //     {/* Content Wrapper */}
    //     <div className="relative z-10">
    //       {/* Hero Section */}
    //       <section className="relative flex items-center min-h-screen py-16">
    //         <div className="container mx-auto px-6">
    //           <div className="max-w-2xl frosted rounded-3xl p-8 md:p-12 border border-white/30">
    //             <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow">
    //               Adventure Awaits
    //               <br />
    //               <span className="text-[#d4f14f]">Drive Your Freedom</span>
    //             </h1>
    //             <p className="text-lg md:text-xl mb-8 text-white/90">
    //               Explore Indonesia with the legendary Jeep. Built for adventure,
    //               designed for comfort. Discover the latest products and start your
    //               journey today.
    //             </p>
    //             <button
    //               onClick={goToProducts}
    //               className="inline-block bg-[#d4f14f] text-[#1a1a1a] px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition shadow-lg"
    //             >
    //               See Products
    //             </button>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // </>
  )
}
