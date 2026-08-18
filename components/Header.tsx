"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {Brand} from "./Brand";
import {CloseIcon, GithubIcon, MenuIcon} from "./Icons";

const githubUrl = "https://github.com/Storm-Harbor/storm-harbor-control-plane";
const docsUrl = "https://storm-harbor.github.io/storm-harbor-control-plane/";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navItems = [
    {href: "#product", label: t("product")},
    {href: "#capabilities", label: t("capabilities")},
    {href: "#architecture", label: t("architecture")},
    {href: "#open-source", label: t("openSource")},
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#111820]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Brand />

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("primaryLabel")}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={docsUrl} target="_blank" rel="noreferrer" className="button button-ghost h-10 px-4 text-xs">
            {t("docs")}
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="button button-light h-10 px-4 text-xs">
            <GithubIcon className="size-4" />
            {t("github")}
          </a>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded border border-white/10 text-white lg:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? t("closeMenu") : t("openMenu")}
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-[72px] min-h-[calc(100dvh-72px)] border-t border-white/10 bg-[#111820] px-5 py-8 lg:hidden">
          <nav className="mx-auto flex max-w-lg flex-col" aria-label={t("primaryLabel")}>
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-5 text-xl font-semibold tracking-tight text-white"
              >
                {item.label}
                <span className="font-mono text-xs text-blue-400">0{index + 1}</span>
              </a>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a href={docsUrl} target="_blank" rel="noreferrer" className="button button-ghost">{t("docs")}</a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="button button-primary">
                <GithubIcon className="size-4" />{t("github")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
