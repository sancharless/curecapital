import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div 
      className="fixed z-50 pointer-events-none flex flex-col gap-2 p-4 sm:p-6
        bottom-20 sm:bottom-6 sm:right-6 left-0 right-0 sm:left-auto items-center sm:items-end"
      style={{
        paddingBottom: 'max(84px, calc(env(safe-area-inset-bottom) + 68px))'
      }}
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl
              bg-[#0D1E36]/95 backdrop-blur-xl border border-white/10 shadow-financial-elevated
              text-xs text-text-primary max-w-sm w-auto"
          >
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-positive shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-brand-cyan shrink-0" />}
            {t.type === 'alert' && <AlertTriangle className="w-4 h-4 text-alert shrink-0" />}

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-text-primary truncate">{t.title}</div>
              {t.description && (
                <div className="text-[11px] text-text-secondary truncate mt-0.5">{t.description}</div>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-text-tertiary hover:text-text-primary p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
