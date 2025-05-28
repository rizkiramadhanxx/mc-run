import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false); // Close menu after click
    }
  };

  return (
    <>
      <nav
        className={`z-20 text-xl items-center sm:gap-4 fixed w-full py-[15px] md:py-[20px] top-0 flex justify-between lg:justify-center px-3 lg:px-12 font-semibold transition-all duration-300 ${
          scrolled ? "bg-[#006937] text-white" : "bg-transparent text-white"
        }`}
      >
        <button
          onClick={() => scrollToId("home")}
          aria-label="Beranda"
          className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
        >
          Home
        </button>
        <button
          onClick={() => scrollToId("mission")}
          aria-label="Tentang"
          className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
        >
          Our Mission
        </button>
        <button
          onClick={() => scrollToId("route")}
          aria-label="Rute"
          className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
        >
          Route
        </button>
        <button
          onClick={() => scrollToId("benefit")}
          aria-label="Manfaat"
          className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
        >
          Benefit
        </button>
        <button
          onClick={() => scrollToId("register")}
          aria-label="Registrasi"
          className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
        >
          Registrasi
        </button>

        <img
          data-aos="zoom-in"
          src="/images/logo-white.png"
          alt="logo"
          className="h-[30px] lg:hidden"
        />

        <RxHamburgerMenu
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-[#006937] text-white z-30 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <IoClose
            className="text-4xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-[80%] gap-6 text-2xl font-semibold">
          <button onClick={() => scrollToId("home")}>Home</button>
          <button onClick={() => scrollToId("mission")}>Our Mission</button>
          <button onClick={() => scrollToId("route")}>Route</button>
          <button onClick={() => scrollToId("benefit")}>Benefit</button>
          <button onClick={() => scrollToId("register")}>Registrasi</button>
        </div>
      </div>
    </>
  );
}
