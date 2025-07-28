import { useState } from 'react';
import SpinWheel from '../components/SpinWheel/SpinWheel';
//import useDataStore from '../store/useDataStore';
//import DaftarNama from '../components/SpinWheel/DaftarNama';

function SpinWheelPage() {
  const [result, setResult] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleSpinEnd = (selectedItem: string) => {
    setResult(`Hasil: ${selectedItem}`);
    setSelectedItem(selectedItem);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
      <div style={{ backgroundImage: `url(images/spinwheel/background.png)`, backgroundSize: "cover", backgroundPosition: "center"}}>    
        <SpinWheel onSpinEnd={handleSpinEnd} />
        
        {/* {result && (
          <div className="text-center mt-8 text-xl font-semibold text-blue-600">
            {result}
          </div>
        )} */}
            
      
      {/* <DaftarNama /> */}

      {/* POPUP Notification */}
      {!result ? null : (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-opacity duration-300 ${
            showNotification
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-transform duration-300 max-w-md w-full scale-100">
            <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Selamat!</h2>
            <p className="text-lg text-gray-800 mb-6">
              <span className="font-semibold">{selectedItem}</span>
            </p>
            <button
              onClick={() => setShowNotification(false)}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      </div>
 

  );
};

export default SpinWheelPage;