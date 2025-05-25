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
        <HeroSection />
        <div className="relative overflow-hidden ">
          <img
            className="absolute h-[600px] z-[5] top-[400px] -left-48"
            src="/vector/left-our-mission.svg"
          />
          <img
            className="absolute  max-w-[1000px] top-[350px] -right-96"
            src="/vector/right-our-mission.svg"
          />
          <img
            className="absolute max-w-[1000px] z-[5] -bottom-[300px] -left-48"
            src="/vector/left-our-mission.svg"
          />
          <AboutSection />
          <RoutesSection />
          <RegisterSection />
        </div>
      </main>
    </>
  );
}

export default App;
