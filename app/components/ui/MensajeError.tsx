import { cn } from "./cn";

export function IconoErrorCampo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="7" />
      <path d="M9 5.5v4" />
      <circle cx="9" cy="12.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MensajeError({
  id,
  children,
  className,
}: {
  id?: string;
  children: string;
  className?: string;
}) {
  return (
    <p
      id={id}
      role="alert"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold text-error",
        className,
      )}
    >
      <IconoErrorCampo className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}
