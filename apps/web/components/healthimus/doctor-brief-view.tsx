"use client";

import Link from "next/link";
import { FileText, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCare } from "@/lib/context/care-context";
import { formatShortDate } from "@/lib/utils/format-time";

export const DoctorBriefView = () => {
  const { brief, recipient } = useCare();

  return (
    <div className="space-y-6">
      <Card className="healthimus-glass overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="text-primary size-5" />
                Visit brief
              </CardTitle>
              <CardDescription>
                {recipient?.displayName} · Generated {formatShortDate(brief.generatedAt)}{" "}
                (sample)
              </CardDescription>
            </div>
            <Button asChild variant="outline" className="shrink-0 rounded-xl">
              <Link href="/dashboard/chat">
                <MessageSquare className="mr-2 size-4" />
                Refine with AI
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            {brief.summaryLines.map((line, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </div>
          <Separator />
          {brief.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h3 className="text-foreground text-sm font-semibold tracking-tight">
                {section.title}
              </h3>
              <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm leading-relaxed">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
