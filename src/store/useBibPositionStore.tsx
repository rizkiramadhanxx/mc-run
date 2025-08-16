import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BibPositionState {
  x: number;
  y: number;
  scale: number;
  setPosition: (x: number, y: number) => void;
  setScale: (scale: number) => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  increaseScale: () => void;
  decreaseScale: () => void;
}

export const useBibPositionStore = create<BibPositionState>()(
  persist(
    (set) => ({
      x: 50, // posisi default di tengah (50%)
      y: 50, // posisi default di tengah (50%)
      scale: 1, // ukuran default

      setPosition: (x: number, y: number) => set({ x, y }),
      setScale: (scale: number) => set({ scale }),

      moveUp: () => set((state) => ({ y: Math.max(0, state.y - 5) })),
      moveDown: () => set((state) => ({ y: Math.min(100, state.y + 5) })),
      moveLeft: () => set((state) => ({ x: Math.max(0, state.x - 5) })),
      moveRight: () => set((state) => ({ x: Math.min(100, state.x + 5) })),

      increaseScale: () =>
        set((state) => ({ scale: Math.min(3, state.scale + 0.1) })),
      decreaseScale: () =>
        set((state) => ({ scale: Math.max(0.5, state.scale - 0.1) })),
    }),
    {
      name: "bib-position-storage",
    }
  )
);
