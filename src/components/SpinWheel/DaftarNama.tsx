import React, { useState } from "react";
import useDataStore from "../../store/useDataStore";

export default function DaftarNama() {

  const { name, setName, removeName } = useDataStore();

  const [newInputName, setNewInputName] = useState('');

  const handleAddName = () => {
    setName(newInputName);
    setNewInputName('');
  };

  const handleRemoveName = (index: number) => {
    removeName(index);
  };

  return (
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
  )
}

