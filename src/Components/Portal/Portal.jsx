import { createPortal } from "react-dom";
import "./Portal.css";

export default function Portal({ children }) {
  const portalRoot = document.getElementById("modal");

  if (!portalRoot) return null;

  return createPortal(
    <div className="portal-backdrop">
      {children}
    </div>,
    portalRoot
  );
}
