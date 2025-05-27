import Navbar from "./components/layout/Navbar";
import AboutSection from "./components/sections/About";
import HeroSection from "./components/sections/Hero";
import RegisterSection from "./components/sections/Register";
import RoutesSection from "./components/sections/Route";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <div className="relative overflow-hidden ">
          <img
            className="absolute h-[380px] z-[5] top-[500px] -left-10"
            src="/vector/left-hero.svg"
          />
          <img
            className="absolute h-[380px] z-[5] top-[500px] -right-48"
            src="/vector/right-hero.svg"
          />
          <img
            className="absolute h-[600px] z-[5] top-[1100px] -left-48"
            src="/vector/left-our-mission.svg"
          />
          <img
            className="absolute  max-w-[1000px] top-[1250px] -right-96"
            src="/vector/right-our-mission.svg"
          />
          <HeroSection />
          {/* <img
            className="absolute max-w-[1000px] z-[5] -bottom-[300px] -left-48"
            src="/vector/left-our-mission.svg"
          /> */}
          <AboutSection />
          <RoutesSection />
          <RegisterSection />
        </div>
      </main>
    </>
  );
}

export default App;
