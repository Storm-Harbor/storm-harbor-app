"use client";

import {useTranslations} from "next-intl";
import {CheckIcon, FileCheckIcon, GaugeIcon, NetworkIcon, RouteIcon} from "@/components/Icons";
import {Link} from "@/i18n/navigation";

export function ConsoleOverview() {
  const t = useTranslations("console");
  const metrics = [
    {label: t("metrics.readiness"), value: "84", unit: "/100", note: t("metrics.blocked"), icon: GaugeIcon, tone: "amber"},
    {label: t("metrics.services"), value: "12", unit: "", note: t("metrics.covered"), icon: NetworkIcon, tone: "blue"},
    {label: t("metrics.lastExercise"), value: "12", unit: "d", note: t("metrics.withinCadence"), icon: RouteIcon, tone: "green"},
    {label: t("metrics.evidence"), value: "47", unit: "", note: t("metrics.integrityChecked"), icon: FileCheckIcon, tone: "violet"},
  ];
  const services = [
    {name: "checkout-api", environment: "production", score: 84, status: t("status.blocked"), tone: "amber", rto: "60m", rpo: "15m"},
    {name: "identity-service", environment: "production", score: 96, status: t("status.ready"), tone: "green", rto: "30m", rpo: "5m"},
    {name: "billing-api", environment: "production", score: 91, status: t("status.ready"), tone: "green", rto: "45m", rpo: "10m"},
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-700">
            <span className="size-1.5 rounded-full bg-blue-600" />{t("overview.eyebrow")}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">{t("overview.title")}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t("overview.body")}</p>
        </div>
        <Link href="/console/recovery" className="button button-primary h-11 shrink-0 px-5">
          <RouteIcon className="size-4" />{t("overview.newRecovery")}
        </Link>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-sm border border-blue-200 bg-blue-50 px-4 py-3 text-[11px] text-blue-950">
        <span className="font-bold">{t("preview.label")}</span>
        <span className="text-blue-800">{t("preview.body")}</span>
        <span className="ml-auto font-mono text-[8px] uppercase tracking-wider text-blue-700">{t("lastSync")}: 2m</span>
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label={t("metrics.label")}>
        {metrics.map(({label, value, unit, note, icon: Icon, tone}) => (
          <article key={label} className="console-card p-5">
            <div className="flex items-start justify-between">
              <div className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</div>
              <span className={`metric-icon metric-icon-${tone}`}><Icon className="size-4" /></span>
            </div>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">{value}</span>
              <span className="text-sm font-medium text-slate-400">{unit}</span>
            </div>
            <div className="mt-3 text-[11px] font-medium text-slate-500">{note}</div>
          </article>
        ))}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.75fr]">
        <section className="console-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t("services.title")}</h2>
              <p className="mt-1 text-[11px] text-slate-500">{t("services.body")}</p>
            </div>
            <Link href="/console/services" className="text-[11px] font-bold text-blue-700">{t("viewAll")}</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead className="bg-slate-50 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">
                <tr><th className="px-5 py-3">{t("services.service")}</th><th className="px-4 py-3">{t("services.status")}</th><th className="px-4 py-3">{t("services.readiness")}</th><th className="px-4 py-3">RTO</th><th className="px-5 py-3">RPO</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {services.map((service) => (
                  <tr key={service.name} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4"><div className="font-bold text-slate-900">{service.name}</div><div className="mt-1 font-mono text-[8px] uppercase text-slate-400">{service.environment}</div></td>
                    <td className="px-4 py-4"><span className={`status-chip status-chip-${service.tone}`}><span className="size-1.5 rounded-full bg-current" />{service.status}</span></td>
                    <td className="px-4 py-4"><div className="flex items-center gap-3"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{width: `${service.score}%`}} /></div><span className="font-mono text-[10px] font-bold">{service.score}</span></div></td>
                    <td className="px-4 py-4 font-mono text-[10px] text-slate-600">{service.rto}</td>
                    <td className="px-5 py-4 font-mono text-[10px] text-slate-600">{service.rpo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="maya-card relative overflow-hidden p-5 text-white">
          <div className="maya-glow pointer-events-none absolute -right-20 -top-20 size-64 rounded-full" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold"><span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-violet-200">✦</span>Maya</div>
              <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-2 py-1 font-mono text-[7px] uppercase tracking-wider text-violet-200">{t("maya.advisory")}</span>
            </div>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">{t("maya.title")}</h2>
            <p className="mt-3 text-sm leading-6 text-violet-100/70">{t("maya.body")}</p>
            <div className="mt-6 rounded-sm border border-white/10 bg-black/15 p-4">
              <div className="font-mono text-[8px] uppercase tracking-wider text-violet-200/70">{t("maya.finding")}</div>
              <p className="mt-2 text-xs font-semibold leading-5 text-white">{t("maya.findingBody")}</p>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-violet-100/60"><span className="size-1.5 rounded-full bg-amber-300" />{t("maya.humanReview")}</div>
            </div>
            <Link href="/console/maya" className="mt-5 flex h-10 w-full items-center justify-center rounded-sm border border-white/15 bg-white/10 text-xs font-bold hover:bg-white/15">{t("maya.review")}</Link>
          </div>
        </aside>
      </div>

      <section className="console-card mt-5 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-sm font-bold text-slate-900">{t("path.title")}</h2><p className="mt-1 text-[11px] text-slate-500">{t("path.body")}</p></div>
          <span className="status-chip status-chip-green"><CheckIcon className="size-3" />{t("path.planFrozen")}</span>
        </div>
        <div className="mt-7 grid gap-2 lg:grid-cols-7">
          {["preflight", "foundation", "iam", "terraform", "database", "gke", "validation"].map((phase, index) => (
            <div key={phase} className="relative">
              <div className={`rounded-sm border px-3 py-3 ${index < 3 ? "border-emerald-200 bg-emerald-50" : index === 3 ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
                <div className="font-mono text-[8px] text-slate-400">0{index + 1}</div>
                <div className="mt-2 truncate text-[10px] font-bold capitalize text-slate-700">{phase}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
