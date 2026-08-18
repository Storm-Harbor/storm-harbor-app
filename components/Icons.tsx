import type {SVGProps} from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRightIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M5 12h14m-5-5 5 5-5 5" /></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m5 12 4 4L19 6" /></svg>;
}

export function ChevronDownIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m7 10 5 5 5-5" /></svg>;
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.73 2.65 1.23 3.3.94.1-.73.39-1.23.72-1.51-2.5-.29-5.14-1.25-5.14-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15A10.76 10.76 0 0 1 12 6.11c.96 0 1.91.13 2.81.38 2.15-1.46 3.1-1.15 3.1-1.15.62 1.55.23 2.7.12 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.16 5.55.41.35.77 1.04.77 2.1v3.13c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function NetworkIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="m8.3 6.2 7.2.5M7.4 8.2l3.3 7.5m6-6.5-3.5 6.6"/></svg>;
}

export function ShieldCheckIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 3 20 6v5c0 5.1-3.4 8.5-8 10-4.6-1.5-8-4.9-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
}

export function RouteIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h2"/><path d="m8 6-2-2-2 2m2-2v8"/></svg>;
}

export function FingerprintIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M12 11a2 2 0 0 1 2 2c0 3.5-.7 6.1-1.8 8M8.1 20c.7-1.8 1-4.1 1-7a3 3 0 0 1 6 0c0 2.6-.3 4.8-.9 6.7M5.1 18c.5-1.7.7-3.3.7-5a6.2 6.2 0 0 1 12.4 0c0 1.5-.1 3-.4 4.4M4.3 9.2A8.8 8.8 0 0 1 20.6 10"/></svg>;
}

export function FileCheckIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h4m-8 6 1.5 1.5L15 12"/></svg>;
}

export function LayersIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>;
}

export function CodeIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12"/></svg>;
}

export function GaugeIcon(props: IconProps) {
  return <svg {...baseProps} {...props}><path d="M4.2 18a9 9 0 1 1 15.6 0"/><path d="m12 13 4-4m-8 9h8"/></svg>;
}
