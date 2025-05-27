import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
    }
  };

  return (
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
        src="https://run.alfamart.co.id/static/images/logo_alfamartrun.png"
        alt="logo"
        className="h-[30px] lg:hidden"
      />
      <RxHamburgerMenu className="lg:hidden" />
    </nav>
  );
}
