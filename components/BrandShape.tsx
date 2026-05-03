// Decorative SVG shapes built from the brand palette. No gradients
// each shape uses solid brand colors. Used as accents around the site to
// give the design more personality without relying on imagery.

export function WaveDivider({
  fill = "#F2F6F9",
  className = "",
  flip = false,
}: {
  fill?: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M0,50 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,100 L0,100 Z"
        fill={fill}
      />
    </svg>
  );
}

export function StackedWaves({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,20 C30,40 60,0 90,20 C120,40 150,0 180,20 L200,20"
        stroke="#6EC6FF"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0,38 C30,58 60,18 90,38 C120,58 150,18 180,38 L200,38"
        stroke="#1DD3B0"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Bullseye({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" stroke="#6EC6FF" strokeWidth="2" fill="none" opacity=".6" />
      <circle cx="50" cy="50" r="32" stroke="#6EC6FF" strokeWidth="2" fill="none" opacity=".5" />
      <circle cx="50" cy="50" r="16" stroke="#6EC6FF" strokeWidth="2" fill="none" opacity=".4" />
    </svg>
  );
}
