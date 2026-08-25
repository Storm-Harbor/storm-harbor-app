import type {ReactNode} from "react";
import {setRequestLocale} from "next-intl/server";
import {ConsoleShell} from "@/components/console/ConsoleShell";

type ConsoleLayoutProps = {children: ReactNode; params: Promise<{locale: string}>};

export default async function ConsoleLayout({children, params}: ConsoleLayoutProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <ConsoleShell>{children}</ConsoleShell>;
}
