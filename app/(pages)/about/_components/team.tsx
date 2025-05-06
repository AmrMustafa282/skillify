"use client";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const team = [
  {
    name: "Ahmed Mohamed",
    title: "CEO & Co-Founder",
    bio: "Former HR executive with 15+ years of experience in talent acquisition and assessment.",
    image: "",
  },
  {
    name: "Loay Ghareb",
    title: "CTO & Co-Founder",
    bio: "AI and machine learning expert with a background in developing predictive analytics solutions.",
    image: "",
  },
  {
    name: "Amr Mustafa",
    title: "Chief Product Officer",
    bio: "Product leader with expertise in building intuitive, user-friendly assessment platforms.",
    image: "",
  },
  {
    name: "Ahmed Kashkosh",
    title: "Head of Customer Success",
    bio: "Passionate about helping clients achieve their hiring goals through effective assessment strategies.",
    image: "",
  },
  {
    name: "Abdelrahman Gad",
    title: "Head of Customer Success",
    bio: "Passionate about helping clients achieve their hiring goals through effective assessment strategies.",
    image: "",
  },
];

export default function Team() {
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
          Our Leadership Team
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Meet the experts behind SkIllIfy.io who are passionate about transforming talent
          assessment.
        </MotionP>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {team.map((member, index) => (
          <MotionDiv
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
            }}
          >
            <div className="h-48 w-48 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
              <div className="h-full w-full flex items-center justify-center">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground/50">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary font-medium mb-2">{member.title}</p>
            <p className="text-muted-foreground text-sm">{member.bio}</p>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
