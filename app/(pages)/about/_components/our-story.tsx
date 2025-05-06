"use client";
import Logo from "@/components/logo";
import { motion } from "framer-motion";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

export default function OurStory() {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <MotionDiv
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <MotionH2 className="text-3xl font-bold">Our Story</MotionH2>
          <MotionP className="text-muted-foreground">
            SkIllIfy.io was founded in 2018 by a team of HR technology experts and data scientists
            who recognized a critical gap in the talent assessment market. Traditional assessment
            methods were often subjective, time-consuming, and failed to predict actual on-the-job
            performance.
          </MotionP>
          <MotionP className="text-muted-foreground">
            We set out to create a platform that combines the latest advances in psychometrics,
            machine learning, and user experience design to provide organizations with a more
            effective, efficient, and fair way to evaluate talent.
          </MotionP>
          <MotionP className="text-muted-foreground">
            Today, our platform is used by hundreds of organizations worldwide, from fast-growing
            startups to Fortune 500 companies, helping them make better hiring decisions and build
            stronger teams.
          </MotionP>
        </MotionDiv>

        <MotionDiv
          className="relative h-[400px] rounded-xl overflow-hidden bg-muted"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Logo />
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
