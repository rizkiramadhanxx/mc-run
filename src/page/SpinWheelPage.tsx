import React, { useState } from 'react';
import SpinWheel from '../components/SpinWheel/SpinWheel';
import useDataStore from '../store/useDataStore';
import DaftarNama from '../components/SpinWheel/DaftarNama';

function SpinWheelPage() {
  const { name, setName } = useDataStore();
  const [items, setItems] = useState(['']);
  const [result, setResult] = useState('');

  const handleSpinEnd = (selectedItem: string) => {
    setResult(`Hasil: ${selectedItem}`);
  };

  return (
    
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">Spin Wheel</h1>
              
        <SpinWheel items={items} onSpinEnd={handleSpinEnd} />
        
        {result && (
          <div className="text-center mt-8 text-xl font-semibold text-blue-600">
            {result}
          </div>
        )}
            
      
      {/* <DaftarNama /> */}
      </div>
 

  );
};

export default SpinWheelPage;