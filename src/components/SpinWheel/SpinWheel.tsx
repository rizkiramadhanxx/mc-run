import React, { useState } from 'react';
import useDataStore from '../../store/useDataStore';

interface SpinWheelProps {
  onSpinEnd: (selectedItem: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinEnd }) => {

  // durasi spin------------------------------------------------------
  const {duration, setDuration} = useDataStore();
  // durasi spin------------------------------------------------------
  
  // Daftar Nama-------------------------------------------------------
  const { name, setName, removeName } = useDataStore();
  const [newInputName, setNewInputName] = useState('');

  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);

  const numNames = name.length;
  const segmentAngle = 360 / Math.max(1, numNames);
  const handleAddName = () => {
    const trimmedName = newInputName.trim();
    if (trimmedName && !name.includes(trimmedName)) {
      setName(trimmedName);
      setNewInputName('');
    }
  };

  const handleRemoveName = (index: number) => {
    removeName(index);
  };
  // Daftar Nama-------------------------------------------------------


  const handleSettingsClick = () => {
    setModalSettingsOpen(true);
  };

  
  const handleSpin = () => {
    if (spinning || numNames === 0) return;

    setSpinning(true);
    const minRotations = 5;
    const maxRotations = 10;
    const randomRotations = Math.floor(Math.random() * (maxRotations - minRotations + 1)) + minRotations;
    const randomIndex = Math.floor(Math.random() * numNames);
    const extraRotation = 360 * randomRotations + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    const maxRotation = 10000;
    const newRotation = totalRotation + extraRotation;
    if (newRotation > maxRotation) {
      setTotalRotation(newRotation % 360);
    } else (
      setTotalRotation(newRotation)
    )
    // setTotalRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);

      const finaleAngle = (totalRotation + extraRotation) % 360;
      // const normalizedAngle = (360 - finaleAngle + segmentAngle / 2) % 360;
      // const finalIndex = Math.floor(normalizedAngle / segmentAngle) % numNames;
      const normalizedAngle = (360 - finaleAngle) % 360;
      const finalIndex = Math.floor(normalizedAngle / segmentAngle) % numNames;
      
      onSpinEnd(name[finalIndex]);

    }, duration * 1000);
  };

  // Generate colors for segments
  const getSegmentColor = (index: number) => {
    const hue = (index * (360 / numNames)) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="grid grid-cols-3 items-center justify-items-center margin-auto"
    >
      <div className='colspan-1 justify-items-center' style={{ maxHeight: '100vh' }}>
        <img className='absolute top-15 left-55 w-[8%]' src="images/footer/logo-mc.png" alt="" />
        <img className='absolute top-15 left-80 w-[6%]' src="images/spinwheel/logo-anniversary.png" alt="" />
        <img className='absolute top-10 left-0 w-[45%]' src="images/spinwheel/left-image.png" alt=""/>
      </div>
      
      <div className="absolute w-110 h-110 top-20 right-85">
        
        {/* Wheel Container */}
        <div onClick={handleSettingsClick} className='hover:cursor-pointer text-1xl font-bold text-[#006937] p-0.5 bg-white rounded-full absolute top-0 left-0'>
          Setting
        </div>
        <div
          className={`relative w-full h-full rounded-full border-8 border-gray-300 transition-transform ease-out overflow-hidden`}
          style={{ 
            transform: `rotate(${totalRotation}deg)`,
            transitionDuration: `${duration}s`
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {numNames > 0 ? name.map((item, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              
              const x1 = 100 + 90 * Math.cos(startAngle);
              const y1 = 100 + 90 * Math.sin(startAngle);
              const x2 = 100 + 90 * Math.cos(endAngle);
              const y2 = 100 + 90 * Math.sin(endAngle);
              
              const largeArcFlag = segmentAngle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              const textAngle = (index * segmentAngle + segmentAngle / 2 - 90);
              const textRadius = 60;
              const textX = 100 + textRadius * Math.cos(textAngle * Math.PI / 180);
              const textY = 100 + textRadius * Math.sin(textAngle * Math.PI / 180);

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
                    fill="white"
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
            }) : (
              <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fontSize="14" fill="#999">
                Tidak ada nama
              </text>
            )
            }
          </svg>
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 z-10"></div>

        {/* Pointer */}
        <div className="absolute top-6 justify-start left-1/2 -translate-x-1/2 w-0 h-0
          border-t-[30px] border-b-red-500 z-20
          border-l-[15px] border-l-transparent
          border-r-[15px] border-r-transparent
          ">
        </div>

        {/* {
          showNotification && !spinning && (
            <div className="fixed top-10 left-0 w-full h-2/4 flex items-center justify-center z-50 text-red-500 text-3xl">
              Selamat! Kepada: {selectedItem}
            </div>
          )
        } */}


        <div className='mt-4'>
          <button
            onClick={handleSpin}
            className="absolute left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 z-10"
            disabled={spinning || name.length === 0}
          >
            {spinning ? 'Memutar...' : 'Putar Roda!'}
          </button>
        </div>
        
      </div>
      <div className='span-1'>
        <img className='absolute top-20 right-30 w-[20%]' src="images/spinwheel/logo-spinwheel.png" alt="" />
        <img className='absolute bottom-0 right-20 w-[25%]' src="images/spinwheel/model.png" alt="" />
      </div>


      {modalSettingsOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
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
          <div className='overflow-x-auto'>
            <div className="flex gap-2 justify-start w-1">
              {name.map((item, index) => (
                // Pastikan untuk memberikan key unik untuk setiap elemen dalam list
                <div className='flex flex-row justify-items-center'>
                  <p key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {item} 
                  </p>
                  <p className="text-red-500 hover:text-red-600 hover:cursor-pointer" onClick={() => handleRemoveName(index)}>
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
                if (e.key === 'Enter') {
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
      </div>}

    </div>

    
  );
};

export default SpinWheel;