"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "Can I attend the celebration in person at your centre?",
    answer: "Yes, absolutely! We love having sponsors attend the celebration in person to cut the cake, distribute meals, and interact with the children. If you cannot attend due to distance, our team hosts the entire event and sends high-definition photo and video updates to your WhatsApp.",
  },
  {
    question: "How far in advance should I book a celebration package?",
    answer: "We recommend booking at least 2 to 3 days in advance so we can arrange fresh meals, custom cakes, and banners. However, for urgent requests, we can also accommodate bookings made 24 hours prior.",
  },
  {
    question: "Can I customize the cake design, food menu, or gift items?",
    answer: "Yes! When you connect with us on WhatsApp, you can share custom message banners, cake themes, dietary preferences, or specific gifts (like books, drawing kits, or sports equipment).",
  },
  {
    question: "How do I receive photo and video proof of the event?",
    answer: "Within 2 to 4 hours of completing the event, our coordinator sends full-resolution photos, cake-cutting video clips, and thank-you wishes from the children directly to your WhatsApp number.",
  },
  {
    question: "Is Karuna Sneham Foundation a registered organization?",
    answer: "Yes. Karuna Sneham Foundation is a officially incorporated non-profit organization registered under CIN U88900UP2026NPL250077 in Uttar Pradesh, India.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="mx-auto max-w-4xl px-5 py-20">
      <SectionHeading
        align="center"
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        description="Everything you need to know about sponsoring celebrations and making a direct impact."
      />

      <div className="mt-12 space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`overflow-hidden rounded-2xl bg-surface border transition-colors duration-200 ${
                isOpen
                  ? "border-secondary/30 shadow-soft"
                  : "border-primary/8 shadow-warm hover:border-primary/20"
              }`}
            >
              {/* Left accent bar */}
              <div className={`flex transition-all duration-200 ${isOpen ? "border-l-2 border-secondary" : "border-l-2 border-transparent"}`}>
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="flex items-center gap-3 font-display text-sm sm:text-base text-primary font-medium pr-4">
                    <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${isOpen ? "text-secondary" : "text-secondary/60"}`} />
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 rounded-full p-1.5 transition-colors ${isOpen ? "bg-secondary/10 text-secondary" : "bg-background text-primary"}`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-sm sm:text-base text-ink-soft leading-relaxed border-t border-primary/5 pt-3 ml-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
