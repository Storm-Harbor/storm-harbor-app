"use client";

import {ReactNode, useState} from "react";
import {useTranslations} from "next-intl";
import {Brand} from "@/components/Brand";
import {
  CloseIcon,
  FileCheckIcon,
  GaugeIcon,
  LayersIcon,
  MenuIcon,
  NetworkIcon,
  RouteIcon,
  ShieldCheckIcon,
} from "@/components/Icons";
import {Link, usePathname, useRouter} from "@/i18n/navigation";

type ConsoleShellProps = {children: ReactNode};

export function ConsoleShell({children}: ConsoleShellProps) {
  const t = useTranslations("console");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navigation = [
    {href: "/console", label: t("nav.overview"), icon: GaugeIcon},
    {href: "/console/services", label: t("nav.services"), icon: NetworkIcon},
    {href: "/console/environments", label: t("nav.environments"), icon: LayersIcon},
    {href: "/console/recovery", label: t("nav.recovery"), icon: RouteIcon},
    {href: "/console/evidence", label: t("nav.evidence"), icon: FileCheckIcon},
  ];

  async function signOut() {
    await fetch("/api/auth/logout", {method: "POST"}).catch(() => null);
    router.replace("/login");
    router.refresh();
  }

  const sidebar = (
    <>
      <div className="flex h-17 items-center border-b border-white/10 px-5">
        <Brand compact />
        <button className="ml-auto text-slate-400 lg:hidden" type="button" onClick={() => setOpen(false)} aria-label={t("closeNavigation")}>
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div className="border-b border-white/10 px-4 py-5">
        <div className="label-mono">{t("organization")}</div>
        <button className="mt-2 flex w-full items-center gap-3 rounded-sm border border-white/10 bg-white/[0.035] px-3 py-2.5 text-left" type="button">
          <span className="flex size-7 items-center justify-center rounded-sm bg-blue-500/15 text-[10px] font-bold text-blue-300">IE</span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold text-white">iot.EraX</span>
            <span className="block truncate font-mono text-[8px] uppercase tracking-wider text-slate-500">storm-harbor</span>
          </span>
          <span className="ml-auto text-[10px] text-slate-500">⌄</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label={t("primaryNavigation")}>
        <div className="px-3 pb-3 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">{t("controlPlane")}</div>
        <div className="space-y-1">
          {navigation.map(({href, label, icon: Icon}) => {
            const active = href === "/console" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`console-nav-item ${active ? "console-nav-item-active" : ""}`}
              >
                <Icon className="size-[18px]" />
                {label}
                {href === "/console/recovery" && <span className="ml-auto size-1.5 rounded-full bg-amber-400" />}
              </Link>
            );
          })}
        </div>
        <div className="mt-8 px-3 pb-3 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">Maya</div>
        <Link href="/console/maya" onClick={() => setOpen(false)} className={`console-nav-item ${pathname.startsWith("/console/maya") ? "console-nav-item-active" : ""}`}>
          <span className="flex size-[18px] items-center justify-center rounded-full bg-violet-400/15 text-[10px] text-violet-300">✦</span>
          {t("nav.maya")}
          <span className="ml-auto rounded-full bg-violet-400/10 px-1.5 py-0.5 font-mono text-[7px] uppercase text-violet-300">AI</span>
        </Link>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link href="/console/settings" onClick={() => setOpen(false)} className={`console-nav-item ${pathname.startsWith("/console/settings") ? "console-nav-item-active" : ""}`}>
          <ShieldCheckIcon className="size-[18px]" />{t("nav.settings")}
        </Link>
        <button className="console-nav-item mt-1 w-full" type="button" onClick={signOut}>
          <span className="flex size-[18px] items-center justify-center">↗</span>{t("signOut")}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh bg-[#edf1f5] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[252px] flex-col border-r border-white/10 bg-[#101923] lg:flex">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" type="button" aria-label={t("closeNavigation")} onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-[286px] flex-col bg-[#101923] shadow-2xl">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-17 items-center border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <button className="mr-3 flex size-9 items-center justify-center rounded-sm border border-slate-200 text-slate-700 lg:hidden" type="button" onClick={() => setOpen(true)} aria-label={t("openNavigation")}>
            <MenuIcon className="size-5" />
          </button>
          <div>
            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">{t("project")}</div>
            <div className="mt-0.5 text-xs font-semibold text-slate-800">Storm Harbor / {t("production")}</div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-500" />{t("operational")}
            </div>
            <button className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-700" type="button" aria-label={t("account")}>{t("account").slice(0, 1)}</button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-7 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
