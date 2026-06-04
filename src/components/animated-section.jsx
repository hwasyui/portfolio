"use client";

export default function AnimatedSection({ id, children }) {
  return (
    <section id={id} className="scroll-mt-20 snap-section">
      {children}
    </section>
  );
}
