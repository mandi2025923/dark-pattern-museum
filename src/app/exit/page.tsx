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
      <p>
        This route will become the closing cinematic sequence after the archive,
        simulations, and reflection layers are implemented.
      </p>
    </PageScaffold>
  );
}
