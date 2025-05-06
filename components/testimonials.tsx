"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const testimonials = [
  {
    quote:
      "This platform transformed our hiring process. We've reduced time-to-hire by 45% and the quality of candidates has improved dramatically.",
    author: "Sarah Johnson",
    title: "Head of Talent Acquisition, TechGrowth Inc.",
    avatar: "/avatars/avatar-1.png",
  },
  {
    quote:
      "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions about our team's skills and training needs.",
    author: "Michael Chen",
    title: "HR Director, Innovate Solutions",
    avatar: "/avatars/avatar-2.png",
  },
  {
    quote:
      "Creating custom assessments is incredibly easy. We've been able to tailor our screening process to each role, resulting in better matches and higher retention.",
    author: "Jessica Williams",
    title: "Recruitment Manager, Global Enterprises",
    avatar: "/avatars/avatar-3.png",
  },
  {
    quote: "StreamLine has revolutionized our team's workflow. It's a game-changer!",
    author: "David Brown",
    title: "Project Manager, Creative Minds",
    avatar: "/avatars/avatar-4.png",
  },
  {
    quote: "The best project management tool we've ever used. Highly recommended!",
    author: "Laura Davis",
    title: "Team Lead, Digital Innovators",
    avatar: "/avatars/avatar-5.png",
  },
  {
    quote: "StreamLine helped us increase productivity by 40%. It's incredible!",
    author: "Emily Johnson",
    title: "Operations Manager, FutureTech",
    avatar: "/avatars/avatar-6.png",
  },
];

export default function Testimonials() {
  return (
    <section className="container py-24 md:py-32">
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
          What Our Customers Say
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg max-w-[42rem] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Join hundreds of organizations that trust our platform to find and develop top talent.
        </MotionP>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <MotionDiv
            key={index}
            className="border rounded-xl p-8 shadow-sm relative border-b border-border/40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 50,
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <MotionDiv
              className="absolute -top-4 -left-4 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Quote className="h-5 w-5" />
            </MotionDiv>

            <div>
              <h4 className="font-semibold">{testimonial.author}</h4>
              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
            </div>
            <MotionP
              className="text-lg mt-6 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
            >
              "{testimonial.quote}"
            </MotionP>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
