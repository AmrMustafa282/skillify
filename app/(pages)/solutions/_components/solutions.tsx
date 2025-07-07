import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Target,
  Users,
} from "lucide-react";

const MotionDiv = motion.div;

const solutions = [
  {
    title: "Candidate Assessment",
    description:
      "Evaluate candidates with precision using our comprehensive assessment tools designed to identify the best talent for your organization.",
    icon: Users,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
    features: [
      "Customizable assessment templates",
      "Skills-based evaluation",
      "Anti-cheating measures",
      "Detailed candidate reports",
      "Comparative analytics",
    ],
  },
  {
    title: "Team Analytics",
    description:
      "Gain deep insights into your team's strengths and areas for improvement with our powerful analytics dashboard.",
    icon: BarChart3,
    color: "bg-purple-500/10",
    iconColor: "text-purple-500",
    features: [
      "Team performance metrics",
      "Skills gap analysis",
      "Competency mapping",
      "Development tracking",
      "Benchmark comparisons",
    ],
  },
  {
    title: "AI-Powered Insights",
    description:
      "Leverage machine learning to uncover patterns and predict success factors for better hiring and team development decisions.",
    icon: Brain,
    color: "bg-green-500/10",
    iconColor: "text-green-500",
    features: [
      "Predictive performance modeling",
      "Success pattern identification",
      "Automated skill matching",
      "Bias detection and prevention",
      "Continuous learning algorithms",
    ],
  },
  {
    title: "Talent Matching",
    description:
      "Match candidates to roles with precision using our AI-powered skill assessment and matching algorithms.",
    icon: Target,
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
    features: [
      "Role-specific matching",
      "Cultural fit assessment",
      "Skill alignment scoring",
      "Team compatibility analysis",
      "Growth potential evaluation",
    ],
  },
  {
    title: "Assessment Creation",
    description:
      "Build customized assessments in minutes with our intuitive drag-and-drop interface and extensive question library.",
    icon: ClipboardCheck,
    color: "bg-red-500/10",
    iconColor: "text-red-500",
    features: [
      "Drag-and-drop builder",
      "Question library access",
      "Custom question creation",
      "Multi-format assessments",
      "Difficulty calibration",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "Automate the entire assessment process from invitation to evaluation, saving hours of manual work.",
    icon: Clock,
    color: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    features: [
      "Automated invitations",
      "Reminder scheduling",
      "Results processing",
      "Report generation",
      "Integration with HR systems",
    ],
  },
];
const Solutions = () => {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
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
              className={`h-12 w-12 rounded-lg ${solution.color} flex items-center justify-center mb-6`}
            >
              <solution.icon className={`h-6 w-6 ${solution.iconColor}`} />
            </div>

            <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
            <p className="text-muted-foreground mb-6">{solution.description}</p>

            <div className="space-y-2 mb-8">
              {solution.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

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

export default Solutions;
