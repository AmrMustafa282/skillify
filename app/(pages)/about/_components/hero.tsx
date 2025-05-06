"use client";
import { motion } from "framer-motion";

// Create motion components
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function AboutHero() {
  return (
    <section className="container flex min-h-screen max-w-screen-2xl flex-col items-center justify-center space-y-6 py-8 text-center">
      <MotionDiv
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MotionH1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
          }}
        >
          About SkIllIfy.io
        </MotionH1>
        <MotionP
          className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We're on a mission to transform how organizations assess, select, and develop talent
          through innovative technology and data-driven insights.
        </MotionP>
      </MotionDiv>
    </section>
  );
}
