import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

const Hero = () => {
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
          Comprehensive Assessment Solutions
        </MotionH1>
        <MotionP
          className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Our platform offers end-to-end solutions for talent assessment, team analytics, and
          data-driven decision making to help you build high-performing teams.
        </MotionP>
      </MotionDiv>
    </section>
  );
};

export default Hero;
