import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;

const faqs = [
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial for all our plans. No credit card required to get started.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely! You can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new pricing will be prorated for the remainder of your billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. For Enterprise plans, we also offer invoicing options.",
  },
  {
    question: "Is there a discount for non-profits or educational institutions?",
    answer:
      "Yes, we offer special pricing for non-profits, educational institutions, and startups. Please contact our sales team for more information.",
  },
  {
    question: "What happens when I reach my assessment limit?",
    answer:
      "You'll receive a notification when you're approaching your limit. You can either upgrade to a higher plan or purchase additional assessments as needed.",
  },
];

const FAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  return (
    <section className="container py-12 md:py-24">
      <MotionDiv
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionH2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Frequently Asked Questions
        </MotionH2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <MotionDiv
              key={index}
              className="border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <MotionDiv
                  animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </MotionDiv>
              </button>

              <MotionDiv
                initial={{ height: 0 }}
                animate={{ height: openFaqIndex === index ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>
              </MotionDiv>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
};

export default FAQ;
