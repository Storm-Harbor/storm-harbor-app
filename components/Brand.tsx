import Image from "next/image";
import {Link} from "@/i18n/navigation";

type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({compact = false, className = ""}: BrandProps) {
  return (
    <span className={`group inline-flex items-center gap-3 ${className}`}>
      <Link href="/" aria-label="Storm Harbor home">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.png`}
          alt=""
          width={42}
          height={42}
          priority
          className="size-9 transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-10"
        />
      </Link>
      <span className="flex flex-col">
        <Link href="/" className="text-[15px] font-bold leading-none tracking-[-0.03em] text-white sm:text-base">
          Storm Harbor
        </Link>
        {!compact && (
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            by{" "}
            <a
              href="https://ioterax.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-blue-300"
            >
              iot.EraX
            </a>
          </span>
        )}
      </span>
    </span>
  );
}
