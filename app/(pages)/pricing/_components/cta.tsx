import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const CTA = () => {
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
          Still have questions?
        </MotionH2>
        <MotionP
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Our team is here to help you find the perfect plan for your business. Schedule a call with
          our sales team for a personalized consultation.
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button size="lg">Contact Sales</Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
};

export default CTA;
