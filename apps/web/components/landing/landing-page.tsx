"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Activity, Lock, ShieldCheck, Sparkles } from "lucide-react";

import { GoogleSignInButton } from "@/components/auth/google-auth-buttons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const HeroCanvas = dynamic(
  () => import("@/components/landing/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const screenshots = [
  "/images/healthimus1.jpg",
  "/images/healthimus2.jpg",
  "/images/healthimus3.jpg",
  "/images/healthimus4.jpeg",
  "/images/healthimus5.jpg",
];

export const LandingPage = () => {
  return (
    <div className="relative min-h-svh overflow-hidden px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 pb-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
              <span className="text-sm font-semibold">H</span>
            </div>
            <div>
              <p className="font-semibold tracking-tight">Healthimus</p>
              <p className="text-muted-foreground text-xs">Caregiver copilot</p>
            </div>
          </div>
          <GoogleSignInButton className="rounded-xl shadow-sm" />
        </header>

        <section className="relative rounded-3xl border border-border/60 bg-card/55 p-8 shadow-xl backdrop-blur-xl md:p-12">
          <HeroCanvas />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-5">
              <Badge variant="outline" className="healthimus-glass rounded-full px-3">
                <Sparkles className="mr-1 size-3" />
                Built for real caregiving workflows
              </Badge>
              <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
                Serious care coordination, elevated with personal AI.
              </h1>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
                Healthimus helps families capture symptoms, monitor adherence,
                and generate doctor-ready summaries while keeping control over
                their own AI infrastructure.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <GoogleSignInButton className="rounded-xl px-5 shadow-sm" />
                <p className="text-muted-foreground text-xs">
                  Sign in required to access dashboard.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Activity,
                  title: "Live symptom timeline",
                  desc: "Capture, classify, and review progression quickly.",
                },
                {
                  icon: ShieldCheck,
                  title: "Clinical summary mode",
                  desc: "Generate structured briefs for appointments.",
                },
                {
                  icon: Lock,
                  title: "Authenticated workspace",
                  desc: "Protected dashboard and user-scoped data sync.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.2 }}
                >
                  <Card className="healthimus-glass h-full rounded-2xl border-border/60">
                    <CardContent className="space-y-2 p-4">
                      <item.icon className="text-primary size-4" />
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Product preview
            </h2>
            <p className="text-muted-foreground text-xs">
              Explore the authenticated dashboard after sign in
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((src, idx) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.25 }}
                className={idx === 0 ? "md:col-span-2 xl:col-span-2" : ""}
              >
                <Card className="healthimus-glass overflow-hidden rounded-2xl border-border/60">
                  <div className="relative aspect-16/10">
                    <Image
                      src={src}
                      alt={`Healthimus dashboard preview ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx < 2}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
