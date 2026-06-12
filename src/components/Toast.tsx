import { useEffect } from "react";
import { CheckCircle2, X, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/lib/store";

export function ToastContainer() {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toast({
  notification,
  onClose
}: {
  notification: any;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, notification.duration || 5000);

    return () => clearTimeout(timer);
  }, [notification.duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
  };

  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 rounded-[12px] border p-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-[400px] ${bgColors[notification.type || 'info']}`}
    >
      {icons[notification.type || 'info']}
      <div className="flex-1">
        <p className="text-sm font-600">{notification.title}</p>
        {notification.description && (
          <p className="mt-1 text-xs text-muted-foreground">{notification.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}