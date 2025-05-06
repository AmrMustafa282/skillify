"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionButton = motion.button;

const faqs = [
  {
    question: "How does the assessment platform work?",
    answer:
      "Our platform allows you to create custom assessments using our extensive question library or your own questions. You can then invite candidates to take these assessments and analyze their results through our intuitive dashboard. The platform provides detailed analytics to help you make data-driven hiring decisions.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    question: "Can I customize the assessments for different roles?",
    answer:
      "You can create custom assessments tailored to specific roles, departments, or skill sets. Our platform offers a wide range of question types and templates that can be mixed and matched to assess the exact skills and competencies you're looking for.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    question: "How accurate are the assessment results?",
    answer:
      "Our assessments are designed by industrial-organizational psychologists and undergo rigorous validation processes. They provide highly accurate insights into candidates' skills, abilities, and potential job performance. The platform also offers anti-cheating measures to ensure the integrity of results.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    question: "Can I integrate the platform with my existing HR systems?",
    answer:
      "Yes, our platform offers integrations with many popular HR systems, ATS platforms, and productivity tools. We provide API access for custom integrations as well. This ensures a seamless workflow between our assessment platform and your existing systems.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    question: "Is the platform compliant with data protection regulations?",
    answer:
      "Yes, we take data protection very seriously. Our platform is fully compliant with GDPR, CCPA, and other relevant data protection regulations. We implement robust security measures to protect all data stored in our system and provide data processing agreements when required.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    question: "How long does it take to set up and start using the platform?",
    answer:
      "Most customers can set up and launch their first assessment within a day. Our intuitive interface requires no technical expertise, and we provide comprehensive onboarding support to help you get started quickly. For enterprise customers, we offer dedicated implementation services.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

function FAQItem({
  question,
  answer,
  icon,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <MotionDiv
      className={`backdrop-blur-md bg-background/30 border border-white/20 rounded-xl overflow-hidden mb-4 shadow-lg`}
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <MotionButton
        className="flex w-full items-center justify-between p-6 text-left font-medium transition-all group"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isOpen ? "bg-primary text-primary-foreground" : "bg-muted"
            } transition-colors duration-300`}
          >
            {icon}
          </div>
          <span className="text-lg group-hover:text-primary transition-colors duration-300">
            {question}
          </span>
        </div>
        <MotionDiv
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className={`ml-2 shrink-0 ${isOpen ? "text-primary" : ""} transition-colors duration-300`}
        >
          <ChevronDown className="h-5 w-5" />
        </MotionDiv>
      </MotionButton>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-muted-foreground">
              <div className="pl-[3.25rem]">
                <p>{answer}</p>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -z-10 top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -z-10 bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] bg-secondary/10 rounded-full blur-3xl opacity-50"></div>

      <MotionDiv
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionH2
          className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
          }}
        >
          Frequently Asked Questions
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg max-w-[42rem] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Have questions? We're here to help. If you don't see your question here, contact our
          support team.
        </MotionP>
      </MotionDiv>

      <div className="mx-auto max-w-4xl relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-primary/20 rounded-full"></div>

        <div className="grid gap-4 md:grid-cols-1">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              icon={faq.icon}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Contact support card */}
      <MotionDiv
        className="mt-12 mx-auto max-w-2xl backdrop-blur-md bg-background/30 border border-white/20 rounded-xl p-6 shadow-lg text-center"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="text-muted-foreground max-w-md">
            Our support team is ready to help you with any questions or concerns you might have
            about our platform.
          </p>
          <MotionButton
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </MotionButton>
        </div>
      </MotionDiv>
    </section>
  );
}
