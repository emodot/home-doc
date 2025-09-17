import { ReactComponent as OtherPlan } from "assets/icons/other-plan.svg";
import { ReactComponent as PremiumPlan } from "assets/icons/premium-plan.svg";

export const pricingPlans = [
  {
    name: "Starter Plan",
    planIcon: <OtherPlan />,
    price: "₦45,000",
    period: "/month",
    bestFor: "Light support and check-ins",
    features: [
      "1 home visit/week (2 hours per visit)",
      "2 virtual consultations/month",
      "Preliminary full-body check (first month only)",
      "Medication drop-off (1x/month, within major cities)",
      "Prescription coordination",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Premium Plan",
    planIcon: <PremiumPlan />,
    price: "₦195,000",
    period: "/month",
    bestFor: "Full-time elderly care or live-in support",
    features: [
      "Daily home visits or 24/7 live-in care (based on preference)",
      "Unlimited virtual consultations",
      "Bi-weekly vitals & wellness checks",
      "Specialized elder care (dementia, stroke recovery, etc.)",
      "Nutrition & lifestyle advisory",
      "Dedicated care manager & support line",
      "Medication drop-off (Weekly, with refill tracking)",
      "Emergency care coordination",
    ],
    button: "Get Started",
    highlight: true, // This one is the "Best Plan"
  },
  {
    name: "Standard Plan",
    planIcon: <OtherPlan />,
    price: "₦95,000",
    period: "/month",
    bestFor: "Frequent care or post-surgery recovery",
    features: [
      "3 home visits/week (3-hour sessions)",
      "4 virtual consultations/month",
      "Monthly vitals & health monitoring",
      "Light companionship & daily living assistance",
      "Medication drop-off (2x/month, scheduled)",
      "Priority caregiver matching",
    ],
    button: "Get Started",
    highlight: false,
  },
];
