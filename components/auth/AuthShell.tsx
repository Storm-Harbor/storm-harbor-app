import type {ReactNode} from "react";
import {Brand} from "@/components/Brand";
import {CheckIcon, ShieldCheckIcon} from "@/components/Icons";
import {LanguageSwitcher} from "@/components/LanguageSwitcher";

type AuthShellProps = {
  body: string;
  children: ReactNode;
  eyebrow: string;
  points: string[];
  title: string;
};

export function AuthShell({body, children, eyebrow, points, title}: AuthShellProps) {
  return (
    <main className="auth-shell min-h-dvh bg-[#0d141c] text-slate-200">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.72fr)]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[#111b26] p-12 lg:flex lg:flex-col">
          <div className="auth-grid pointer-events-none absolute inset-0" />
          <div className="auth-orb pointer-events-none absolute -left-24 top-1/3 size-[480px] rounded-full" />
          <div className="relative"><Brand /></div>

          <div className="relative my-auto max-w-2xl py-20">
            <div className="section-eyebrow">{eyebrow}</div>
            <h1 className="mt-6 max-w-[11ch] text-[clamp(3.4rem,6vw,6.6rem)] font-semibold leading-[.92] tracking-[-0.07em] text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">{body}</p>

            <div className="mt-12 grid max-w-xl gap-4">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3 border-t border-white/10 pt-4 text-sm text-slate-300">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-blue-300">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
            <ShieldCheckIcon className="size-4 text-blue-400" />
            api-auth · Storm Harbor
          </div>
        </section>

        <section className="flex min-h-dvh items-center justify-center bg-[#f4f6f8] px-5 py-16 text-[#18202a] sm:px-8 lg:px-12">
          <div className="w-full max-w-[460px]">
            <div className="mb-10 inline-flex rounded-sm bg-[#111820] p-3 lg:hidden"><Brand /></div>
            {children}
          </div>
        </section>
      </div>
      <LanguageSwitcher />
    </main>
  );
}
