"use client";
import { motion } from "framer-motion";
import { Lightbulb, Award, Heart, Users, Target, Globe } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const values = [
  {
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible in assessment technology.",
    icon: Lightbulb,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Excellence",
    description:
      "We are committed to delivering the highest quality solutions and service to our clients.",
    icon: Award,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical standards in all that we do.",
    icon: Heart,
    color: "bg-red-500/10",
    iconColor: "text-red-500",
  },
  {
    title: "Inclusion",
    description:
      "We believe in creating fair and unbiased assessment processes that promote diversity.",
    icon: Users,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Impact",
    description:
      "We measure our success by the positive difference we make for our clients and their candidates.",
    icon: Target,
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    title: "Global Perspective",
    description: "We embrace diverse perspectives and serve clients around the world.",
    icon: Globe,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
];

export default function OurValues() {
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
          Our Values
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          These core principles guide everything we do, from product development to customer
          service.
        </MotionP>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <MotionDiv
            key={index}
            className="border rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div
              className={`h-12 w-12 rounded-lg ${value.color} flex items-center justify-center mb-4`}
            >
              <value.icon className={`h-6 w-6 ${value.iconColor}`} />
            </div>
            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
