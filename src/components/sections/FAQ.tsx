import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FAQSection() {
  const [active, setActive] = useState(0);

  const faqs = [
    {
      question: "Event lari ini diadakan di mana?",
      answer:
        "Event akan diadakan di Taman Kota Senayan, Jakarta pada tanggal 25 Mei 2025.",
    },
    {
      question: "Apakah peserta pemula boleh ikut?",
      answer:
        "Tentu! Event ini terbuka untuk semua level pelari, dari pemula hingga profesional.",
    },
    {
      question: "Jarak tempuh yang tersedia apa saja?",
      answer: "Ada tiga kategori: 5K, 10K, dan Half Marathon (21K).",
    },
    {
      question: "Bagaimana cara mendaftar?",
      answer:
        "Kamu bisa daftar langsung melalui website resmi kami di www.eventlari.com.",
    },
    {
      question: "Apakah peserta akan mendapatkan medali?",
      answer:
        "Ya! Semua finisher akan mendapatkan medali eksklusif dari event ini.",
    },
    {
      question: "Apakah tersedia race pack?",
      answer:
        "Iya, race pack berisi jersey, BIB number, dan merchandise menarik akan dibagikan sebelum event.",
    },
    {
      question: "Boleh bawa teman atau keluarga untuk nonton?",
      answer:
        "Boleh banget! Area event terbuka untuk umum dan ada banyak hiburan serta food stall seru.",
    },
  ];

  const toggle = (index: number) => {
    setActive(index);
  };

  return (
    <section
      id="about"
      className="pt-12 pb-12 z-10 flex flex-col bg-white border-t-2 justify-center md:px-[150px] sm:px-12 px-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Tanya-Tanya Dulu Yuk
      </h2>

      <div className="text-left space-y-4">
        {faqs.map((faq, idx) => (
          <div
            data-aos="fade-up"
            data-aos-delay={idx * 50}
            data-aos-offset="20"
            key={idx}
            className="cursor-pointer last:border-0 border-b border-slate-200 pb-4"
            onClick={() => toggle(idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold sm:text-lg text-gray-800">
                {faq.question}
              </h3>
              <span className="text-[#006937] text-2xl">
                {active === idx ? "-" : "+"}
              </span>
            </div>

            <AnimatePresence>
              {active === idx && (
                <motion.p
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 mt-2 overflow-hidden"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
