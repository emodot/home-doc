import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black bg-opacity-40 z-[60]"
        />
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-[16px] p-6 w-full max-w-[400px] pointer-events-auto"
          >
            <p className="font-publica_sans_m text-18 text-brand_secondary mb-2">{title}</p>
            <p className="font-publica_sans_l text-14 text-border_stroke_2 mb-6">{message}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] border border-neutral_stroke_1 text-black disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="font-publica_sans_r text-14 px-4 py-2 rounded-[8px] bg-error text-white disabled:opacity-50"
              >
                {loading ? "Deleting..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
);

export default ConfirmModal;
