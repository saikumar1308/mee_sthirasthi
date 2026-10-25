import { useState, useEffect, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

// ─── Singleton event bus ─────────────────────────────────────────
type Listener = (t: Toast) => void;
const listeners: Listener[] = [];
let toastId = 0;

function emit(message: string, type: ToastType) {
  const toast = { id: ++toastId, message, type };
  listeners.forEach((fn) => fn(toast));
}

export const toast = {
  success: (msg: string) => emit(msg, "success"),
  error: (msg: string) => emit(msg, "error"),
  info: (msg: string) => emit(msg, "info"),
};

// ─── Toast Container Component ───────────────────────────────────
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handler: Listener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => remove(t.id), 3500);
    };
    listeners.push(handler);
    return () => {
      const idx = listeners.indexOf(handler);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, [remove]);

  const icons: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    info: "i",
  };
  const colors: Record<ToastType, string> = {
    success: "#10B981",
    error:   "#EF4444",
    info:    "#3B82F6",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#fff",
            border: `1.5px solid ${colors[t.type]}22`,
            borderLeft: `4px solid ${colors[t.type]}`,
            borderRadius: 10,
            padding: "12px 16px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
            minWidth: 280,
            maxWidth: 380,
            pointerEvents: "all",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#1A202C",
            animation: "toastIn 0.3s ease forwards",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: colors[t.type],
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {icons[t.type]}
          </span>
          <span style={{ flex: 1 }}>{t.message}</span>
          <button
            onClick={() => remove(t.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: 18,
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
