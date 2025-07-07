"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

export default function AboutCTA() {
  return (
    <section className="container py-12 md:py-24">
      <MotionDiv
        className="max-w-4xl mx-auto text-center bg-primary/5 rounded-2xl p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionDiv
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />

        <MotionH2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Join Our Team
        </MotionH2>
        <MotionP
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We're always looking for talented individuals who are passionate about transforming how
          organizations assess and develop talent.
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button size="lg">
            View Open Positions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
