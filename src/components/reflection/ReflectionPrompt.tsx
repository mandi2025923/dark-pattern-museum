import { CyberButton } from "@/components/ui/CyberButton";
import { routes } from "@/lib/routes";

export function ReflectionPrompt() {
  return (
    <section className="border border-museum-border bg-museum-panel/60 p-5">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
        local reflection
      </p>
      <p className="mt-4 text-xl leading-8 text-museum-text">
        Which moment made you hesitate, click faster, or stop reading carefully?
      </p>
      <p className="mt-4 text-sm leading-6 text-museum-muted">
        The final version will keep reflection private and local. No response is
        stored or sent anywhere.
      </p>
      <div className="mt-6">
        <CyberButton href={routes.exit} variant="ghost">
          Continue to exit
        </CyberButton>
      </div>
    </section>
  );
}
