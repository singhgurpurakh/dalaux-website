import type { ReactNode } from "react";
export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      className={`arrow ${down ? "arrow-down" : ""}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand">
      <img
        src="/brand/dalaux-logo.png"
        width="900"
        height="258"
        alt=""
        decoding="async"
      />
    </span>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
