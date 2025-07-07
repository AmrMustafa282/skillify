"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <MotionDiv
          className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <MotionDiv
          className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PagesLayout;
