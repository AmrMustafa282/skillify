"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { HeroChart } from "./home-page/hero-chart";

// Create motion components
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionSpan = motion.span;
const MotionP = motion.p;

export default function Hero() {
  return (
    <section className="container flex min-h-screen max-w-screen-2xl flex-col items-center justify-center space-y-6 py-8 text-center">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <MotionH1
          className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl pb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
        >
          Smarter Assessment
          <br />
          <MotionSpan
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Better Insights
          </MotionSpan>
        </MotionH1>
        <MotionP
          className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Transform your hiring and talent management with data-driven assessments. Our platform
          helps you identify top talent, analyze skills gaps, and make informed decisions with
          powerful analytics.
        </MotionP>
      </MotionDiv>
      <MotionDiv
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button size="lg" className="group">
          Create Assessment
          <MotionDiv whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </MotionDiv>
        </Button>
        <Button variant="outline" size="lg" className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          View Demo
        </Button>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative w-full max-w-[1000px] mx-auto mt-4"
      >
        <MotionDiv
          className="absolute -z-10 rounded-full bg-blue-500/20 blur-3xl"
          initial={{ width: 300, height: 300, x: -150, y: -150 }}
          animate={{
            width: 500,
            height: 500,
            x: -250,
            y: -250,
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 8,
          }}
        />
        {/* <MotionDiv
          className="w-full rounded-lg bg-background/50 border backdrop-blur-sm p-4 overflow-hidden"
          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
        >
          <HeroChart />
        </MotionDiv> */}
      </MotionDiv>
    </section>
  );
}
