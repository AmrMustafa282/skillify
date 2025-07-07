import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionUl = motion.ul;
const MotionLi = motion.li;

const benefits = [
  "Reduce hiring time by up to 50%",
  "Improve candidate quality by 35%",
  "Eliminate bias with objective assessments",
  "Increase employee retention rates",
  "Streamline your hiring process",
  "Make data-driven decisions",
];

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container py-24 md:py-32">
        <MotionDiv
          className="mx-auto max-w-6xl rounded-3xl bg-primary/5 p-8 md:p-12 relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MotionDiv
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
          />

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <MotionH2
                className="font-bold text-4xl leading-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Revolutionize Your Assessment Process
              </MotionH2>
              <MotionP
                className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Join hundreds of forward-thinking companies leveraging our cutting-edge platform to
                identify top talent, analyze skills, and make data-driven decisions that propel
                their success.
              </MotionP>

              <MotionUl
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.6,
                    },
                  },
                }}
              >
                {benefits.map((benefit, index) => (
                  <MotionLi
                    key={index}
                    className="flex items-center gap-3 bg-background/50 p-3 rounded-lg shadow-sm"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </MotionLi>
                ))}
              </MotionUl>

              <MotionDiv
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Button size="lg" className="relative overflow-hidden group text-lg px-8 py-4">
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <MotionDiv
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </MotionDiv>
            </div>

            <MotionDiv
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="aspect-square max-w-[400px] rounded-2xl bg-background border shadow-lg p-6 relative">
                <MotionDiv
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      Assessment Analytics
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Real-time insights at your fingertips
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    {[
                      { label: "Candidate Performance", value: 85 },
                      { label: "Skill Gap Analysis", value: 70 },
                      { label: "Team Compatibility", value: 92 },
                      { label: "Hiring Efficiency", value: 78 },
                    ].map(({ label, value }, i) => (
                      <MotionDiv key={i} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>{label}</span>
                          <span className="text-primary">{value}%</span>
                        </div>
                        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                          <MotionDiv
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${value}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.5,
                              delay: 1 + i * 0.2,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
