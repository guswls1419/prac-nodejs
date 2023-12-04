import { create } from 'zustand';

interface Toast {
  id: number;
  message: string;
}

interface ToastContainerState {
  toasts: Toast[];
  showToast: (message: string) => void;
  hideToast: (id: number) => void;
}

const useToast = create<ToastContainerState>((set) => ({
  toasts: [],

  showToast: (message) => {
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message }],
    }));
  },

  hideToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToast;
