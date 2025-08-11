export default function SponsorSection() {
  return (
    <section
      // id="register"
      style={{
        background: "#FFFFFF",
        // background: "linear-gradient(to bottom, #006937, #055830)",
      }}
      className="pt-4 pb-12 z-10 flex  justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div
        data-aos="fade-right max-w-[1500px]"
        className="flex w-full flex-col"
      >
        {/* Left Text */}
        <div className="justify-center fade-right flex my-9">
          <h2 className="md:text-4xl xl:text-6xl z-10 font-Anton text-2xl text-zinc-900 italic">
            Sponsor & Partner
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 px-4 py-8">
          <div className="flex flex-col items-center">
            <img src="/images/sponsor/sunpride.png" alt="fuit" className="w-1/2 md:w-full h-auto" />
            <h2 className="text-2xl text-center mt-6 font-light lg:text-4xl leading-tight">Official Fruit</h2>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/sponsor/aquviva.png" alt="water" className="w-1/2 md:w-full h-auto" />
            <h2 className="text-2xl text-center mt-6 font-medium lg:text-4xl leading-tight">Official Water</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/images/sponsor/isoplus.png" alt="isotonik" className="w-1/2 md:w-full h-auto" />
            <h2 className="text-2xl text-center mt-6 font-medium lg:text-4xl leading-tight">Official Isotonik</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/images/sponsor/rsi.png" alt="medical" className="w-1/2 md:w-full h-auto" />
            <h2 className="text-2xl text-center mt-6 font-medium lg:text-4xl leading-tight">Official Medical</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center md:grid-cols-4 gap-6 px-4 py-8">
          <div className="flex flex-col">
            <img src="/images/sponsor/teh-balap.png" alt="teh-balap" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/teh-poci.png" alt="teh-poci" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/remix.png" alt="remix" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/indokurnia.png" alt="indokurnia" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/kopiko.png" alt="kopiko" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/aca-asuransi.png" alt="aca-asuransi" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/bsi.png" alt="bsi" className="w-full h-auto" />
          </div>
          <div className="flex flex-col">
            <img src="/images/sponsor/medja-cerita.png" alt="medja-cerita" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
