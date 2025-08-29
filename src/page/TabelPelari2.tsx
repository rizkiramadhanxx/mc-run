import React, { useState } from "react";
import TabelData from "../components/bib/TabelDataPelari";

const TabelPelari2: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSuccess = (success: string) => {
    setNotification({
      type: "success",
      message: success,
    });

    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleError = (error: string) => {
    setNotification({
      type: "error",
      message: `Gagal melakukan scan bib versi 2: ${error}`,
    });

    // Auto hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="relative">
      {notification && (
        <>
          {/* Blur Overlay */}

          <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-auto p-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex-shrink-0">
                  {notification.type === "success" ? (
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={closeNotification}
                className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      <TabelData
        onSuccess={handleSuccess}
        onError={handleError}
        isVersionTwo={true}
      />
    </div>
  );
};

export default TabelPelari2;
