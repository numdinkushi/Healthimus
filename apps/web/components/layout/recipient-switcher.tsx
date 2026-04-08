"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { CareRecipient } from "@/lib/types/care";

type Props = {
  recipients: CareRecipient[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
};

export const RecipientSwitcher = ({
  recipients,
  selectedId,
  onSelect,
  className,
}: Props) => {
  const current = recipients.find((r) => r.id === selectedId) ?? recipients[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "healthimus-glass h-auto min-w-[220px] justify-between gap-2 px-3 py-2 font-normal",
            className,
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div
              className={cn(
                "size-8 shrink-0 rounded-full bg-linear-to-br shadow-sm ring-2 ring-background",
                current?.avatarGradient ?? "from-muted to-muted",
              )}
            />
            <div className="min-w-0 text-left">
              <div className="truncate text-sm font-medium">
                {current?.displayName}
              </div>
              <div className="text-muted-foreground truncate text-xs">
                {current?.relationLabel}
              </div>
            </div>
          </div>
          <ChevronsUpDown className="text-muted-foreground size-4 shrink-0 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Care recipient
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recipients.map((r) => (
          <DropdownMenuItem
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="gap-2"
          >
            <div
              className={cn(
                "size-7 shrink-0 rounded-full bg-linear-to-br",
                r.avatarGradient,
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{r.displayName}</div>
              <div className="text-muted-foreground text-xs">
                {r.relationLabel}
                {r.age != null ? ` · ${r.age}` : ""}
              </div>
            </div>
            {r.id === selectedId ? (
              <Check className="text-primary size-4 shrink-0" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
