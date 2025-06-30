"use client"
import FAQ from "./_components/faq";
import CTA from "./_components/cta";
import SubscriptionPlans from "@/components/plans";

export default function PricingPage() {
  return (
    <div>
      <SubscriptionPlans />
      <FAQ />
      <CTA />
    </div>
  );
}
