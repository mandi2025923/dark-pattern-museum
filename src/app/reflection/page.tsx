import type { Metadata } from "next";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { ReflectionPrompt } from "@/components/reflection/ReflectionPrompt";

export const metadata: Metadata = {
  title: "Reflection",
  description: "Reflection prompts for the museum visitor.",
};

export default function ReflectionPage() {
  return (
    <PageScaffold eyebrow="Reflection" title="What did the interface make you do?">
      <ReflectionPrompt />
    </PageScaffold>
  );
}
