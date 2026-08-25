import {ShieldCheckIcon} from "@/components/Icons";

type ConsoleSectionProps = {body: string; eyebrow: string; title: string};

export function ConsoleSection({body, eyebrow, title}: ConsoleSectionProps) {
  return (
    <div>
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-700">{eyebrow}</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{body}</p>
      <div className="console-card mt-7 flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-blue-50 text-blue-700"><ShieldCheckIcon className="size-7" /></span>
        <h2 className="mt-5 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{body}</p>
      </div>
    </div>
  );
}
