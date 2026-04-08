"use client";

import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCare } from "@/lib/context/care-context";
import type { SeverityLevel } from "@/lib/types/care";
import { severityLabel } from "@/lib/utils/severity";

const SEVERITIES: SeverityLevel[] = ["low", "medium", "high", "critical"];

export const SymptomLogForm = () => {
  const { addSymptom } = useCare();
  const [text, setText] = useState("");
  const [severity, setSeverity] = useState<SeverityLevel>("medium");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = () => {
    const t = text.trim();
    if (!t) {
      return;
    }
    setSubmitting(true);
    addSymptom({ symptom: t, severity, note: note.trim() || undefined });
    setText("");
    setNote("");
    setSeverity("medium");
    setSubmitting(false);
  };

  return (
    <Card className="healthimus-glass">
      <CardHeader>
        <CardTitle>Log a symptom</CardTitle>
        <CardDescription>
          Saved locally in this demo session — will sync to Convex after
          backend wiring.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="symptom-text">What happened?</Label>
          <Textarea
            id="symptom-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Dizziness for 15 minutes after standing; improved when sitting."
            rows={4}
            className="resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label>Urgency</Label>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant={severity === s ? "default" : "outline"}
                className="rounded-full capitalize"
                onClick={() => setSeverity(s)}
              >
                {severityLabel(s)}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptom-note">Context (optional)</Label>
          <Textarea
            id="symptom-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Vitals, triggers, what helped…"
            rows={2}
            className="resize-none text-sm"
          />
        </div>
        <Button
          type="button"
          className="rounded-xl"
          onClick={onSubmit}
          disabled={submitting || !text.trim()}
        >
          {submitting ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Plus className="mr-2 size-4" />
          )}
          Add to timeline
        </Button>
      </CardContent>
    </Card>
  );
};
