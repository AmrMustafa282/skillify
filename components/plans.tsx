"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Building2, Zap, X } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config";
import toast from "react-hot-toast";

const planIcons = {
  free: Crown,
  pro: Zap,
  business: Building2,
};

const planColors = {
  free: "bg-gray-50 border-gray-200",
  pro: "bg-blue-50 border-blue-200",
  business: "bg-purple-50 border-purple-200",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const loadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/subscriptions/plans", {
          withCredentials: true,
        });
        const data = response.data.data;
        setPlans(data.reverse());
      } catch (error) {
        console.error("Failed to fetch subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  interface checkoutSessionProps {
    planName: "free" | "pro" | "business";
  }

  const createCheckoutSession = async (planName: checkoutSessionProps) => {
    setLoading(true)
    try {
      const res = await axios.post(
        `${API_URL}/payments/checkout`,
        {
          planName,
          returnUrl: "http://localhost:3000/subscription",
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        window.location.assign(res.data.data.url)
      }
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-12 space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Loading header */}
          <motion.div variants={loadingVariants} custom={0} className="text-center space-y-4">
            <motion.div
              className="h-8 bg-gray-200 rounded w-1/3 mx-auto"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)",
                backgroundSize: "200% 100%",
              }}
            />
            <motion.div
              className="h-4 bg-gray-200 rounded w-1/2 mx-auto"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 0.2,
              }}
              style={{
                background: "linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)",
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>

          {/* Loading cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={loadingVariants}
                custom={i}
                className="h-96 bg-gray-200 rounded-lg"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.3,
                }}
                style={{
                  background: "linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)",
                  backgroundSize: "200% 100%",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!plans.length) {
    return (
      <div className="container mx-auto p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Failed to load subscription plans</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-muted-foreground">Select the perfect plan for your needs</p>
      </motion.div>

      {/* Animated cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-3"
      >
        <AnimatePresence>
          {plans.map((planData, index) => {
            const { plan } = planData;
            const Icon = planIcons[plan.name as keyof typeof planIcons] || Crown;
            const colorClass =
              planColors[plan.name as keyof typeof planColors] || "bg-gray-50 border-gray-200";

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Card
                  className={`
                    relative h-full cursor-pointer
                    ${planData.currentPlan ? "ring-2 ring-blue-500" : ""}
                    ${colorClass}
                  `}
                >
                  {/* Current plan badge */}
                  <AnimatePresence>
                    {planData.currentPlan && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                          delay: 0.3,
                        }}
                        className="absolute -top-3 left-[39%] transform -translate-x-1/2 z-10"
                      >
                        <motion.div
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Badge className="bg-blue-500">
                            <motion.span
                              animate={{ opacity: [1, 0.7, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              Current Plan
                            </motion.span>
                          </Badge>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <CardHeader className="text-center">
                    {/* Animated icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CardTitle className="text-2xl">{plan.displayName}</CardTitle>
                      <CardDescription>
                        {plan.name === "free" && "Perfect for getting started"}
                        {plan.name === "pro" && "Great for growing teams"}
                        {plan.name === "business" && "Built for large organizations"}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>

                  <CardContent className="space-y-6 flex flex-col gap-4 justify-between">
                    {/* Features list */}
                    <div className="space-y-4 h-full">
                      {[
                        {
                          icon: Check,
                          text: `Up to ${plan.maxOrganizations} organizations`,
                          available: true,
                        },
                        { icon: Check, text: `Up to ${plan.maxTests} tests`, available: true },
                        { icon: Check, text: "24/7 Support", available: true },
                        {
                          icon: plan.name !== "free" ? Check : X,
                          text: "Advanced Analytics",
                          available: plan.name !== "free",
                        },
                        {
                          icon: plan.name === "business" ? Check : X,
                          text: "Priority Support",
                          available: plan.name === "business",
                        },
                      ].map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          variants={featureVariants}
                          // initial="hidden"
                          // animate="visible"
                          // custom={featureIndex}
                          // whileHover={{
                          //   x: 8,
                          //   backgroundColor: "rgba(255, 255, 255, 0.5)",
                          //   borderRadius: "6px",
                          //   padding: "4px",
                          //   margin: "-4px",
                          //   transition: { type: "spring", stiffness: 300 },
                          // }}
                          className="flex items-center gap-3"
                        >
                          <motion.div
                            whileHover={{
                              scale: feature.available ? 1.3 : 1.1,
                              rotate: feature.available ? 360 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <feature.icon
                              className={`h-4 w-4 ${feature.available ? "text-green-500" : "text-red-500"}`}
                            />
                          </motion.div>
                          <span
                            className={`text-sm ${feature.available ? "text-gray-700" : "text-gray-500"}`}
                          >
                            {feature.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Buttons section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="space-y-2">
                        {planData.currentPlan ? (
                          <Button className="w-full" disabled>
                            Current Plan
                          </Button>
                        ) : planData.restrictionReason ? (
                          <div>
                            <Button className="w-full" disabled>
                              Not Available
                            </Button>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="text-xs text-muted-foreground text-center mt-1"
                            >
                              {planData.restrictionReason}
                            </motion.p>
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="space-y-2"
                          >
                            <Button className="w-full" disabled={loading} onClick={() => createCheckoutSession(plan.name)}>
                              Upgrade to {plan.displayName}
                            </Button>
                          </motion.div>
                        )}
                      </div>

                      {/* Trial badge */}
                      <AnimatePresence>
                        {planData.canStartTrial && !planData.hasUsedTrial && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.05, 1],
                                opacity: [1, 0.8, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            >
                              <Badge variant="outline" className="text-xs">
                                Free Trial Available
                              </Badge>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
