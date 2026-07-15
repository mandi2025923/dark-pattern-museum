import type { Metadata } from "next";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { ReflectionPrompt } from "@/components/reflection/ReflectionPrompt";

export const metadata: Metadata = {
  title: "Reflection",
  description: "Look back at what the four simulation rooms made you feel — and what that says about the interfaces you use every day.",
};

export default function ReflectionPage() {
  return (
    <PageScaffold eyebrow="Reflection" title="What did the interface make you do?">
      <ReflectionPrompt />
    </PageScaffold>
  );
}
