export default function RegisterSection() {
  return (
    <section
      id="about"
      className="pt-12 pb-12 z-10 flex bg-[#006937] justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div data-aos="fade-right " className="flex w-full flex-col">
        {/* Left Text */}
        <div className="justify-center fade-right flex">
          <h2 className="text-4xl font-bold  text-white">Registrasi</h2>
        </div>

        <div className="grid w-full grid-cols-1 mt-10 lg:grid-cols-3 gap-4">
          {[1, 1, 1].map((i) => (
            <div
              key={i}
              className="h-min-[100px] w-full items-center gap-4 bg-white px-4 py-5 text-sm border-2 border-dashed border-sky-200 text-[#006937] rounded-md font-medium"
            >
              <div className="text-2xl font-bold text-center">Presale 1</div>
              <div className="mt-2 text-center">
                1 januari 2023 - 31 januari 2023
              </div>
              <div className="mt-4 text-center text-4xl">Rp. 5000</div>
              <a
                href="#join&follow"
                className="flex justify-center mt-4 items-center whitespace-nowrap bg-[#006937] hover:bg-[#055830] text-white font-semibold rounded-lg px-6 py-3 transition"
              >
                Daftar Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
