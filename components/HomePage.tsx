import {useTranslations} from "next-intl";
import {Brand} from "./Brand";
import {GraphBackground} from "./GraphBackground";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CodeIcon,
  FileCheckIcon,
  FingerprintIcon,
  GaugeIcon,
  GithubIcon,
  LayersIcon,
  NetworkIcon,
  RouteIcon,
  ShieldCheckIcon,
} from "./Icons";
import {ProductDashboard} from "./ProductDashboard";

const githubUrl = "https://github.com/Storm-Harbor/storm-harbor-control-plane";
const docsUrl = "https://storm-harbor.github.io/storm-harbor-control-plane/";
const licenseUrl = "https://www.apache.org/licenses/LICENSE-2.0";

function SectionHeading({eyebrow, title, body, align = "left"}: {eyebrow: string; title: string; body?: string; align?: "left" | "center"}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title mt-5">{title}</h2>
      {body && <p className="section-body mt-5">{body}</p>}
    </div>
  );
}

export function HomePage() {
  const t = useTranslations();

  const capabilityCards = [
    {number: "01", icon: NetworkIcon, title: t("capabilities.discoverTitle"), body: t("capabilities.discoverBody"), tag: "FSoT"},
    {number: "02", icon: GaugeIcon, title: t("capabilities.proveTitle"), body: t("capabilities.proveBody"), tag: "RTO / RPO"},
    {number: "03", icon: RouteIcon, title: t("capabilities.orchestrateTitle"), body: t("capabilities.orchestrateBody"), tag: "DAG + gates"},
  ];
  const principles = [
    {icon: LayersIcon, title: t("principles.federatedTitle"), body: t("principles.federatedBody")},
    {icon: FingerprintIcon, title: t("principles.identityTitle"), body: t("principles.identityBody")},
    {icon: ShieldCheckIcon, title: t("principles.closedTitle"), body: t("principles.closedBody")},
    {icon: FileCheckIcon, title: t("principles.evidenceTitle"), body: t("principles.evidenceBody")},
  ];
  const audiences = [
    ["01", t("audience.platformTitle"), t("audience.platformBody")],
    ["02", t("audience.sreTitle"), t("audience.sreBody")],
    ["03", t("audience.riskTitle"), t("audience.riskBody")],
    ["04", t("audience.leadersTitle"), t("audience.leadersBody")],
  ];

  return (
    <main className="overflow-hidden bg-[#111820] text-slate-300">
      <section className="hero-section relative flex min-h-[900px] items-center overflow-hidden border-b border-white/10 pt-[72px] lg:min-h-[860px]">
        <div className="pointer-events-none absolute inset-0 opacity-70"><GraphBackground /></div>
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="hero-glow pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[.93fr_1.07fr] lg:px-12 lg:py-24">
          <div className="max-w-[680px]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-sm border border-blue-400/20 bg-blue-400/[0.07] px-3 py-2">
              <span className="status-pulse size-1.5 rounded-full bg-blue-400" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300">{t("hero.eyebrow")}</span>
              <span className="h-3 w-px bg-blue-300/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{t("hero.status")}</span>
            </div>

            <h1 className="max-w-[12ch] text-[clamp(3.6rem,7.3vw,7.2rem)] font-semibold leading-[.9] tracking-[-0.075em] text-white">
              {t("hero.title")} <span className="text-gradient-blue">{t("hero.titleAccent")}</span>
            </h1>
            <p className="mt-8 max-w-[620px] text-lg leading-relaxed text-slate-400 sm:text-xl">
              {t("hero.body")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#product" className="button button-primary h-13 px-6">
                {t("hero.primaryCta")}<ArrowRightIcon className="size-4" />
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="button button-ghost h-13 px-6">
                <GithubIcon className="size-4" />{t("hero.secondaryCta")}
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><CheckIcon className="size-3.5 text-blue-400" />Apache 2.0</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="size-3.5 text-blue-400" />GCP-first</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="size-3.5 text-blue-400" />{t("hero.noLockIn")}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[690px] lg:mx-0">
            <div className="absolute -inset-8 bg-blue-500/10 blur-3xl" />
            <ProductDashboard />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#151e28]" aria-label={t("integrations.label")}>
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-[1.1fr_2.9fr] lg:grid-cols-[.8fr_4.2fr]">
          <div className="flex items-center border-b border-white/10 px-5 py-5 sm:border-b-0 sm:border-r sm:px-8 lg:px-12">
            <span className="font-mono text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-slate-500">{t("integrations.label")}</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-5 sm:divide-y-0">
            {["GitHub", "Terraform", "Google Cloud", "Kubernetes", "FluxCD"].map((name) => (
              <div key={name} className="flex min-h-16 items-center justify-center px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 sm:min-h-20">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="section-shell border-b border-white/10 bg-[#f4f6f8] text-[#1d232a]">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="section-eyebrow text-blue-700">{t("problem.eyebrow")}</div>
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.5rem,5vw,5.2rem)] font-semibold leading-[.96] tracking-[-0.06em] text-[#151a20]">
              {t("problem.title")}
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:pb-1">
            <p className="max-w-3xl text-xl leading-relaxed text-slate-600 sm:text-2xl sm:leading-relaxed">{t("problem.body")}</p>
            <blockquote className="mt-10 border-l-4 border-blue-600 pl-6 text-xl font-semibold leading-snug tracking-[-0.025em] text-slate-900 sm:text-2xl">
              {t("problem.question")}
            </blockquote>
          </div>
        </div>
      </section>

      <section id="capabilities" className="section-shell border-b border-white/10 bg-[#111820]">
        <SectionHeading eyebrow={t("capabilities.eyebrow")} title={t("capabilities.title")} body={t("capabilities.body")} />
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 lg:grid-cols-3">
          {capabilityCards.map(({number, icon: Icon, title, body, tag}) => (
            <article key={number} className="capability-card group relative bg-[#151e28] p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-600">/{number}</span>
                <Icon className="size-7 text-blue-400 transition-transform duration-300 group-hover:-translate-y-1" />
              </div>
              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.035em] text-white">{title}</h3>
              <p className="mt-4 min-h-24 text-sm leading-7 text-slate-400">{body}</p>
              <div className="mt-8 border-t border-white/10 pt-4 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300">{tag}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-b border-white/10 bg-[#151e28]">
        <div className="grid items-center gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={t("readiness.eyebrow")} title={t("readiness.title")} body={t("readiness.body")} />
            <div className="mt-8 space-y-4">
              {[t("readiness.pointOne"), t("readiness.pointTwo"), t("readiness.pointThree")].map((point) => (
                <div key={point} className="flex gap-3 border-t border-white/10 pt-4 text-sm text-slate-300">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-blue-400" />{point}
                </div>
              ))}
            </div>
          </div>
          <ProductDashboard />
        </div>
      </section>

      <section id="architecture" className="section-shell relative border-b border-white/10 bg-[#f4f6f8] text-[#1d232a]">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <SectionHeading eyebrow={t("architecture.eyebrow")} title={t("architecture.title")} body={t("architecture.body")} align="center" />

          <div className="architecture-flow mt-16 grid gap-4 lg:grid-cols-[1fr_40px_1.2fr_40px_1fr_40px_1fr] lg:items-stretch lg:gap-0">
            {[
              {index: "01", title: t("architecture.sourcesTitle"), body: t("architecture.sourcesBody"), meta: "GitHub · TF · GCP · K8s"},
              {index: "02", title: t("architecture.controlTitle"), body: t("architecture.controlBody"), meta: "inventory · graph · policy"},
              {index: "03", title: t("architecture.recoverTitle"), body: t("architecture.recoverBody"), meta: "DAG · gates · cleanup"},
              {index: "04", title: t("architecture.proofTitle"), body: t("architecture.proofBody"), meta: "SHA-256 · KMS · WORM"},
            ].map((step, index) => (
              <div className="contents" key={step.index}>
                <article className={`architecture-card ${index === 1 ? "architecture-card-primary" : ""}`}>
                  <span className="font-mono text-[9px] opacity-50">/{step.index}</span>
                  <h3 className="mt-12 text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-70">{step.body}</p>
                  <div className="mt-8 border-t border-current/10 pt-3 font-mono text-[8px] uppercase tracking-wider opacity-60">{step.meta}</div>
                </article>
                {index < 3 && (
                  <div className="flex items-center justify-center text-blue-600 lg:rotate-0">
                    <ArrowRightIcon className="size-5 rotate-90 lg:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 rounded-sm border border-blue-600/20 bg-blue-600/[0.06] px-5 py-4 text-center text-xs font-semibold text-blue-800">
            <ShieldCheckIcon className="size-5 shrink-0" />{t("architecture.outside")}
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-white/10 bg-[#111820]">
        <SectionHeading eyebrow={t("principles.eyebrow")} title={t("principles.title")} body={t("principles.body")} />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({icon: Icon, title, body}) => (
            <article key={title} className="border-t border-blue-400/50 pt-6">
              <Icon className="size-6 text-blue-400" />
              <h3 className="mt-8 text-lg font-semibold tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-b border-white/10 bg-[#151e28]">
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <SectionHeading eyebrow={t("audience.eyebrow")} title={t("audience.title")} body={t("audience.body")} />
          <div>
            {audiences.map(([number, title, body]) => (
              <article key={number} className="group grid gap-4 border-t border-white/10 py-7 sm:grid-cols-[48px_.7fr_1.3fr] sm:items-start">
                <span className="font-mono text-[9px] text-blue-400">/{number}</span>
                <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
                <p className="text-sm leading-6 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="open-source" className="relative overflow-hidden border-b border-white/10 bg-blue-600 text-white">
        <div className="open-source-lines pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:py-32">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">{t("openSource.eyebrow")}</div>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold leading-[.94] tracking-[-0.065em]">{t("openSource.title")}</h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-2xl text-lg leading-8 text-blue-50">{t("openSource.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={githubUrl} target="_blank" rel="noreferrer" className="button button-light h-12 px-5">
                <GithubIcon className="size-4" />{t("openSource.githubCta")}<ArrowUpRightIcon className="size-4" />
              </a>
              <a href={licenseUrl} target="_blank" rel="noreferrer" className="button border border-white/25 bg-transparent h-12 px-5 text-white hover:bg-white/10">
                <CodeIcon className="size-4" />Apache 2.0
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0d131a]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto mb-8 flex size-14 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10">
            <ShieldCheckIcon className="size-7 text-blue-400" />
          </div>
          <h2 className="mx-auto max-w-[15ch] text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.98] tracking-[-0.06em] text-white">{t("finalCta.title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">{t("finalCta.body")}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={docsUrl} target="_blank" rel="noreferrer" className="button button-primary h-13 px-6">{t("finalCta.docs")}<ArrowUpRightIcon className="size-4" /></a>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="button button-ghost h-13 px-6"><GithubIcon className="size-4" />{t("finalCta.github")}</a>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-blue-600 bg-[#0a0f14]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Brand />
              <p className="mt-5 max-w-md text-xs leading-6 text-slate-500">{t("footer.tagline")}</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
              <a href={docsUrl} target="_blank" rel="noreferrer" className="hover:text-white">{t("nav.docs")}</a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
              <a href={licenseUrl} target="_blank" rel="noreferrer" className="hover:text-white">Apache 2.0</a>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-wider text-slate-600 sm:flex-row sm:justify-between">
            <span>© 2026 Storm Harbor · by iot.Erax</span>
            <span>{t("footer.openSource")}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
