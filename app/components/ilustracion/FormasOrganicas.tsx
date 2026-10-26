import { cn } from "~/components/ui/cn";

export type FormasOrganicasProps = {
  className?: string;
};

/**
 * Composición decorativa de manchas con el patrón del colibrí.
 * No aporta significado: siempre aria-hidden.
 */
export function FormasOrganicas({ className }: FormasOrganicasProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mx-auto aspect-square w-60 max-w-full lg:w-full lg:max-w-[480px]",
        className,
      )}
    >
      <div className="forma-organica absolute inset-0 overflow-hidden bg-margarita">
        <div className="patron-crema absolute -inset-5 opacity-40 lg:-inset-5" />
      </div>
      <div
        className="absolute bottom-[-4%] left-[-6%] aspect-square w-[38%] bg-durazno"
        style={{
          borderRadius: "52% 48% 60% 40% / 50% 58% 42% 50%",
        }}
      />
      <div className="absolute right-[4%] top-[-5%] aspect-square w-[18%] rounded-full bg-naranja" />
    </div>
  );
}
