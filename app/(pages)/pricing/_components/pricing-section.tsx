import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams and startups",
    price: {
      monthly: "$49",
      annual: "$39",
    },
    billing: {
      monthly: "per month",
      annual: "per month, billed annually",
    },
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
    price: {
      monthly: "$99",
      annual: "$79",
    },
    billing: {
      monthly: "per month",
      annual: "per month, billed annually",
    },
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
    price: {
      monthly: "Custom",
      annual: "Custom",
    },
    billing: {
      monthly: "contact for pricing",
      annual: "contact for pricing",
    },
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

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionSpan = motion.span;

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  return (
    <>
      <section className="container flex min-h-screen max-w-screen-2xl flex-col items-center justify-center space-y-6 py-8 text-center">
        <MotionDiv
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionH1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Simple, Transparent Pricing
          </MotionH1>
          <MotionP
            className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </MotionP>
        </MotionDiv>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-center mb-4">
          <MotionDiv
            className="mt-8 inline-flex items-center p-1 bg-muted rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === "annual" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual <span className="text-xs text-primary">Save 20%</span>
            </button>
          </MotionDiv>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <MotionDiv
              key={index}
              className={`rounded-xl border ${
                plan.popular ? "border-primary shadow-lg" : ""
              } p-8 relative flex flex-col h-full`}
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
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && (
                    <MotionSpan
                      className="text-xs font-medium "
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <Badge variant={"popular"}>Most Popular</Badge>
                    </MotionSpan>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                <span className="text-muted-foreground ml-2">{plan.billing[billingCycle]}</span>
              </div>

              {/* Features - This will take up the flexible space */}
              <div className="space-y-4 flex-grow">
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
                      transition={{
                        delay: 0.3 + (plan.features.length + i) * 0.05,
                        duration: 0.5,
                      }}
                    >
                      <X className="h-5 w-5 text-muted-foreground/70 shrink-0 mt-0.5" />
                      <span>{limitation}</span>
                    </MotionDiv>
                  ))}
                </ul>
              </div>

              {/* Button - This will be at the bottom */}
              <div className="mt-8 pt-4">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </div>
            </MotionDiv>
          ))}
        </div>
      </section>
    </>
  );
};

export default PricingSection;
