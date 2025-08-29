import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Runner } from "../utils/api";
import { getLastScannerRunner } from "../utils/api";
import backgroundBib from "../assets/img/background-bib.jpg";
import { useBibPositionStore2 } from "../store/useBibPositionStore2";

function BibPage2() {
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
  } = useBibPositionStore2();

  const { data, isLoading, isError, error } = useQuery<Runner, Error>({
    queryKey: ["runnersData2"],
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
    <main
      className="bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${backgroundBib})`,
        minHeight: "100vh",
        height: "100vh",
      }}
    >
      <section className="relative w-full h-full p-4">
        <div
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left text-white mt-2 font-Poppins">
            {data.name}
          </p>
          <h1 className="text-6xl  sm:text-7xl md:text-8xl font-extrabold text-left text-white my-2 font-Anton tracking-wider">
            {data.bib}
          </h1>
        </div>
      </section>
    </main>
  );
}

export default BibPage2;
