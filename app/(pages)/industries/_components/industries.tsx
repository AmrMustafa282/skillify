import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Briefcase,
  Globe,
  HeartPulse,
  Landmark,
  Server,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";

const MotionDiv = motion.div;
const MotionH3 = motion.h3;
const MotionP = motion.p;

const industries = [
  {
    name: "Technology",
    description:
      "Identify top tech talent with specialized assessments for developers, data scientists, and IT professionals.",
    icon: Server,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
    challenges: [
      "Finding candidates with specific technical skills",
      "Assessing problem-solving abilities",
      "Evaluating cultural fit in fast-paced environments",
      "Reducing time-to-hire for critical roles",
    ],
    solutions: [
      "Technical skill assessments",
      "Coding challenges with real-world scenarios",
      "Team compatibility analysis",
      "Automated screening process",
    ],
  },
  {
    name: "Finance",
    description:
      "Evaluate financial acumen, regulatory knowledge, and analytical skills for banking and financial services roles.",
    icon: Landmark,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
    challenges: [
      "Ensuring compliance knowledge",
      "Assessing risk management capabilities",
      "Evaluating analytical thinking",
      "Finding candidates with specialized financial expertise",
    ],
    solutions: [
      "Compliance and regulatory assessments",
      "Financial analysis simulations",
      "Risk assessment scenarios",
      "Industry-specific knowledge tests",
    ],
  },
  {
    name: "Healthcare",
    description:
      "Screen healthcare professionals with assessments that evaluate clinical knowledge, patient care, and medical ethics.",
    icon: HeartPulse,
    color: "bg-red-500/10",
    iconColor: "text-red-500",
    challenges: [
      "Verifying clinical competencies",
      "Assessing patient care approach",
      "Evaluating ethical decision-making",
      "Finding specialized medical expertise",
    ],
    solutions: [
      "Clinical knowledge assessments",
      "Patient care scenario simulations",
      "Medical ethics evaluations",
      "Specialty-specific skill tests",
    ],
  },
  {
    name: "Education",
    description:
      "Identify effective educators and administrators with assessments focused on teaching methods and educational leadership.",
    icon: GraduationCap,
    color: "bg-yellow-500/10",
    iconColor: "text-yellow-500",
    challenges: [
      "Evaluating teaching methodologies",
      "Assessing student engagement strategies",
      "Finding candidates with curriculum development skills",
      "Identifying effective educational leaders",
    ],
    solutions: [
      "Teaching methodology assessments",
      "Curriculum development evaluations",
      "Student engagement simulations",
      "Educational leadership assessments",
    ],
  },
  {
    name: "Retail",
    description:
      "Find customer-focused talent with assessments that evaluate sales skills, customer service, and retail operations knowledge.",
    icon: ShoppingBag,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
    challenges: [
      "Identifying customer service orientation",
      "Assessing sales capabilities",
      "Evaluating inventory management skills",
      "Finding retail operations knowledge",
    ],
    solutions: [
      "Customer service simulations",
      "Sales scenario assessments",
      "Retail operations knowledge tests",
      "Inventory management evaluations",
    ],
  },
  {
    name: "Consulting",
    description:
      "Evaluate problem-solving, client management, and analytical thinking for consulting and professional services roles.",
    icon: Briefcase,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    challenges: [
      "Assessing complex problem-solving abilities",
      "Evaluating client management skills",
      "Finding candidates with analytical thinking",
      "Identifying project management capabilities",
    ],
    solutions: [
      "Case study assessments",
      "Client scenario simulations",
      "Analytical thinking evaluations",
      "Project management skill tests",
    ],
  },
  {
    name: "Manufacturing",
    description:
      "Identify candidates with technical expertise, safety knowledge, and operational excellence for manufacturing roles.",
    icon: Building2,
    color: "bg-orange-500/10",
    iconColor: "text-orange-500",
    challenges: [
      "Evaluating technical expertise",
      "Assessing safety knowledge and awareness",
      "Finding operational excellence capabilities",
      "Identifying process improvement skills",
    ],
    solutions: [
      "Technical knowledge assessments",
      "Safety protocol evaluations",
      "Operational excellence simulations",
      "Process improvement skill tests",
    ],
  },
  {
    name: "Non-Profit",
    description:
      "Find mission-driven talent with assessments that evaluate community engagement, fundraising, and program management skills.",
    icon: Globe,
    color: "bg-teal-500/10",
    iconColor: "text-teal-500",
    challenges: [
      "Identifying mission alignment",
      "Assessing community engagement skills",
      "Evaluating fundraising capabilities",
      "Finding program management expertise",
    ],
    solutions: [
      "Mission alignment assessments",
      "Community engagement simulations",
      "Fundraising strategy evaluations",
      "Program management skill tests",
    ],
  },
];

const Industries = () => {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((industry, index) => (
          <MotionDiv
            key={index}
            className="border rounded-xl p-8 bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1 * index,
              type: "spring",
              stiffness: 50,
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            <div
              className={`h-12 w-12 rounded-lg ${industry.color} flex items-center justify-center mb-6`}
            >
              <industry.icon className={`h-6 w-6 ${industry.iconColor}`} />
            </div>

            <MotionH3 className="text-2xl font-bold mb-3">{industry.name}</MotionH3>
            <MotionP className="text-muted-foreground mb-6">{industry.description}</MotionP>

            <Button variant="outline" className="w-full group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default Industries;
