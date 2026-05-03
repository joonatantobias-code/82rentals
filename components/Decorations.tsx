// Custom SVG decorations used as background ornaments. Built from scratch
// in the brand palette so the design feels considered, not stock. Each
// piece is purely decorative — set aria-hidden in callers if needed.

type Props = {
  className?: string;
  /** Stroke / fill color */
  color?: string;
  /** Opacity 0..1 */
  opacity?: number;
};

/**
 * Concentric rings — sonar / radar feel. Drops nicely behind a hero or CTA.
 */
export function SonarRings({
  className = "",
  color = "#6EC6FF",
  opacity = 0.45,
}: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {[40, 80, 120, 160, 200].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke={color}
          strokeWidth={i === 0 ? 1.5 : 1}
          strokeDasharray={i % 2 ? "2 6" : undefined}
          fill="none"
        />
      ))}
      <circle cx="200" cy="200" r="6" fill={color} />
    </svg>
  );
}

/**
 * Topographic wave lines — feels like a navigational chart.
 */
export function TopoWaves({
  className = "",
  color = "#6EC6FF",
  opacity = 0.35,
}: Props) {
  const lines = Array.from({ length: 7 }).map((_, i) => i * 18 + 30);
  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {lines.map((y, i) => (
        <path
          key={y}
          d={`M0,${y} C100,${y - 20} 200,${y + 20} 300,${y - 10} S 400,${y + 12} 400,${y}`}
          stroke={color}
          strokeWidth={i === 3 ? 2 : 1}
          fill="none"
          strokeLinecap="round"
          opacity={0.4 + i * 0.08}
        />
      ))}
    </svg>
  );
}

/**
 * Compass / cardinal mark — sits well in a corner.
 */
export function CompassMark({
  className = "",
  color = "#6EC6FF",
  opacity = 0.6,
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="50" r="34" stroke={color} strokeWidth="1" strokeDasharray="2 4" fill="none" />
      {/* N S E W marks */}
      <path d="M50 6 L50 18 M50 82 L50 94 M6 50 L18 50 M82 50 L94 50" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* needle */}
      <path d="M50 22 L56 50 L50 78 L44 50 Z" fill={color} opacity={0.9} />
      <circle cx="50" cy="50" r="3" fill="white" />
    </svg>
  );
}

/**
 * Floating geometric primitives for ambient decoration.
 */
export function FloatingShapes({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
    >
      {/* Big ring */}
      <circle cx="120" cy="140" r="60" stroke="#6EC6FF" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Small dotted ring */}
      <circle cx="450" cy="120" r="34" stroke="#1DD3B0" strokeWidth="1.5" fill="none" strokeDasharray="3 5" opacity="0.6" />
      {/* Triangle */}
      <path d="M460,440 L520,540 L400,540 Z" stroke="#6EC6FF" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Cross */}
      <path d="M150,420 L150,460 M130,440 L170,440" stroke="#6EC6FF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Diamond */}
      <path d="M310,80 L340,110 L310,140 L280,110 Z" stroke="#1DD3B0" strokeWidth="1.5" fill="none" opacity="0.55" />
      {/* Dot cluster */}
      <g opacity="0.55">
        <circle cx="80" cy="320" r="2" fill="#6EC6FF" />
        <circle cx="100" cy="330" r="2" fill="#6EC6FF" />
        <circle cx="120" cy="320" r="2" fill="#6EC6FF" />
        <circle cx="100" cy="310" r="2" fill="#6EC6FF" />
      </g>
      <g opacity="0.5">
        <circle cx="540" cy="300" r="3" fill="#1DD3B0" />
        <circle cx="555" cy="320" r="2" fill="#1DD3B0" />
        <circle cx="525" cy="310" r="2" fill="#1DD3B0" />
      </g>
    </svg>
  );
}

/**
 * Bold "82" numeral as outlined typographic decoration.
 */
export function NumberMark({
  className = "",
  color = "#6EC6FF",
  opacity = 0.18,
}: Props) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <text
        x="50%"
        y="78%"
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontSize="180"
        fontWeight="900"
        stroke={color}
        strokeWidth="2"
        fill="none"
        letterSpacing="-6"
      >
        82
      </text>
    </svg>
  );
}

/**
 * Vertical flowing wave used as a side ornament.
 */
export function VerticalFlow({
  className = "",
  color = "#6EC6FF",
  opacity = 0.4,
}: Props) {
  return (
    <svg
      viewBox="0 0 80 600"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {[15, 35, 55].map((x, i) => (
        <path
          key={x}
          d={`M${x},0 C${x + 18},80 ${x - 18},160 ${x},240 S ${x + 18},400 ${x},480 S ${x - 18},560 ${x},600`}
          stroke={color}
          strokeWidth={i === 1 ? 2 : 1}
          fill="none"
          strokeLinecap="round"
          opacity={0.5 + i * 0.15}
        />
      ))}
    </svg>
  );
}

/**
 * Burst of triangles, plus signs and diamonds — no concentric rings.
 * Designed for hero corners where the user did not want circles.
 */
export function GeoBurst({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
    >
      {/* Big triangle outline */}
      <path
        d="M180,80 L260,220 L100,220 Z"
        stroke="#6EC6FF"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
      />
      {/* Filled small triangle */}
      <path d="M340,330 L400,420 L280,420 Z" fill="#6EC6FF" opacity="0.18" />
      {/* Plus signs */}
      <g stroke="#6EC6FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
        <path d="M70,360 L70,400 M50,380 L90,380" />
        <path d="M460,160 L460,200 M440,180 L480,180" />
        <path d="M520,460 L520,490 M505,475 L535,475" />
        <path d="M250,500 L250,530 M235,515 L265,515" />
      </g>
      {/* Diamond outlines */}
      <g stroke="#1DD3B0" strokeWidth="2" fill="none" opacity="0.65">
        <path d="M420,90 L450,120 L420,150 L390,120 Z" />
        <path d="M150,470 L172,492 L150,514 L128,492 Z" />
      </g>
      {/* Inverted triangle (filled) */}
      <path d="M520,260 L560,260 L540,300 Z" fill="#1DD3B0" opacity="0.5" />
      {/* Cross sign */}
      <g stroke="#6EC6FF" strokeWidth="2" strokeLinecap="round" opacity="0.55">
        <path d="M340,540 L370,540 M355,525 L355,555" transform="rotate(45 355 540)" />
      </g>
      {/* Dot clusters */}
      <g fill="#6EC6FF" opacity="0.7">
        <circle cx="80" cy="120" r="3" />
        <circle cx="100" cy="140" r="2.5" />
        <circle cx="60" cy="150" r="2" />
      </g>
      <g fill="#1DD3B0" opacity="0.6">
        <circle cx="520" cy="350" r="3" />
        <circle cx="540" cy="375" r="2" />
        <circle cx="555" cy="345" r="2.5" />
      </g>
      {/* Single big plus accent */}
      <g
        stroke="#6EC6FF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      >
        <path d="M300,30 L300,80 M275,55 L325,55" />
      </g>
    </svg>
  );
}
