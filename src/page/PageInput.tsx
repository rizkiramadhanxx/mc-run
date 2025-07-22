// PageInput.tsx
import React, { useState } from 'react';
import RunnerForm from '../components/bib/RunnerForm';
import type { Runner } from '../utils/api';

const PageInput: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSuccess = (data: Runner) => {
    setNotification({
      type: 'success',
      message: `Pelari "${data.name}" berhasil didaftarkan dengan ID: ${data.id}`,
    });
    
    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleError = (error: string) => {
    setNotification({
      type: 'error',
      message: `Gagal mendaftarkan pelari: ${error}`,
    });
    
    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistem Pendaftaran Pelari
          </h1>
          <p className="text-gray-600">
            Daftarkan pelari untuk event lari yang akan datang
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`max-w-md mx-auto mb-6 p-4 rounded-lg ${
            notification.type === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex-shrink-0">
                  {notification.type === 'success' ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {notification.message}
                  </p>
                </div>
              </div>
              <button
                onClick={closeNotification}
                className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <RunnerForm onSuccess={handleSuccess} onError={handleError} />

        {/* Instructions */}
        <div className="max-w-md mx-auto mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Petunjuk Penggunaan:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Nama pelari wajib diisi</li>
            <li>• Pilih jenis lari yang sesuai</li>
            <li>• Tanggal scan otomatis terisi dengan waktu sekarang</li>
            <li>• Klik "Daftar Pelari" untuk menyimpan data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageInput;