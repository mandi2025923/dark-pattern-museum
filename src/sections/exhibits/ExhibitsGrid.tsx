"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/animations/variants";
import { ExhibitCard } from "@/components/exhibits/ExhibitCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { darkPatternCategories } from "@/data/darkPatterns";

export function ExhibitsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
      <SectionLabel
        index="ARCHIVE"
        title="Exhibit catalogue"
        subtitle={`${darkPatternCategories.length} sectors · interactive simulations in development`}
      />

      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {darkPatternCategories.map((exhibit, index) => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
