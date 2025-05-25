export default function AboutSection() {
  return (
    <section
      id="about"
      className="pt-12 pb-12  overflow-hidden bg-[#2e9430] z-10 flex justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div
        data-aos="fade-right"
        className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-12 items-center"
      >
        <div data-aos="fade-left" className="flex  justify-center">
          <img
            src={"/images/our-mission.png"}
            className=" hidden md:block z-0"
            alt="preview"
            width={500}
            height={500}
            loading="lazy"
          />
        </div>
        {/* Left Text */}
        <div className="z-10">
          <h2 className="text-3xl lg:text-5xl font-Anton italic text-center mb-6 text-white">
            OUR MISSION
          </h2>
          <div className="font-Unageo text-white">
            <div className="lg:text-xl mt-6">
              Dalam rangka merayakan Hari Ulang Tahun Mutiara Cahaya yang ke-29,
              Mutiara Cahaya bersama TCR dengan bangga mempersembahkan acara
              tahunan MC RUN 2025 dengan tema “Light Your Way”.
            </div>
            <div className="lg:text-xl mt-6">
              Lebih dari sekadar sebuah perayaan, MC RUN 2025 menjadi wadah
              untuk memperkuat semangat kebersamaan, menumbuhkan gaya hidup
              sehat, serta mempererat hubungan antar anggota masyarakat. Mutiara
              Cahaya senantiasa berkomitmen untuk memberikan kontribusi positif
              bagi masyarakat melalui kegiatan yang inspiratif.
            </div>

            <div className="lg:text-xl mt-6">
              Mutiara Cahaya bertekad untuk menjadikan MC Run 2025 sebagai ajang
              paling meriah di Kabupaten Tegal, sekaligus mendorong agar acara
              ini dapat diselenggarakan secara rutin setiap tahunnya. MC Run
              2025 diharapkan dapat menjadi ikon Olahraga dan Pariwisata Baru di
              Kabupaten Tegal, yang mampu mempererat Silaturahmi antar
              Masyarakat Kabupaten Tegal.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
