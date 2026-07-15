import { CyberButton } from "@/components/ui/CyberButton";
import { routes } from "@/lib/routes";

const prompts = [
  {
    room: "Shame Gate",
    ask: "Did you hesitate before clicking 'No thanks, I'll stay unproductive' — even though you knew the label was designed to shame you?",
  },
  {
    room: "Pressure Timer",
    ask: "When the countdown started running, did your pulse change? Did you read the fine print, or did the numbers do the reading for you?",
  },
  {
    room: "Exit Maze",
    ask: "How many retention screens in did you feel the urge to just give up and stay? That's the mechanism working.",
  },
  {
    room: "Silent Renewal",
    ask: "You were told about the auto-renewal before you clicked. Did you actually read it, or did your eye skip to the bright button?",
  },
];

export function ReflectionPrompt() {
  return (
    <section className="space-y-6">
      <div className="border border-museum-border bg-museum-panel/60 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
          what this page is for
        </p>
        <p className="mt-4 text-base leading-7 text-museum-text">
          You just walked through four rooms built to manipulate you. Each one used a
          real dark pattern — the same mechanics running on booking sites, newsletter
          pop-ups, subscription dashboards, and free trial flows. This page asks you to
          look back at what happened in your own body and brain while you were inside.
          Not to judge yourself. To notice.
        </p>
        <p className="mt-3 text-sm leading-6 text-museum-muted">
          Nothing you think here is recorded. There is no text box. The reflection
          happens in your head, where it stays.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {prompts.map((prompt) => (
          <div
            key={prompt.room}
            className="border border-museum-border bg-museum-panel/50 p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-museum-scan">
              {prompt.room}
            </p>
            <p className="mt-3 text-sm leading-6 text-museum-text/85">
              {prompt.ask}
            </p>
          </div>
        ))}
      </div>

      <div className="border-l-2 border-museum-neon/60 pl-4">
        <p className="text-sm leading-6 text-museum-text/80">
          Most people who use the internet every day have never been asked to think
          about what an interface made them feel. The fact that these patterns work
          depends on that silence. You just broke it — at least for yourself.
        </p>
      </div>

      <div className="pt-4">
        <CyberButton href={routes.exit} variant="ghost">
          Continue to exit
        </CyberButton>
      </div>
    </section>
  );
}
