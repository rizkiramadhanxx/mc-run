export default function RoutesSection() {
  return (
    <section
      id="about"
      className="pt-12 pb-12 z-10 flex bg-white justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div data-aos="fade-right" className="flex w-full flex-col">
        {/* Left Text */}
        <div className="justify-center fade-right flex">
          <h2 className="text-4xl font-bold text-[#055830]">Rute Lari 5 Km</h2>
        </div>

        <div className="grid w-full grid-cols-1 mt-10 lg:grid-cols-2 gap-4">
          <div>
            <img
              className="max-h-[600px]"
              src="https://run.alfamart.co.id/static/images/Rute-10K.png"
              alt="rute"
            />
          </div>
          <div className="border-[#055830] flex justify-center items-center">
            <ol className="list-decimal pl-4 space-y-2 text-[#055830] text-base">
              <li>
                <strong>Start / Finish:</strong> FX Sudirman - Jl. Gatot Subroto
              </li>
              <li>
                <strong>Titik 1:</strong> Menuju Bundaran Semanggi (Jl. Gatot
                Subroto)
              </li>
              <li>
                <strong>Titik 2:</strong> Belok kiri ke Jl. Jend. Sudirman (arah
                selatan)
              </li>
              <li>
                <strong>Titik 3:</strong> Lurus di Jl. Jend. Sudirman, melewati
                SCBD
              </li>
              <li>
                <strong>Titik 4:</strong> Belok kiri ke Jl. Pattimura
              </li>
              <li>
                <strong>Titik 5:</strong> U-turn di ujung Jl. Pattimura (dekat
                Trunojoyo)
              </li>
              <li>
                <strong>Titik 6:</strong> Kembali ke utara di Jl. Pattimura
              </li>
              <li>
                <strong>Titik 7:</strong> Masuk ke kawasan SCBD
              </li>
              <li>
                <strong>Titik 8:</strong> Berputar di dalam area SCBD
              </li>
              <li>
                <strong>Titik 9:</strong> Kembali ke Jl. Jend. Sudirman dan
                finish
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
