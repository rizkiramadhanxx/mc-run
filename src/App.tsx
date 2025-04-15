import Navbar from "./components/layout/Navbar";
import AboutSection from "./components/sections/About";
import FAQSection from "./components/sections/FAQ";
import HeroSection from "./components/sections/Hero";
import RegisterSection from "./components/sections/Register";
import RoutesSection from "./components/sections/Route";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <RegisterSection />
        <RoutesSection />
        <FAQSection />
      </main>
    </>
  );
}

export default App;
