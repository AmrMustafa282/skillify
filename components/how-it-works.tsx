"use client";
import { motion } from "framer-motion";
import { FileText, Users, BarChart, CheckCircle } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionSpan = motion.span;

const steps = [
  {
    title: "Create Your Assessment",
    description:
      "Build custom assessments from our extensive library of questions or create your own. Tailor each assessment to the specific skills and competencies you're looking for.",
    icon: FileText,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Invite Candidates",
    description:
      "Send automated invitations to candidates via email or share a direct link. Our platform makes it easy to manage and track all your candidates in one place.",
    icon: Users,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Analyze Results",
    description:
      "Get detailed analytics and insights on candidate performance. Compare results, identify top performers, and make data-driven hiring decisions.",
    icon: BarChart,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Make Better Decisions",
    description:
      "Use objective data to select the best candidates, identify skill gaps in your team, and create targeted development plans.",
    icon: CheckCircle,
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="container py-24 md:py-32 relative">
      {/* Background element */}
      <MotionDiv
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
      </MotionDiv>

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
          How It Works
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg max-w-[42rem] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Our simple four-step process makes assessment management easy and effective.
        </MotionP>
      </MotionDiv>

        <div className="space-y-20 relative">
          {steps.map((step, index) => (
            <MotionDiv
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-16 items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 50,
              }}
            >
              <div className="flex-1 text-center md:text-left">
                <MotionSpan
                  className="inline-block text-sm font-medium text-muted-foreground mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  Step {index + 1}
                </MotionSpan>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <MotionDiv
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div
                  className={`h-32 w-32 rounded-full ${step.color} flex items-center justify-center relative`}
                >
                  <MotionDiv
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(255, 255, 255, 0)",
                        "0 0 0 10px rgba(255, 255, 255, 0)",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                  />
                  <step.icon className={`h-12 w-12 ${step.iconColor}`} />
                </div>

                {/* Circle marker for timeline */}
                <MotionDiv
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary hidden md:block"
                  style={{
                    left: index % 2 === 0 ? "auto" : "0",
                    right: index % 2 === 0 ? "0" : "auto",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                />
              </MotionDiv>
            </MotionDiv>
          ))}
        </div>
    </section>
  );
}
