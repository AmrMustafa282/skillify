"use client";
import { motion } from "framer-motion";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    description:
      "Our journey began with a simple mission: to transform how organizations assess and select talent.",
  },
  {
    year: "2019",
    title: "First Platform Release",
    description:
      "Launched our initial assessment platform with basic functionality for skills evaluation.",
  },
  {
    year: "2020",
    title: "AI Integration",
    description:
      "Incorporated machine learning algorithms to enhance candidate matching and prediction.",
  },
  {
    year: "2021",
    title: "Global Expansion",
    description:
      "Expanded our services to international markets and added support for multiple languages.",
  },
  {
    year: "2022",
    title: "Advanced Analytics",
    description:
      "Introduced comprehensive analytics dashboard with predictive insights and benchmarking.",
  },
  {
    year: "2023",
    title: "Industry Solutions",
    description:
      "Developed specialized assessment solutions for key industries with unique hiring needs.",
  },
];

export default function Timeline() {
  return (
    <section className="container py-12 md:py-24 border-t">
      <MotionDiv
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionH2
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Journey
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Key milestones in our mission to transform talent assessment.
        </MotionP>
      </MotionDiv>

      <div className="max-w-3xl mx-auto relative">
        {/* Timeline line */}
        <MotionDiv
          className="absolute left-16 top-0 bottom-0 w-0.5 bg-border"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <MotionDiv
              key={index}
              className="flex gap-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
              }}
            >
              <div className="w-32 flex-shrink-0 text-right">
                <span className="text-xl font-bold">{item.year}</span>
              </div>

              <div className="relative">
                <MotionDiv
                  className="absolute -left-12 top-1 h-4 w-4 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
