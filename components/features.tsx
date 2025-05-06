import { ClipboardCheck, BarChart3, Users, Brain, Target, Clock, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionSpan = motion.span;

const features = [
  {
    name: "Smart Assessment Creation",
    description:
      "Build customized assessments in minutes with our intuitive drag-and-drop interface and extensive question library.",
    icon: ClipboardCheck,
  },
  {
    name: "Advanced Analytics Dashboard",
    description:
      "Gain deep insights into candidate performance with comprehensive analytics and visualizations.",
    icon: BarChart3,
  },
  {
    name: "Candidate Skill Mapping",
    description:
      "Identify top talent with precision using our AI-powered skill assessment and matching algorithms.",
    icon: Target,
  },
  {
    name: "Team Competency Analysis",
    description:
      "Analyze your team's strengths and skill gaps to make data-driven decisions for training and development.",
    icon: Users,
  },
  {
    name: "AI-Powered Insights",
    description:
      "Leverage machine learning to uncover patterns and predict candidate success with remarkable accuracy.",
    icon: Brain,
  },
  {
    name: "Time-Saving Automation",
    description:
      "Automate the entire assessment process from invitation to evaluation, saving hours of manual work.",
    icon: Clock,
  },
  {
    name: "Real-time Collaboration",
    description:
      "Enable seamless teamwork with real-time collaboration features for efficient assessment reviews.",
    icon: Zap,
  },
  {
    name: "Data Security & Compliance",
    description:
      "Ensure the highest level of data protection with our robust security measures and compliance standards.",
    icon: Shield,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32 ">
      <MotionDiv
        className="mx-auto max-w-[58rem] text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionH2
          className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl bg-clip-text text-transparent "
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
          Powerful Assessment Tools
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Discover how our platform can revolutionize your talent assessment and analytics process.
        </MotionP>
      </MotionDiv>
      <MotionDiv
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <MotionDiv
            key={feature.name}
            className="relative overflow-hidden rounded-lg border p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
            variants={item}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <MotionDiv
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                className="bg-primary/10 p-2 rounded-full"
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </MotionDiv>
              <h3 className="font-bold text-lg">{feature.name}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
            <MotionSpan
              className="absolute top-2 right-2 text-xs font-semibold text-primary/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            >
              0{index + 1}
            </MotionSpan>
            <MotionDiv
              className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-primary/5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
}
