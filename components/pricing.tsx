"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

// Create motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionSpan = motion.span;

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams and startups",
    price: "$49",
    billing: "per month",
    features: [
      "Up to 25 assessments per month",
      "Basic analytics dashboard",
      "5 assessment templates",
      "Email support",
      "1 admin user",
    ],
    limitations: ["Advanced analytics", "Custom branding", "API access", "Dedicated support"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "Ideal for growing businesses",
    price: "$99",
    billing: "per month",
    features: [
      "Up to 100 assessments per month",
      "Advanced analytics dashboard",
      "20 assessment templates",
      "Custom question creation",
      "Email and chat support",
      "5 admin users",
      "Basic API access",
    ],
    limitations: ["Custom branding", "Dedicated support"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: "Custom",
    billing: "contact for pricing",
    features: [
      "Unlimited assessments",
      "Full analytics suite",
      "Unlimited templates",
      "Custom question creation",
      "Priority support",
      "Unlimited admin users",
      "Full API access",
      "Custom branding",
      "Dedicated account manager",
      "SSO authentication",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
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
          Simple, Transparent Pricing
        </MotionH2>
        <MotionP
          className="mt-4 text-muted-foreground sm:text-lg max-w-[42rem] mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Choose the plan that's right for your business. All plans include a 14-day free trial.
        </MotionP>
      </MotionDiv>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <MotionDiv
            key={index}
            className={`rounded-xl border ${
              plan.popular ? "border-primary shadow-lg" : ""
            } bg-background p-8 relative`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2 + index * 0.1,
              type: "spring",
              stiffness: 50 
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            {plan.popular && (
              <MotionSpan
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Most Popular
              </MotionSpan>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-muted-foreground mt-1">{plan.description}</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground ml-2">{plan.billing}</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="font-medium">What's included:</p>
              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <MotionDiv
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </MotionDiv>
                ))}
                
                {plan.limitations.map((limitation, i) => (
                  <MotionDiv
                    key={i}
                    className="flex items-start gap-2 text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (plan.features.length + i) * 0.05, duration: 0.5 }}
                  >
                    <X className="h-5 w-5 text-muted-foreground/70 shrink-0 mt-0.5" />
                    <span>{limitation}</span>
                  </MotionDiv>
                ))}
              </ul>
            </div>
            
            <Button 
              className={`w-full ${plan.popular ? "" : "variant-outline"}`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}
