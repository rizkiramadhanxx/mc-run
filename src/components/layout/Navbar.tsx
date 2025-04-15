import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10); // threshold to trigger solid background
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      backgroundColor: scrolled ? "#006937" : "rgba(0, 0, 0, 0)",
      color: scrolled ? "#ffffff" : "#ffffff",
      transition: { duration: 0.3 },
    });
  }, [scrolled, controls]);

  return (
    <motion.nav
      animate={controls}
      className="z-20 text-xl  items-center sm:gap-4 fixed w-full py-[15px] md:py-[20px] top-0 flex justify-between lg:justify-center px-3 lg:px-12 font-semibold "
    >
      <a
        href="#home"
        aria-label="Beranda"
        className="hover:text-white hidden lg:block  hover:bg-[#006937] px-3 py-1 rounded-xl transition"
      >
        Beranda
      </a>
      <a
        href="#about"
        aria-label="Tentang"
        className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
      >
        Tentang
      </a>
      <a
        href="#activity"
        aria-label="Aktivitas"
        className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
      >
        Acara
      </a>
      <a
        href="#testimony"
        aria-label="Testimoni"
        className="hover:text-white hidden lg:block hover:bg-[#006937] px-3 py-1 rounded-xl transition"
      >
        Testimoni
      </a>
      <img
        data-aos="zoom-in"
        src="https://run.alfamart.co.id/static/images/logo_alfamartrun.png"
        alt="logo"
        className="h-[30px] lg:hidden"
      />
      <RxHamburgerMenu className="lg:hidden" />
    </motion.nav>
  );
}
