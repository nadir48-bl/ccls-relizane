import Image from "next/image";
import { site } from "@/lib/content";

type BrandMarkProps = {
  size?: "sm" | "md";
  priority?: boolean;
  className?: string;
};

export default function BrandMark({
  size = "md",
  priority = false,
  className = "",
}: BrandMarkProps) {
  const tile = size === "md" ? "size-12" : "size-11";

  return (
    <span className={`relative grid ${tile} shrink-0 place-items-center ${className}`}>
      <Image
        src="/logo.png"
        alt={site.logoAlt}
        width={96}
        height={96}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
