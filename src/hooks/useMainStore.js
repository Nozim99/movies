import { create } from "zustand";

const useMainStore = create((set) => ({
  page: 1,
  searchName: "",
  increment: () => set((state) => ({ page: state.page + 1 })),
  setPage: (value) => set((state) => ({ page: value })),
  searchNameHandler: (inputValue) => set(() => {
    return { searchName: inputValue }
  }),
}));

export default useMainStore;