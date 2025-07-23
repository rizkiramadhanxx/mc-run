import React, { useState } from "react";
import { createRunner } from "../../utils/api";
import type { RunnerRequest, Runner } from "../../utils/api";

interface RunnerFormProps {
  onSuccess?: (data: Runner) => void;
  onError?: (error: string) => void;
}

const RunnerForm: React.FC<RunnerFormProps> = ({ onSuccess, onError }) => {

  // Fungsi untuk mendapatkan waktu saat ini dalam WIB (GMT+7)
  // const getCurrentWIBDateTime = (): string => {
  //   const now = new Date();
  //   // Mengonversi ke WIB (GMT+7)
  //   const wibTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
  //   return wibTime.toISOString().slice(0, 16);
  // };

  // Fungsi untuk mengonversi datetime-local ke ISO string dengan WIB
  // const convertToWIBISOString = (datetimeLocal: string): string => {
  //   if (!datetimeLocal) return new Date().toISOString();
    
  //   // Parsing datetime-local sebagai WIB
  //   const localDate = new Date(datetimeLocal);
  //   // Mengurangi 7 jam untuk mengonversi dari WIB ke UTC
  //   const utcDate = new Date(localDate.getTime() - (7 * 60 * 60 * 1000));
  //   return utcDate.toISOString();
  // };

  const [formData, setFormData] = useState<RunnerRequest>({
    bib: "",
    name: "",
    run_type: "",
    // last_scanned: "",
  });
  
  const [isLoading, setIsLoading] = useState(false); 

  const runTypes = [
    'UMUM',
    'KIDS & FAMILY'
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const apiData: RunnerRequest = {
        bib: formData.bib,
        name: formData.name.trim(),
        run_type: formData.run_type,
        // last_scanned: formData.last_scanned,
      };

      const response = await createRunner(apiData);

      setFormData({
        bib: "",
        name: "",
        // last_scanned: "",
        run_type: "",
      });

      if (onSuccess && response.data && response.data.length > 0) {
        onSuccess(response.data[0]);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create runner";
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Daftar Pelari
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nomor bib" className="block text-sm font-medium text-gray-700 mb-1">
            Nomer Bib*
          </label>
          <input
            type="text"
            id="bib"
            name="bib"
            value={formData.bib}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan Nomor Bib"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pelari *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan nama pelari"
          />
        </div>

        <div>
          <label htmlFor="run_type" className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Lari *
          </label>
          <select
            id="run_type"
            name="run_type"
            value={formData.run_type}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih jenis lari</option>
            {runTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="hidden">
          <label htmlFor="last_scanned" className="block text-sm font-medium text-gray-700 mb-1">
            Terakhir Discan (Opsional)
          </label>
          <input
            type="datetime-local"
            id="last_scanned"
            name="last_scanned"
            value={formData.last_scanned}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Otomatis terisi dengan waktu sekarang
          </p>
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Menyimpan...' : 'Daftar Pelari'}
        </button>
      </form>
    </div>
  );
}
  
export default RunnerForm;