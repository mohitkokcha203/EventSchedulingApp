// src/hooks/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrence: { frequency: 'daily', interval: 1, customDays: [] }, // Add customDays to track specific days of the week
  taskDescription: '',
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrence: (recurrence) => set({ recurrence }),
  setTaskDescription: (description) => set({ taskDescription: description }),
}));

export default useStore;
