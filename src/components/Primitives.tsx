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
      <svg
        width="28"
        height="30"
        viewBox="0 0 28 30"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3h9c9 0 13 4 13 12S21 27 12 27H3V3Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path d="M9 8v14h4c5 0 7-2 7-7s-2-7-7-7H9Z" fill="currentColor" />
      </svg>
      <span>
        dalaux<span className="brand-period">.</span>
      </span>
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
