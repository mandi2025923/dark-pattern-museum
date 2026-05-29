import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageScaffold } from "@/components/museum/PageScaffold";
import { getDarkPattern, darkPatterns } from "@/data/darkPatterns";
import { roomRoute } from "@/lib/routes";
import { CyberButton } from "@/components/ui/CyberButton";

type ExhibitPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return darkPatterns.map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({
  params,
}: ExhibitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getDarkPattern(slug);

  if (!pattern) {
    return {};
  }

  return {
    title: pattern.titleEn,
    description: pattern.description,
  };
}

export default async function ExhibitDetailPage({ params }: ExhibitPageProps) {
  const { slug } = await params;
  const pattern = getDarkPattern(slug);

  if (!pattern) {
    notFound();
  }

  return (
    <PageScaffold eyebrow="Exhibit Record" title={pattern.titleEn}>
      <p>{pattern.description}</p>
      <p className="mt-4">{pattern.criticalTheme}</p>
      <div className="mt-8">
        <CyberButton href={roomRoute(pattern.simulationType)} variant="ghost">
          Open simulation room
        </CyberButton>
      </div>
    </PageScaffold>
  );
}
