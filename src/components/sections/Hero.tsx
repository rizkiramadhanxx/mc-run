import { FcCalendar } from "react-icons/fc";
import { Pattern } from "../common/Pattern";
import { useCountdownDay } from "../../hooks/useCountdownDay";

export default function HeroSection() {
  const { day, hours, minute, second } = useCountdownDay(
    new Date("2025-05-01T00:00:00Z")
  );
  return (
    <section
      id="home"
      // bg image
      className="relative bg-[linear-gradient(to_bottom_right,_rgba(0,0,0,0.4),_rgba(0,0,0,1)),url('https://images.unsplash.com/photo-1613937574892-25f441264a09?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
    >
      <Pattern />
      <header className="grid grid-cols-1 xl:grid-cols-2 pt-[150px] xl:pt-0 xl:mx-[150px] pb-5 items-center md:min-h-svh  mx-auto  gap-y-4 gap-x-2">
        <div className="md:flex flex-1 hidden  h-full flex-col justify-center items-start">
          <img
            data-aos="zoom-in"
            src="https://run.alfamart.co.id/static/images/logo_alfamartrun.png"
            alt="logo"
            className=" md:max-w-[500px]"
          />
        </div>
        <div className="flex h-full flex-col justify-center items-center gap-4 ">
          <div data-aos="fade-up" className="flex flex-col  gap-3 mt-4 sm:mt-8">
            <div className="flex text-sm gap-2 justify-start  rounded-full font-medium">
              <div className="flex p-2 md:p-4  w-[65px] md:w-[80px] text-white rounded-md bg-[#006937] flex-col items-center justify-center">
                <div className="border-2  border-white p-2 rounded-md text-2xl">
                  {day > 0 ? day : 0}
                </div>
                <div className="mt-2">Hari</div>
              </div>
              <div className="flex p-2 md:p-4  w-[65px] md:w-[80px] text-white rounded-md bg-[#006937] flex-col items-center justify-center">
                <div className="border-2 border-white p-2 rounded-md text-2xl">
                  {hours > 0 ? hours : 0}
                </div>
                <div className="mt-2">Jam</div>
              </div>
              <div className="flex p-2 md:p-4  w-[65px] md:w-[80px] text-white rounded-md bg-[#006937] flex-col items-center justify-center">
                <div className="border-2 border-white p-2 rounded-md text-2xl">
                  {minute > 0 ? minute : 0}
                </div>
                <div className="mt-2">Menit</div>
              </div>
              <div className="flex p-2 md:p-4  w-[65px] md:w-[80px] text-white rounded-md bg-[#006937] flex-col items-center justify-center">
                <div className="border-2 border-white p-2 rounded-md text-2xl">
                  {second > 0 ? second : 0}
                </div>
                <div className="mt-2">Detik</div>
              </div>
            </div>
            <div className="px-4 py-1 text-sm border-2 border-dashed bg-sky-100 border-sky-200 text-[#006937] rounded-full font-medium animate-pulse">
              💤 Mari Running biar Sehat 💤
            </div>
            <h1 className="text-2xl lg:text-4xl lg:text-nowrap font-bold text-white">
              Selamat Datang di <br />
              <span
                style={{
                  // white shadow
                  textShadow:
                    "-0.8px -0.8px 0 #fff, 0.8px -0.8px 0 #fff, -0.8px 0.8px 0 #fff, 0.8px 1px 0 #fff",
                }}
                className="text-[#006937] font-extrabold  text-4xl lg:text-7xl"
              >
                MC RUN
              </span>
            </h1>
            <div className="max-w-xl text-left rounded-2xl font-semibold text-gray-100 text-sm">
              <div className="flex items-center gap-2  text-md">
                <FcCalendar size={20} /> : Minggu, 19 Oktober 2025
              </div>
              <div className="flex mt-1 items-center gap-2 text-md">
                Start : MC Mejasem Pemalang
              </div>
              <div className="flex mt-1 items-center gap-2 text-md">
                Finish : MC Mejasem Purwokerto
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1  gap-4 pt-4 text-sm w-full">
              <a
                href="#join&follow"
                className="flex justify-center items-center whitespace-nowrap bg-[#006937] hover:bg-[#055830] text-white font-semibold rounded-lg px-6 py-3 transition"
              >
                Daftar Sekarang
              </a>
              <a
                href="#about"
                className="justify-center flex items-center whitespace-nowrap border-1  bg-white  text-[#006937] hover:text-[#055830] font-semibold rounded-lg px-6 py-3 transition"
              >
                Official Instagram
              </a>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
