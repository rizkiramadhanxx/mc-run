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
      <div
        data-aos="fade-right max-w-[1500px]"
        className="flex w-full flex-col mb-15"
      >
        {/* Left Text */}
        <div className="justify-center fade-right flex">
          <h2 className="xl:text-6xl z-10  font-Anton text-2xl  text-white italic">
            Register
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 px-4 py-8 z-10">
          {/* Kategori Umum */}
          <img src="/images/register-umum.png" alt="fuit" className="w-full h-auto" />

          {/* Kategori Kids & Family */}
          <img src="/images/register-family.png" alt="fuit" className="w-full h-auto" />
        </div>

        <div className="flex justify-center">
          <a
            href={URL_CTA}
            target="_blank"
            className="bg-[#084438] font-Unageo cursor-pointer hover:bg-[#1b302c] text-2xl text-white font-bold py-[10px] px-[20px] md:py-[15px] md:px-[20px] xl:text-6xl xl:py-[30px] xl:px-[50px] rounded-xl shadow-2xl border-white border-2 border-b-4"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </section>
  );
}
