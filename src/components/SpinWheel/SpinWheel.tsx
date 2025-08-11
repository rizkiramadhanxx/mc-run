import React, { useState, useRef } from "react";
import useDataStore from "../../store/useDataStore";

interface SpinWheelProps {
  onSpinEnd: (selectedItem: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinEnd }) => {
  // durasi spin------------------------------------------------------
  const { duration, setDuration } = useDataStore();
  // durasi spin------------------------------------------------------

  // Daftar Nama-------------------------------------------------------
  const { name, setName, removeName } = useDataStore();
  const [newInputName, setNewInputName] = useState("");

  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);

  //audio spin
  const spinAudioRef = useRef<HTMLAudioElement>(null);
  const mainTheme = useRef<HTMLAudioElement>(null);

  const numNames = name.length;
  const segmentAngle = 360 / Math.max(1, numNames);
  const handleAddName = () => {
    const trimmedName = newInputName.trim();
    if (trimmedName && !name.includes(trimmedName)) {
      setName(trimmedName);
      setNewInputName("");
    }
  };

  const handleRemoveName = (index: number) => {
    removeName(index);
  };
  // Daftar Nama-------------------------------------------------------

  const handleMainThemeClick = () => {
    if (mainTheme.current) {
      if (!mainTheme.current.paused) {
        // Kalau lagi main → pause
        mainTheme.current.pause();
      } else {
        // Kalau lagi pause → play dari awal
        mainTheme.current.currentTime = 0;
        mainTheme.current.play();
      }
    }
  };

  const sirineSound = useRef<HTMLAudioElement>(null);

  const handleSirineClick = () => {
    if (sirineSound.current) {
      if (!sirineSound.current.paused) {
        // Sirine sedang aktif → matikan
        sirineSound.current.pause();
        sirineSound.current.currentTime = 0;
      } else {
        // Sirine mati → nyalakan
        sirineSound.current.currentTime = 0;
        sirineSound.current.play();
        mainTheme.current?.pause();
      }
    }
  };

  const handleSettingsClick = () => {
    setModalSettingsOpen(true);
  };

  const handleSpin = () => {
    if (spinning || numNames === 0) return;

    setSpinning(true);

    //memutar audio
    if (spinAudioRef.current) {
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play();
    }

    if (mainTheme.current) {
      mainTheme.current.pause();
      mainTheme.current.currentTime = 0;
    }

    if (sirineSound.current) {
      sirineSound.current.pause();
      sirineSound.current.currentTime = 0;
    }

    const minRotations = 5;
    const maxRotations = 10;
    const randomRotations =
      Math.floor(Math.random() * (maxRotations - minRotations + 1)) +
      minRotations;
    const randomIndex = Math.floor(Math.random() * numNames);
    const offsetAngle =
      segmentAngle * 0.25 + Math.random() * segmentAngle * 0.5;
    const extraRotation =
      360 * randomRotations +
      (360 - (randomIndex * segmentAngle + offsetAngle));

    const maxRotation = 10000;
    const newRotation = totalRotation + extraRotation;
    if (newRotation > maxRotation) {
      setTotalRotation(newRotation % 360);
    } else {
      setTotalRotation(newRotation);
    }

    // setTotalRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);

      //menghentikan audio
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
        spinAudioRef.current.currentTime = 0;
      }

      const finaleAngle = (totalRotation + extraRotation) % 360;
      // const normalizedAngle = (360 - finaleAngle + segmentAngle / 2) % 360;
      // const finalIndex = Math.floor(normalizedAngle / segmentAngle) % numNames;
      const normalizedAngle = (360 - finaleAngle) % 360;
      const finalIndex = Math.floor(normalizedAngle / segmentAngle) % numNames;

      onSpinEnd(name[finalIndex]);
    }, duration * 1000);
  };

  // Generate colors for segments
  // const getSegmentColor = (index: number) => {
  //   const hue = (index * (360 / numNames)) % 360;
  //   return `hsl(${hue}, 70%, 50%)`;
  // };

  // Generate colors for segments
  const getSegmentColor = (index: number) => {
    return index % 2 === 0 ? "#004D29" : "#FFFFFF";
  };

  // Generate colors for text
  const getTextColor = (index: number) => {
    return index % 2 === 0 ? "#FFFFFF" : "#004D29";
  };

  return (
    <div className="items-center justify-items-center margin-auto h-[100vh] w-full">
      <audio
        ref={spinAudioRef}
        src="audio/spin-wheel.mp3"
        loop
        preload="auto"
      />
      <audio ref={mainTheme} src="audio/main-theme.mp3" loop preload="auto" />
      <audio ref={sirineSound} src="audio/sirine.mp3" preload="auto" />

      <div className="absolute grid grid-rows-2 md:w-[50%] lg:w-[33%] xl:w-[35%] h-auto md:top-[-25%] lg:top-[-35%] xl:top-[-45%] md:left-[-5%] lg:left-[5%] justify-items-center items-end">
        <div className="flex items-center justify-center md:w-[70%] lg:w-[90%] w-full">
          <img
            onClick={handleSirineClick}
            className="h-auto max-x-[20%] max-w-[20%]"
            src="images/spinwheel/logo-mc.png"
            alt=""
          />
          <img
            className="h-auto ml-2 max-w-[20%]"
            src="images/spinwheel/logo-anniversary.png"
            alt=""
          />
        </div>
        <div className="flex justify-center w-full">
          <img
            onClick={handleMainThemeClick}
            className="md:w-[75%] lg:w-[100%] xl:w-[90%]"
            src="images/spinwheel/left-image.png"
            alt=""
          />
        </div>
      </div>

      <div className="absolute w-[30%] h-auto md:top-[20%] lg:top-[15%] md:right-35 lg:right-[25%] md:w-[40%] lg:w-[35%] xl:w-[30%]">
        <div className="mt-[-8%] absolute top-[100%] left-1/2 -translate-x-1/2 w-full">
          <img
            src="images/spinwheel/kaki-spinwheel.png"
            className="w-[100%] h-auto z-0"
          ></img>
        </div>

        <div
          className={`relative w-full h-full rounded-full border-8 border-gray-300 transition-transform ease-out overflow-hidden z-10`}
          style={{
            transform: `rotate(${totalRotation}deg)`,
            transitionDuration: `${duration}s`,
            backgroundImage: `url(/images/spinwheel/roda-spinwheel.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {numNames > 1 ? (
              name.map((item, index) => {
                const startAngle =
                  (index * segmentAngle - 90) * (Math.PI / 180);
                const endAngle =
                  ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

                const x1 = 100 + 90 * Math.cos(startAngle);
                const y1 = 100 + 90 * Math.sin(startAngle);
                const x2 = 100 + 90 * Math.cos(endAngle);
                const y2 = 100 + 90 * Math.sin(endAngle);

                const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                const pathData = [
                  `M 100 100`,
                  `L ${x1} ${y1}`,
                  `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `Z`,
                ].join(" ");

                const textAngle = index * segmentAngle + segmentAngle / 2 - 90;
                const textRadius = 60;
                const textX =
                  100 + textRadius * Math.cos((textAngle * Math.PI) / 180);
                const textY =
                  100 + textRadius * Math.sin((textAngle * Math.PI) / 180);

                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={getSegmentColor(index)}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill={getTextColor(index)}
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                    >
                      {item}
                    </text>
                  </g>
                );
              })
            ) : (
              <text
                x="100"
                y="100"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fill="white"
                className="bg-blue-500"
              >
                Masukkan nama minimal 2
              </text>
            )}
          </svg>
        </div>
        {/* <img className='absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] z-10' src="images/spinwheel/kaki-spinwheel.png" alt="" /> */}

        {/* Center Circle */}
        {numNames > 1 && (
          <div
            onClick={handleSpin}
            className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-auto z-20"
          >
            <img src="images/spinwheel/pointer.png" alt="" />
          </div>
        )}

        {/* Pointer */}
        {/* <div className="absolute top-6 justify-start left-1/2 -translate-x-1/2 w-[6%] h-auto
          border-t-[30px] border-b-red-500 z-20
          border-l-[15px] border-l-transparent
          border-r-[15px] border-r-transparent
          ">
        </div> */}

        {/* {
          showNotification && !spinning && (
            <div className="fixed top-10 left-0 w-full h-2/4 flex items-center justify-center z-50 text-red-500 text-3xl">
              Selamat! Kepada: {selectedItem}
            </div>
          )
        } */}

        {/* <div className='mt-[-7%]'>
          <img 
            src='images/spinwheel/kaki-spinwheel.png'
            className="absolute left-1/2 -translate-x-1/2 px-6 py-3 disabled:bg-gray-400 z-0
            md:text-1xl md:text-sm md:py-1 md:px-3 lg:text-2xl lg:py-2 lg:px-4 w-[100%] h-auto"
          >
          </img>
        </div> */}

        {/* <div className='mt-4'>
          <button
            onClick={handleSpin}
            className="absolute left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 z-20
            md:text-1xl md:text-sm md:py-1 md:px-3 lg:text-2xl lg:py-2 lg:px-4"
            disabled={spinning || name.length <= 1}
          >
            {spinning ? 'Memutar...' : 'Putar Roda!'}
          </button>
        </div> */}
      </div>
      <div className="span-1">
        <img
          className="absolute top-20 right-30 w-[20%] md:w-[24%] lg:w-[25%] md:right-10 lg:right-20 z-50"
          src="images/spinwheel/logo-spinwheel.png"
          alt=""
        />
        <img
          onClick={handleSettingsClick}
          className="absolute bottom-0 right-20 w-[28%] md:w-[25%] md:right-2"
          src="images/spinwheel/model.png"
          alt=""
        />
      </div>

      {modalSettingsOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-1/2 bg-white p-4 rounded">
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <div className="flex items-center mb-4">
              <label className="mr-2">Waktu Putar (detik):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="px-2 py-1 border rounded"
              />
            </div>

            {/* Daftar Nama */}
            <h3 className="text-lg font-semibold mb-4">Daftar Nama</h3>
            <div className="overflow-x-auto">
              <div className="flex gap-2 justify-start w-1">
                {name.map((item, index) => (
                  // Pastikan untuk memberikan key unik untuk setiap elemen dalam list
                  <div key={index} className="flex flex-row items-center">
                    <p className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {item}
                    </p>
                    <p
                      className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                      onClick={() => handleRemoveName(index)}
                    >
                      x
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-x-2">
              <input
                type="text"
                value={newInputName}
                onChange={(e) => setNewInputName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddName();
                  }
                }}
                className="px-3 py-1 border rounded text-center"
                placeholder="Masukkan Nama"
              />
              <button
                onClick={handleAddName}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Tambah
              </button>
            </div>
            {/* Datar Nama */}

            <button
              onClick={() => setModalSettingsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
