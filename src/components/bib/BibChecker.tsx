// BibCheckerForm.tsx
import React, { useState, useEffect, useRef } from "react";
import { updateLastScannedByBib } from "../../utils/api";
import type { Runner } from "../../utils/api";

interface BibCheckerFormProps {
  onSuccess: (data: Runner) => void;
  onError: (error: string) => void;
  isTwo: boolean;
}

const BibCheckerForm: React.FC<BibCheckerFormProps> = ({
  onSuccess,
  onError,
}) => {
  const [bib, setBib] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoScanEnabled, setIsAutoScanEnabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-submit untuk barcode scanner
  useEffect(() => {
    if (isAutoScanEnabled && bib.trim() && !isLoading) {
      // Clear timeout sebelumnya jika ada
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }

      // Set timeout untuk auto-submit setelah 100ms (waktu yang cukup untuk scanner menyelesaikan input)
      scanTimeoutRef.current = setTimeout(() => {
        handleSubmit();
      }, 100);
    }

    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [bib, isAutoScanEnabled, isLoading]);

  // Focus input saat component mount dan setelah scan selesai
  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!bib.trim()) {
      onError("Nomor bib harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateLastScannedByBib(bib.trim());

      if (result.error || !result.data) {
        onError("Bib tidak ditemukan atau terjadi kesalahan");
        setBib("");
        return;
      }

      onSuccess(result.data.data);
      setBib(""); // Reset form
    } catch (error) {
      onError("Terjadi kesalahan saat melakukan scan");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBib(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Jika auto-scan disabled, allow manual Enter
    if (!isAutoScanEnabled && e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Auto-scan Toggle */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="auto-scan"
              className="text-sm font-medium text-gray-700"
            >
              Auto-scan Mode
            </label>
            <p className="text-xs text-gray-500">
              Otomatis submit setelah input selesai
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsAutoScanEnabled(!isAutoScanEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAutoScanEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAutoScanEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="bib"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nomor Bib
          </label>
          <input
            ref={inputRef}
            type="text"
            id="bib"
            value={bib}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Scan barcode atau ketik nomor bib"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
            autoComplete="off"
          />
        </div>

        {/* Manual submit button - hanya tampil jika auto-scan disabled */}
        {!isAutoScanEnabled && (
          <button
            type="submit"
            disabled={isLoading || !bib.trim()}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
              isLoading || !bib.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Scanning...
              </div>
            ) : (
              "Scan Bib"
            )}
          </button>
        )}

        {/* Loading indicator untuk auto-scan */}
        {isAutoScanEnabled && isLoading && (
          <div className="flex items-center justify-center py-2">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm text-blue-600">Scanning...</span>
          </div>
        )}
      </form>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Aksi Cepat:</h4>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setBib("")}
            className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
            disabled={isLoading}
          >
            Focus Input
          </button>
        </div>

        {/* Scanner Info */}
        <div className="mt-3 p-2 bg-green-50 rounded text-xs">
          <p className="text-green-700">
            <strong>Scanner Mode:</strong>{" "}
            {isAutoScanEnabled ? "Auto-submit aktif" : "Manual mode"}
          </p>
          <p className="text-green-600">
            {isAutoScanEnabled
              ? "Scan barcode akan otomatis submit setelah 100ms"
              : "Tekan Enter atau klik tombol untuk submit"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BibCheckerForm;
