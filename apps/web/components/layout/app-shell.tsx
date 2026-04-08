"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import { BrandMark } from "@/components/layout/brand-mark";
import { RecipientSwitcher } from "@/components/layout/recipient-switcher";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";
import type { CareRecipient } from "@/lib/types/care";

type Props = {
  children: ReactNode;
  recipient: CareRecipient | undefined;
  recipientId: string;
  recipients: CareRecipient[];
  onRecipientChange: (id: string) => void;
};

export const AppShell = ({
  children,
  recipient,
  recipientId,
  recipients,
  onRecipientChange,
}: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh">
      <aside className="bg-card/50 border-border hidden w-64 shrink-0 flex-col border-r lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <BrandMark />
        </div>
        <SidebarNav />
        <div className="mt-auto flex flex-col gap-3 border-t p-4">
          <UserMenu variant="inline" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            Healthimus supports coordination and documentation. It does not
            replace professional medical advice.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="healthimus-glass sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 lg:h-16 lg:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b px-4 py-4 text-left">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <BrandMark />
              </SheetHeader>
              <div className="flex flex-col gap-1 p-2 pb-4">
                {MAIN_NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                        active
                          ? "bg-primary/12 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="border-t p-4">
                <UserMenu variant="inline" />
              </div>
            </SheetContent>
          </Sheet>

          <div className="lg:hidden">
            <BrandMark compact />
          </div>

          <Separator orientation="vertical" className="hidden h-8 lg:block" />

          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold tracking-tight lg:text-base">
                {recipient?.displayName ?? "Care"}
              </h1>
              <p className="text-muted-foreground hidden text-xs sm:block">
                {recipient?.conditions.slice(0, 2).join(" · ")}
                {recipient && recipient.conditions.length > 2 ? " · …" : ""}
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto sm:justify-end">
              <RecipientSwitcher
                recipients={recipients}
                selectedId={recipientId}
                onSelect={onRecipientChange}
                className="min-w-0 flex-1 sm:max-w-[280px] sm:flex-none"
              />
              <UserMenu />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
};
