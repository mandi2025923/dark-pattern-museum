import type { Metadata } from "next";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Exit",
  description: "The final exit sequence for Dark Pattern Museum.",
};

export default function ExitPage() {
  return (
    <PageScaffold eyebrow="Exit Sequence" title={siteConfig.closingQuote}>
      <div className="space-y-6">
        <p className="text-base leading-7 text-museum-text/85">
          The interfaces you use every day are not neutral. Every button placement,
          every colour choice, every countdown timer and shame-laden decline label
          is an argument about what you should do. You cannot unsee it now.
        </p>

        <div className="border border-museum-border bg-museum-panel/50 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-museum-neon">
            what now
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Next time a website makes you feel rushed, stop. Ask: is this deadline real, or is it designed to bypass my judgment?",
              "When a decline button insults you, read it out loud. Saying 'No thanks, I'll stay unproductive' makes the manipulation audible.",
              "Before subscribing to anything, find the cancellation page first. If it's hard to locate, that's information.",
              "Bookmark the FTC complaint form and the EU DSA enforcement page. Regulation only works when people report.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-mono text-xs leading-6 text-museum-muted">
                <span className="mt-0.5 shrink-0 text-museum-neon">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-museum-scan">
          You were never the customer. You were the product. Now you know.
        </p>
      </div>
    </PageScaffold>
  );
}
