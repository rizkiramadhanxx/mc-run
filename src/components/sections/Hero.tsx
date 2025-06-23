import { URL_CTA } from "../../constant/common";

export default function HeroSection() {
  return (
    <section
      id="home"
      // bg image
      className="relative px-2 bg-[linear-gradient(to_bottom_right,_rgba(0,0,0,0.4),_rgba(0,0,0,1)),url('/images/background-hero.jpg')] bg-cover bg-center"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a9031]/10  to-[#2e9430]/70 z-0 pointer-events-none" />

      <header className="grid max-w-[1500px] z-10 grid-cols-1 xl:grid-cols-2 pt-[150px] xl:pt-0 xl:mx-[150px] pb-5 items-center md:min-h-svh  mx-auto  gap-y-4 gap-x-2">
        <div className="xl:flex flex-1 relative hidden h-full flex-col justify-center items-center">
          <div className="absolute z-10 bottom-[10%]">
            <img
              src="/images/keren.png"
              className="max-w-[150px] md:max-w-[500px]"
              alt="keren"
            />
          </div>
          <img
            data-aos="zoom-in"
            src="/images/hero-left.png"
            className="h-[100vh] mt-[100px] z-[0] object-cover"
            alt="logo"
          />
        </div>
        <div className="flex h-full flex-col justify-center items-center gap-4 ">
          <div data-aos="fade-up" className="flex flex-col  gap-3 mt-4 sm:mt-8">
            <div className="flex justify-center relative">
              <img
                src="/images/logo-white.png"
                className="max-w-[150px] md:max-w-[300px]"
                alt="banner"
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-3 z-10 ">
              <div className="flex flex-col items-center rounded-md border-2    bg-gradient-to-b from-[#1fa463] to-[#0c6b3a] shadow-[inset_0_2px_0_#ffffff,inset_-2px_0_0_#ffffff,inset_2px_0_0_#00000020,inset_0_-2px_0_#00000020] py-2 px-2 justify-center text-white">
                <div className="flex flex-row items-center sm:space-x-2 z-10 text-center sm:text-left">
                  <h1 className="text-[60px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                    5K
                  </h1>
                  <div className="flex flex-col justify-center mt-4 sm:mt-0">
                    <h2 className="text-[14px] md:text-[20px] ml-6 sm:ml-6 font-Anton text-nowrap leading-none italic">
                      FUN RUN
                    </h2>
                    <span className="mt-2 italic bg-[#084438] sm:-ml-1 py-1 px-1 text-white text-[6px] md:text-xs font-bold rounded-sm">
                      KATEGORI UMUM
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center rounded-md border-2  z-10    bg-gradient-to-b from-[#1fa463] to-[#0c6b3a] shadow-[inset_0_2px_0_#ffffff,inset_-2px_0_0_#ffffff,inset_2px_0_0_#00000020,inset_0_-2px_0_#00000020] py-2 px-2 justify-center text-white">
                <div className="flex flex-row items-center sm:space-x-2 z-10 text-center sm:text-left">
                  <h1 className="text-[60px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                    2,9K
                  </h1>
                  <div className="flex flex-col justify-center mt-4 sm:mt-0">
                    <h2 className="text-[14px] md:text-[20px] ml-2 sm:ml-2 font-Anton text-nowrap leading-none italic">
                      FUN RUN
                    </h2>
                    <span className="italic mt-2 bg-[#084438] sm:-ml-1 py-1 px-1 text-white text-[6px] md:text-[8px] font-bold rounded-sm">
                      KATEGORI KIDS <br className="hidden sm:block" /> & FAMILY
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center z-10 ">
              <div className="font-Anton text-2xl italic px-2 py-1 bg-gradient-to-b from-white/100 to-white/5 text-[#084438]">
                SAVE THE DATE
              </div>
            </div>
            <div className="flex gap-5 items-center justify-center mt-4 z-10 ">
              <div className="flex flex-row items-center gap-3">
                <div className="font-Anton text-6xl md:text-8xl text-white">
                  31
                </div>
                <div className="font-Anton text-sm md:text-3xl text-white">
                  <div>Agustus</div>
                  <div>2025</div>
                </div>
              </div>
              <div className="bg-white h-full w-[1px]"></div>
              <div className="font-Archivo leading-none text-xl md:text-2xl text-white">
                LINGKUNGAN <br />
                GOR TRISANJA <br />
                SLAWI
              </div>
            </div>
            <div className="flex justify-center z-10">
              <a
                href={URL_CTA}
                target="_blank"
                className="font-Anton text-2xl italic px-2 py-1 rounded-md bg-white text-[#084438]"
              >
                DAFTAR SEKARANG
              </a>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
