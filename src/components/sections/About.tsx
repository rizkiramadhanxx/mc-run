import {
  PiLightbulbFilamentDuotone,
  PiSlideshowDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import social from "/social.svg";

export default function AboutSection() {
  const communityHighlights = [
    {
      icon: <PiUsersDuotone className="text-sky-500" />,
      highlight: "150K+",
      description: "anggota komunitas",
    },
    {
      icon: <PiSlideshowDuotone className="text-green-500" />,
      highlight: "Ajang Nyeleb",
      description: "& obrolan seru tiap hari",
    },
    {
      icon: <PiLightbulbFilamentDuotone className="text-yellow-500" />,
      highlight: "Koneksi untuk menambah relasi",
      description: "lorem ipsum",
    },
  ];
  return (
    <section
      id="about"
      className="pt-12 z-10 flex justify-center md:px-[150px] sm:px-12 px-6"
    >
      <div
        data-aos="fade-right"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-[#006937]">
            Our mission
          </h2>
          <p className="sm:text-lg mb-4">
            <b className="font-bold underline-offset-4 text-[#006937]">
              IMPHNEN
            </b>{" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi sint
            nobis maiores, sequi commodi quos nostrum blanditiis eaque adipisci
            quo! <b className="text-[#006937]">Lorem, ipsum.</b>, Lorem, ipsum.{" "}
            <b className="text-[#006937]">Lorem, ipsum.</b> Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Quaerat, id!{" "}
            <b className="text-[#006937]">2023</b> , Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem ad quasi tempore ex, facere
            dolor animi? A natus harum sapiente!
          </p>

          <div className="space-y-3 text-base">
            {communityHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-xl">{highlight.icon}</span>
                <span>
                  <strong>{highlight.highlight}</strong> {highlight.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-left" className="flex justify-center">
          <img
            src={social}
            className="-rotate-y-180 hidden md:block"
            alt="preview"
            width={500}
            height={500}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
