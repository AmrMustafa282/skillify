"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionImg = motion.img;

const integrations = [
  {
    name: "Slack",
    description: "Get notifications and updates directly in your Slack channels.",
    logo: "/logos/slack.svg",
    color: "bg-[#4A154B]/10",
  },
  {
    name: "Microsoft Teams",
    description: "Seamlessly integrate with Microsoft Teams for collaboration.",
    logo: "/logos/teams.svg",
    color: "bg-[#6264A7]/10",
  },
  {
    name: "Google Workspace",
    description: "Connect with Google Calendar, Gmail, and other Google services.",
    logo: "/logos/google.svg",
    color: "bg-[#4285F4]/10",
  },
  {
    name: "Zoom",
    description: "Schedule and manage video interviews directly from our platform.",
    logo: "/logos/zoom.svg",
    color: "bg-[#2D8CFF]/10",
  },
  {
    name: "Salesforce",
    description: "Sync candidate data with your Salesforce CRM.",
    logo: "/logos/salesforce.svg",
    color: "bg-[#00A1E0]/10",
  },
  {
    name: "Workday",
    description: "Integrate with your Workday HR system for seamless data flow.",
    logo: "/logos/workday.svg",
    color: "bg-[#0875E1]/10",
  },
  {
    name: "Jira",
    description: "Connect assessment results with your Jira workflow.",
    logo: "/logos/jira.svg",
    color: "bg-[#0052CC]/10",
  },
  {
    name: "LinkedIn",
    description: "Source candidates directly from LinkedIn and track their progress.",
    logo: "/logos/linkedin.svg",
    color: "bg-[#0077B5]/10",
  },
];

// For demo purposes, we'll use placeholder logos
const logoPlaceholder = (name: string) => {
  return (
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
      <span className="font-bold text-primary">{name.charAt(0)}</span>
    </div>
  );
};

export default function Integrations() {
  return (
    <section className="container py-24 md:py-32 border-t">
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
          Seamless Integrations
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg max-w-[42rem] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Connect with your favorite tools and platforms for a streamlined workflow.
        </MotionP>
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {integrations.map((integration, index) => (
          <MotionDiv
            key={index}
            className={`rounded-xl p-6 ${integration.color} hover:shadow-md transition-all duration-300`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex flex-col items-center text-center">
              {integration.logo ? (
                <MotionImg
                  src={integration.logo}
                  alt={integration.name}
                  className="h-12 w-12 mb-4"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              ) : (
                logoPlaceholder(integration.name)
              )}
              <h3 className="font-semibold mb-2">{integration.name}</h3>
              <p className="text-sm text-muted-foreground">{integration.description}</p>
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>

      <MotionDiv
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Button variant="outline" className="group">
          View All Integrations
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </MotionDiv>
    </section>
  );
}
