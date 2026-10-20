import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, icon = 'check_circle' }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#2a2933]/95 backdrop-blur-md text-[#e5e0ee] text-xs font-semibold shadow-2xl border border-[#4a4455]/40 flex items-center gap-2 pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
      <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">{icon}</span>
      <span>{message}</span>
    </div>
  );
};
