import { useEffect } from "react";

export default function Toast({ message, type = "info", onDismiss, duration = 4000 }) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const styles = {
    info: "bg-stone-800 border-stone-600 text-stone-200",
    warning: "bg-amber-950/60 border-amber-700 text-amber-200",
    error: "bg-red-950/60 border-red-700 text-red-200",
  };

  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 max-w-sm border rounded-lg px-4 py-3 shadow-lg flex items-start gap-3 ${styles[type]}`}
    >
      <p className="text-sm flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="text-current opacity-60 hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}