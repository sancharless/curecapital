import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'alert';
}

interface ToastState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3200);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export const toast = {
  success: (title: string, description?: string) => {
    useToastStore.getState().addToast({ title, description, type: 'success' });
  },
  info: (title: string, description?: string) => {
    useToastStore.getState().addToast({ title, description, type: 'info' });
  },
  alert: (title: string, description?: string) => {
    useToastStore.getState().addToast({ title, description, type: 'alert' });
  },
};
