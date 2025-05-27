import { URL_CTA } from "../../constant/common";

export default function RegisterSection() {
  return (
    <section
      id="register"
      style={{
        background: "linear-gradient(to bottom, #055830, #006937)",
      }}
      className="pt-12 pb-12 z-10 flex  justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div data-aos="fade-right " className="flex w-full flex-col">
        {/* Left Text */}
        <div className="justify-center fade-right flex">
          <h2 className="xl:text-6xl font-Anton text-2xl  text-white italic">
            Registrasi
          </h2>
        </div>
        <div className="justify-center fade-right flex">
          <h3 className="mt-[12px] text-4xl font-Anton text-white italic">
            Early Bird
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 px-4 py-8">
          {/* Kategori Umum */}
          <div className="flex flex-col items-center justify-center text-white ">
            <div className="flex flex-row items-center sm:space-x-2 text-center sm:text-left">
              <h1 className="text-[100px] m md:text-[160px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                5K
              </h1>
              <div className="flex flex-col justify-center mt-4 sm:mt-0">
                <h2 className="text-[40px] md:text-[60px] ml-0 sm:ml-6 font-Anton leading-none italic">
                  FUN RUN
                </h2>
                <span className="mt-2 italic text-nowrap bg-[#084438] w-full sm:w-[90%] sm:-ml-1 px-4 py-1 text-white text-base md:text-lg font-bold rounded-sm">
                  KATEGORI UMUM
                </span>
              </div>
            </div>
            <div className="font-medium text-2xl md:text-4xl border-2 border-white rounded-xl mt-4 bg-gradient-to-t from-white to-[#34925d] px-4 py-2 text-[#084438]">
              Rp 200.000
            </div>
          </div>

          {/* Kategori Kids & Family */}
          <div className="flex flex-col items-center justify-center text-white">
            <div className="flex flex-row items-center sm:space-x-2 z-10 text-center sm:text-left">
              <h1 className="text-[90px] md:text-[140px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                2,9K
              </h1>
              <div className="flex flex-col justify-center mt-4 sm:mt-0">
                <h2 className="text-[40px] md:text-[60px] ml-6 sm:ml-6 font-Anton leading-none italic">
                  FUN RUN
                </h2>
                <span className="mt-2 italic bg-[#084438] sm:-ml-1 px-4 py-1 text-white text-[8px] md:text-lg font-bold rounded-sm">
                  KATEGORI KIDS <br className="hidden sm:block" /> & FAMILY
                </span>
              </div>
            </div>
            <div className="font-medium text-2xl md:text-4xl border-2 border-white rounded-xl mt-4 bg-gradient-to-t from-white to-[#34925d] px-4 py-2 text-[#084438]">
              Rp 200.000
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href={URL_CTA}
            className="bg-[#e01f20] font-Unageo cursor-pointer hover:bg-[#ff0000]   text-white font-bold py-[12px] px-[40px] rounded-xl shadow-2xl border-white border-2"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
