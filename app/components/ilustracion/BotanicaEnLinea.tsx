import { cn } from "~/components/ui/cn";

type BotanicaEnLineaProps = {
  className?: string;
};

/** Ramita botánica en línea (lámina sistema-ilustración). Decorativa. */
export function BotanicaEnLinea({ className }: BotanicaEnLineaProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("stroke-margarita", className)}
    >
      <path d="M60 26V158" />
      <path d="M60 26C52 16 54 6 60 0 66 6 68 16 60 26Z" />
      <path d="M60 60C44 56 30 42 26 26 42 30 56 44 60 60Z" />
      <path d="M60 60C76 56 90 42 94 26 78 30 64 44 60 60Z" />
      <path d="M60 90C44 86 30 72 26 56 42 60 56 74 60 90Z" />
      <path d="M60 90C76 86 90 72 94 56 78 60 64 74 60 90Z" />
      <path d="M60 120C44 116 30 102 26 86 42 90 56 104 60 120Z" />
      <path d="M60 120C76 116 90 102 94 86 78 90 64 104 60 120Z" />
    </svg>
  );
}
