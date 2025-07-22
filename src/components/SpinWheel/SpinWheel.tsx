import React, { useState, useEffect } from 'react';
import useDataStore from '../../store/useDataStore';

interface SpinWheelProps {
  items: string[];
  onSpinEnd: (selectedItem: string) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ items, onSpinEnd }) => {

  // durasi spin------------------------------------------------------
  const {duration, setDuration} = useDataStore();

  // durasi spin------------------------------------------------------
  
  // Daftar Nama-------------------------------------------------------
  const { name, setName, removeName } = useDataStore();
  const [newInputName, setNewInputName] = useState('');
  const handleAddName = () => {
    setName(newInputName);
    setNewInputName('');
  };

  const handleRemoveName = (index: number) => {
    removeName(index);
  };
  // Daftar Nama-------------------------------------------------------


  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [modalSettingsOpen, setModalSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setModalSettingsOpen(true);
  };

  const numItems = items.length;
  const segmentAngle = 360 / numItems;

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    const minRotations = 5;
    const maxRotations = 10;
    const randomRotations = Math.floor(Math.random() * (maxRotations - minRotations + 1)) + minRotations;

    const randomIndex = Math.floor(Math.random() * numItems);
    const targetAngle = 360 * randomRotations + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      const finalIndex = (numItems - 1 - randomIndex + numItems) % numItems;
      setSelectedItem(items[finalIndex]);
      onSpinEnd(items[finalIndex]);
    }, duration * 1000);
  };

  useEffect(() => {
    setSelectedItem('');
  }, [items]);

  // Generate colors for segments
  const getSegmentColor = (index: number) => {
    const hue = (index * (360 / numItems)) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="grid grid-cols-2 items-center justify-items-center margin-auto gap-10 bg-gray-100 min-h-screen">
      <div className="relative w-96 h-96 mx-auto">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0
          border-l-[15px] border-l-transparent
          border-r-[15px] border-r-transparent
          border-b-[30px] border-b-red-500 z-20"></div>

        {/* Wheel Container */}
        <div onClick={handleSettingsClick} className='hover:cursor-pointer'>
          setting
        </div>
        <div
          className={`relative w-full h-full rounded-full border-8 border-gray-300 transition-transform duration-[10000ms] ease-out overflow-hidden`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {items.map((item, index) => {
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
            })}
          </svg>
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 z-10"></div>

        <button
          onClick={handleSpin}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 z-10"
          disabled={spinning}
        >
          {spinning ? 'Memutar...' : 'Putar Roda!'}
        </button>

        {selectedItem && !spinning && (
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-2xl font-bold text-green-700 text-center">
            Selamat! Anda mendapatkan: {selectedItem}
          </div>
        )}
      </div>

      <div className="flex flex-col mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4">Daftar Nama</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {name.map((item, index) => (
            // Pastikan untuk memberikan key unik untuk setiap elemen dalam list
            <p key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              {item} <span onClick={() => handleRemoveName(index)} className="text-red-500 hover:text-red-600 hover:cursor-pointer">x</span>
            </p>
          ))}
        </div>
        <div className="mt-4 space-x-2">
          <input
            type="text"
            value={newInputName}
            onChange={(e) => setNewInputName(e.target.value)}
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
      </div>

      {modalSettingsOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Setting Waktu</h2>
          <div className="flex items-center mb-4">
            <label className="mr-2">Waktu Putar (detik):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="px-2 py-1 border rounded"
            />
          </div>
          <button
            onClick={() => setModalSettingsOpen(false)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </div>}

    </div>

    
  );
};

export default SpinWheel;