import Slider, { Settings } from "react-slick";
const dataSlider = [
  {
    label: "Mystery Trolley",
    image: "/images/benefit/mystery-trolley.png",
  },
  {
    label: "Potential Podium",
    image: "/images/benefit/podium.png",
  },
  {
    label: "Cheer",
    image: "/images/benefit/cheer.png",
  },
  {
    label: "Zumba Party",
    image: "/images/benefit/zumba.png",
  },
  {
    label: "The Bigger Doorprize",
    image: "/images/benefit/doorprize.png",
  },
  {
    label: "Best Costume Competition",
    image: "/images/benefit/best.png",
  },
  {
    label: "Finisher Medal",
    image: "/images/benefit/medal.png",
  },
  {
    label: "Bib Number",
    image: "/images/benefit/bib.png",
  },
  {
    label: "Running Jersey",
    image: "/images/benefit/baju.png",
  },
];
export default function RoutesSection() {
  const settings: Settings = {
    dots: false,
    infinite: true,
    // auto play
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 8,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section
        id="route"
        className="pt-12 -z-0 flex bg-[#309c2d] justify-center md:px-[80px] sm:px-12 px-6"
      >
        <div data-aos="fade-right" className="flex w-full flex-col">
          {/* Left Text */}
          <div className="justify-center fade-right flex">
            <h2 className=" z-10 text-3xl lg:text-5xl font-Anton italic text-center mb-6 text-white">
              Running Route
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex gap-3 md:gap-0 items-center flex-col md:flex-row md:justify-end">
              <img
                src="/vector/route-01.svg"
                className="md:max-w-[80%] z-10 w-full"
                alt="rute-1"
              />

              <div className="flex flex-col items-center justify-center text-white">
                <div className="flex flex-row items-center z-10 text-center sm:text-left">
                  <h1 className="text-[40px] md:text-[60px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                    5K
                  </h1>
                </div>
                <div className="font-medium p-2  border-2 font-Unageo border-white rounded-md mt-4 bg-gradient-to-t from-[#205e3b]   to-[#34925d]  text-white">
                  Detail Map
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-0 items-center flex-col md:flex-row md:justify-end">
              <img
                src="/vector/route-02.svg"
                className="md:max-w-[80%] z-10 w-full"
                alt="rute"
              />

              <div className="flex flex-col items-center justify-center text-white">
                <div className="flex flex-row items-center z-10 text-center sm:text-left">
                  <h1 className="text-[40px] md:text-[60px] font-Anton italic drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] leading-none">
                    2,9K
                  </h1>
                </div>
                <div className="font-medium p-2  border-2 font-Unageo border-white rounded-md mt-4 bg-gradient-to-t from-[#205e3b]   to-[#34925d]  text-white">
                  Detail Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="relative p-[20px] md:p-[100px] bg-cover bg-center"
        id="benefit"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#309c2d] to-green-300/10 z-0" />
        <div className="absolute inset-0 bg-[url('/images/background-hero.jpg')] bg-cover bg-center z-[-1]" />

        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <div className="text-3xl lg:text-5xl font-Anton italic text-center">
            What makes our run special?
          </div>
          <div className="text-3xl mt-3 lg:text-5xl font-Anton italic text-center">
            Find out!
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-[90%] mt-10 mx-auto bg-white p-5 rounded-xl shadow-2xl">
          <Slider {...settings}>
            {dataSlider.map((item, index) => (
              <div key={index}>
                <div className="flex h-[100px] flex-col items-center justify-center text-white">
                  <img src={item.image} alt={item.label} />
                  <div className="mt-2 text-center font-Archivo font-bold text-[#084438]">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
