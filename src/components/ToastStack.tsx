// src/components/ToastStack.tsx
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useNotificationStore } from "../stores/notificationStore";

export default function ToastStack() {
  const { list, remove } = useNotificationStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[70%] max-w-[660px] space-y-2 z-[9999]">
      <AnimatePresence>
        {list.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-[#222] text-white rounded shadow-lg px-4 py-3 flex items-start gap-3"
          >
            <div className="flex-1 text-sm">
              <p className="font-semibold mb-0.5">{t.title}</p>
              {t.message && (
                <p className="text-xs text-gray-300">{t.message}</p>
              )}

              {t.actionLabel && (
                <button
                  onClick={() => {
                    t.onAction?.();
                    remove(t.id);
                  }}
                  className="mt-1 text-[11px] text-blue-400 hover:underline"
                >
                  {t.actionLabel}
                </button>
              )}
            </div>

            <button onClick={() => remove(t.id)}>
              <FaTimes className="text-gray-400 hover:text-white" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
