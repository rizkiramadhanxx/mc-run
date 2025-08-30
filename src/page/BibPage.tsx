import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Runner } from "../utils/api";
import { getLastScannerRunner } from "../utils/api";
import { useBibPositionStore } from "../store/useBibPositionStore";

function BibPage() {
  const {
    x,
    y,
    scale,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    increaseScale,
    decreaseScale,
  } = useBibPositionStore();

  const { data, isLoading, isError, error } = useQuery<Runner, Error>({
    queryKey: ["runnersData"],
    queryFn: async () => {
      const { data: runners, error: apiError } = await getLastScannerRunner();
      if (apiError || !runners) {
        throw new Error(apiError ? "Failed to fetch data" : "No data found");
      }
      return runners;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 1000,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case "w":
          moveUp();
          break;
        case "s":
          moveDown();
          break;
        case "a":
          moveLeft();
          break;
        case "d":
          moveRight();
          break;
        case "z":
          decreaseScale();
          break;
        case "x":
          increaseScale();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveUp, moveDown, moveLeft, moveRight, increaseScale, decreaseScale]);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">Memuat data pelari...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold text-red-600">
          Error: {error?.message}
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">
          Tidak ada data pelari yang ditemukan.
        </p>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
        style={{ zIndex: -1, transform: "scale(1.2)" }}
      >
        <source src="/video/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <section className="relative w-full h-full p-4">
        <div
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {/* one line */}
          <div className="text-4xl text-center sm:text-7xl md:text-8xl font-semibold text-white my-2 font-Anton tracking-wider whitespace-nowrap">
            {data.name}
          </div>
          <div className="text-4xl text-center sm:text-4xl md:text-8xl font-semibold text-white mt-2 font-Poppins whitespace-nowrap">
            {data.bib}
          </div>
        </div>
      </section>
    </main>
  );
}

export default BibPage;
