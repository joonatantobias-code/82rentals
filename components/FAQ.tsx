"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useT } from "@/components/LocaleProvider";

export default function FAQ() {
  const t = useT();
  const page = t.pages.ukk;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="max-w-3xl mx-auto space-y-3">
        {page.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={`card overflow-hidden transition-shadow ${
                isOpen ? "shadow-glow" : ""
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
                aria-expanded={isOpen}
              >
                <span className="font-display font-semibold text-brand-secondary text-base md:text-lg">
                  {item.q}
                </span>
                <span
                  className={`h-10 w-10 rounded-full grid place-items-center shrink-0 transition-all ${
                    isOpen
                      ? "bg-brand-secondary text-brand-primary rotate-45"
                      : "bg-brand-primary-50 text-brand-secondary"
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-6 text-brand-secondary/75 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
