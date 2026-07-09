import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingPreview() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with ServiceNow.",
      features: [
        "Access to basic roadmaps",
        "Limited interview questions",
        "Community forum access",
        "1 Practice project"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Everything you need to land a developer role.",
      features: [
        "All Premium Roadmaps",
        "250+ Interview Questions",
        "All Enterprise Projects",
        "AI Code Mentor (Unlimited)",
        "Mock Interviews",
        "Priority Support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "primary",
      popular: true
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
          >
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-now-primary to-orange-400">pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500"
          >
            Invest in your career. Land a high-paying ServiceNow role in months, not years.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 lg:p-10 ${plan.popular ? 'border-2 border-now-primary shadow-[0_20px_50px_rgba(255,90,60,0.15)] transform md:-translate-y-4' : 'border border-gray-200 shadow-sm'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-now-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black text-gray-900 tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                </div>
                <p className="text-gray-500">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/signup"
                className={`flex items-center justify-center w-full py-4 rounded-xl font-bold transition-all ${plan.buttonVariant === 'primary' ? 'bg-now-primary hover:bg-now-accent text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'}`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
