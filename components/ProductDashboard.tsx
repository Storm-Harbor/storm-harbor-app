import {useTranslations} from "next-intl";
import {CheckIcon, FileCheckIcon, NetworkIcon, ShieldCheckIcon} from "./Icons";

export function ProductDashboard() {
  const t = useTranslations("dashboard");

  return (
    <div className="product-window" aria-label={t("ariaLabel")}>
      <div className="flex h-11 items-center justify-between border-b border-white/10 bg-[#151e28] px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-slate-600" />
          <span className="size-2 rounded-full bg-slate-600" />
          <span className="size-2 rounded-full bg-blue-500" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">service / checkout-api</span>
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
          <span className="status-pulse size-1.5 rounded-full bg-emerald-400" />
          {t("reconciled")}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_.85fr]">
        <div className="graph-panel relative min-h-[330px] border-b border-white/10 p-5 sm:min-h-[390px] sm:p-7 lg:border-b-0 lg:border-r">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <div className="label-mono">{t("dependencyGraph")}</div>
              <div className="mt-1 text-sm font-semibold text-white">checkout-api / production</div>
            </div>
            <span className="rounded-sm border border-blue-400/20 bg-blue-400/10 px-2 py-1 font-mono text-[8px] uppercase text-blue-300">SHA 9f4a2c1</span>
          </div>

          <svg className="absolute inset-x-5 bottom-6 top-24 h-[235px] w-[calc(100%-2.5rem)] overflow-visible sm:inset-x-7 sm:w-[calc(100%-3.5rem)]" viewBox="0 0 560 235" role="img" aria-label={t("graphAriaLabel")}>
            <g className="dashboard-links" fill="none" strokeWidth="1.5">
              <path d="M72 55 C135 55 120 118 195 118" />
              <path d="M72 180 C135 180 120 118 195 118" />
              <path d="M245 118 C320 118 300 48 376 48" />
              <path d="M245 118 C318 118 310 118 390 118" />
              <path d="M245 118 C318 118 300 190 376 190" />
              <path d="M435 48 C492 48 475 118 526 118" />
              <path d="M447 118 H526" />
              <path d="M435 190 C492 190 475 118 526 118" />
            </g>
            <g className="dashboard-node">
              <rect x="12" y="33" width="88" height="44" rx="3" />
              <text x="56" y="51" textAnchor="middle">GITHUB</text>
              <text className="node-sub" x="56" y="65" textAnchor="middle">desired state</text>
            </g>
            <g className="dashboard-node">
              <rect x="12" y="158" width="88" height="44" rx="3" />
              <text x="56" y="176" textAnchor="middle">GCP API</text>
              <text className="node-sub" x="56" y="190" textAnchor="middle">actual state</text>
            </g>
            <g className="dashboard-node dashboard-node-core">
              <rect x="166" y="91" width="108" height="54" rx="3" />
              <text x="220" y="114" textAnchor="middle">CONTROL PLANE</text>
              <text className="node-sub" x="220" y="130" textAnchor="middle">correlate + assess</text>
            </g>
            <g className="dashboard-node">
              <rect x="368" y="27" width="88" height="42" rx="3" />
              <text x="412" y="53" textAnchor="middle">CLOUD SQL</text>
            </g>
            <g className="dashboard-node">
              <rect x="382" y="97" width="78" height="42" rx="3" />
              <text x="421" y="123" textAnchor="middle">GKE</text>
            </g>
            <g className="dashboard-node">
              <rect x="368" y="169" width="88" height="42" rx="3" />
              <text x="412" y="195" textAnchor="middle">FLUXCD</text>
            </g>
            <g className="dashboard-node dashboard-node-proof">
              <circle cx="532" cy="118" r="28" />
              <text x="532" y="114" textAnchor="middle">PROOF</text>
              <text className="node-sub" x="532" y="128" textAnchor="middle">signed</text>
            </g>
          </svg>
        </div>

        <div className="bg-[#111820] p-5 sm:p-7">
          <div className="label-mono">{t("readiness")}</div>
          <div className="mt-4 flex items-end justify-between border-b border-white/10 pb-5">
            <div>
              <span className="text-5xl font-semibold tracking-[-0.06em] text-white">84</span>
              <span className="ml-1 text-sm text-slate-500">/100</span>
            </div>
            <span className="mb-1 rounded-sm border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300">
              {t("blocked")}
            </span>
          </div>

          <div className="space-y-2.5 py-5">
            {[
              {label: t("coverage"), value: "100%", state: "ok"},
              {label: t("sourceFreshness"), value: "2m", state: "ok"},
              {label: t("lastExercise"), value: "12d", state: "ok"},
              {label: t("recoveryPoint"), value: t("unknown"), state: "warn"},
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-xs">
                <span className={`flex size-5 items-center justify-center rounded-full ${item.state === "ok" ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-300"}`}>
                  {item.state === "ok" ? <CheckIcon className="size-3" /> : <span className="text-[10px] font-bold">!</span>}
                </span>
                <span className="text-slate-400">{item.label}</span>
                <span className="ml-auto font-mono text-[10px] text-slate-200">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10">
            {[
              {icon: NetworkIcon, label: "RTO", value: "60m"},
              {icon: ShieldCheckIcon, label: "RPO", value: "15m"},
              {icon: FileCheckIcon, label: t("evidence"), value: "47"},
            ].map(({icon: Icon, label, value}) => (
              <div key={label} className="bg-[#151e28] px-2 py-3 text-center">
                <Icon className="mx-auto mb-1.5 size-3.5 text-blue-400" />
                <div className="font-mono text-[8px] uppercase text-slate-500">{label}</div>
                <div className="mt-1 text-xs font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
