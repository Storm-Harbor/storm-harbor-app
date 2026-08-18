import Image from "next/image";
import {Link} from "@/i18n/navigation";

type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({compact = false, className = ""}: BrandProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Storm Harbor — by iot.Erax"
    >
      <Image
        src="/logo.svg"
        alt=""
        width={42}
        height={42}
        priority
        className="size-9 transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-10"
      />
      <span className="flex flex-col">
        <span className="text-[15px] font-bold leading-none tracking-[-0.03em] text-white sm:text-base">
          Storm Harbor
        </span>
        {!compact && (
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            by iot.Erax
          </span>
        )}
      </span>
    </Link>
  );
}
