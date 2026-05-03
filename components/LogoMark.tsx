import Image from "next/image";

/**
 * The 82Rentals logo as a single graphic mark. The source PNG has a
 * transparent background, so it can sit on any surface without any blending.
 */
export default function LogoMark({
  size = 64,
  className = "",
  alt = "82Rentals",
}: {
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-label={alt}
      role="img"
    >
      <Image
        src="/logo.png"
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}
