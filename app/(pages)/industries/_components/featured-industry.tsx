import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;

const FeaturedIndustry = () => {
  return (
    <section className="container py-12 md:py-24 border-t">
      <MotionDiv
        className="max-w-4xl mx-auto"
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
          How We Help Across Industries
        </MotionH2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MotionDiv
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-3">Common Challenges</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Finding candidates with the right technical skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Reducing time-to-hire for critical positions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Ensuring cultural fit within your organization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Standardizing the assessment process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Identifying high-potential candidates</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Our Approach</h3>
              <p className="text-muted-foreground">
                We work closely with industry experts to develop assessment solutions that address
                the specific needs and challenges of each sector. Our platform combines
                industry-specific knowledge tests, technical skill assessments, and behavioral
                evaluations to provide a comprehensive view of each candidate.
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-3">Our Solutions</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Customized assessment templates for your industry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Role-specific skill evaluations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Industry benchmark comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Automated screening and ranking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Detailed analytics and reporting</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <p className="text-muted-foreground">
                Our clients across industries report significant improvements in their hiring
                outcomes, including a 45% reduction in time-to-hire, 35% improvement in candidate
                quality, and 60% increase in retention rates for new hires assessed through our
                platform.
              </p>
            </div>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  );
};

export default FeaturedIndustry;
