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
    <span
      className={`relative grid ${tile} shrink-0 place-items-center overflow-hidden rounded-full bg-bg ring-1 ring-black/5 ${className}`}
    >
      <Image
        src="/logo.png"
        alt={site.logoAlt}
        width={96}
        height={96}
        priority={priority}
        className="h-[86%] w-[86%] object-contain"
      />
    </span>
  );
}
