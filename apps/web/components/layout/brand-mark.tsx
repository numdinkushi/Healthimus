import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
};

export const BrandMark = ({ className, compact }: Props) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 text-white shadow-md",
          compact && "size-9 rounded-lg",
        )}
      >
        <span className="font-semibold tracking-tight">H</span>
      </div>
      {!compact ? (
        <div className="min-w-0 flex flex-col leading-tight">
          <span className="font-semibold tracking-tight">Healthimus</span>
          <span className="text-muted-foreground text-xs font-medium">
            Caregiver copilot
          </span>
        </div>
      ) : null}
    </div>
  );
};
