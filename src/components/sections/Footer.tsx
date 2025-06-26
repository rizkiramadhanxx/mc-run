import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function FooterSection() {
  return (
    <section
      // id="register"
      style={{
        // backgroundImage: `url(/images/footer/footer-backgorund.png)`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        background: "linear-gradient(to bottom, #006937, #34A32C)",
        
      }}
      className="pt-4 pb-4 z-10 flex justify-center md:px-[50px] sm:px-12 px-6 rounded-t-4xl"
    >
      <div
        data-aos="fade-right max-w-[1500px]"
        className="flex w-full flex-col"
      >
        {/* Left Text */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-1.5 py-1.5 w-full">
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            <img src="/images/footer/logo-mc.png" alt="logo-mc" className="w-2/4 md:w-4/5 lg:w-full max-w-[150px]"/>
          </div>
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            <img src="/images/footer/logo-tcr.png" alt="logo-tcr" className="w-2/4 md:w-4/5 lg:w-full max-w-[150px]" />
          </div>
          <div className="col-span-2 md:text-1xl md:col-span-3 flex flex-col justify-center text-white lg:text-2xl">
            <p>
              Contact Us:
            </p>
            <p>
              <FontAwesomeIcon icon={faWhatsapp} size='xl'/> 0822-2099-5243
            </p>
            <p>
              <FontAwesomeIcon icon={faInstagram} size='xl'/> @mutiaracahaya.official &nbsp; @mcrun &nbsp; @tegalcityrun
            </p>
          </div>          
        </div>
      </div>
    </section>
  );
}
