import { create } from "zustand";

interface useDataStoreType {
  name: string[];
  setName: (name: string) => void;
  removeName: (index: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
}

const useDataStore = create<useDataStoreType>((set) => ({
  name: [],
  setName: (newName: string) => set((state) => ({ name: [...state.name, newName] })),
  removeName: (index: number) => set((state) => ({ name: state.name.filter((_, i) => i !== index) })),
  duration: 5,
  setDuration: (duration: number) => set({ duration }),
}));


export default useDataStore;