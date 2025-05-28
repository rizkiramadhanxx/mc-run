import Navbar from "./components/layout/Navbar";
import AboutSection from "./components/sections/About";
import HeroSection from "./components/sections/Hero";
import RegisterSection from "./components/sections/Register";
import RoutesSection from "./components/sections/Route";
import useElementPosition from "./hooks/useElementPosition";

function App() {
  const [refHero, { bottom: bottomHero }] =
    useElementPosition<HTMLDivElement>();

  const [refAbout, { bottom: bottomAbout }] =
    useElementPosition<HTMLDivElement>();

  const [refRegister, { top: topRegister }] =
    useElementPosition<HTMLDivElement>();
  return (
    <>
      <main>
        <Navbar />
        <div className="relative overflow-hidden ">
          <img
            className="absolute h-[380px] z-[5] -left-48"
            style={{ top: `${(bottomHero - 200).toFixed()}px` }}
            src="/vector/left-hero.svg"
          />
          <img
            className="absolute h-[380px] z-[5] -right-48"
            style={{ top: `${(bottomHero - 180).toFixed()}px` }}
            src="/vector/right-hero.svg"
          />
          <img
            className="absolute h-[600px] z-[5] -left-48"
            style={{ top: `${(bottomAbout - 250).toFixed()}px` }}
            src="/vector/left-our-mission.svg"
          />
          <img
            className="absolute max-w-[1000px]  -right-96"
            style={{ top: `${(bottomAbout - 180).toFixed()}px` }}
            src="/vector/right-our-mission.svg"
          />

          <img
            className="absolute h-[380px] z-[5] -left-48"
            style={{ top: `${(topRegister - 200).toFixed()}px` }}
            src="/vector/left-hero.svg"
          />
          <img
            className="absolute h-[380px] z-[5] -right-48"
            style={{ top: `${(topRegister - 180).toFixed()}px` }}
            src="/vector/right-hero.svg"
          />
          <div ref={refHero}>
            <HeroSection />
          </div>
          {/* <img
            className="absolute max-w-[1000px] z-[5] -bottom-[300px] -left-48"
            src="/vector/left-our-mission.svg"
          /> */}
          <div ref={refAbout}>
            <AboutSection />
          </div>
          <RoutesSection />
          <div ref={refRegister}>
            <RegisterSection />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
