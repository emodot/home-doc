import { ReactComponent as OtherPlan } from "assets/icons/other-plan.svg";
import { ReactComponent as PremiumPlan } from "assets/icons/premium-plan.svg";

export const pricingPlans = [
  {
    name: "Basic Plan",
    planIcon: <OtherPlan />,
    price: "₦10,000",
    period: "/month",
    bestFor: "Occasional check-ins and virtual support",
    features: [
      "2 virtual consultations/month",
      "Drug/medication coordination",
      "Monthly WhatsApp briefing to family",
      "Invites to social gatherings",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Silver Plan",
    planIcon: <OtherPlan />,
    price: "₦30,000",
    period: "/month",
    bestFor: "Light support and regular check-ins",
    features: [
      "1 doctor home visit/month",
      "2 virtual consultations/month",
      "Monthly vitals monitoring report",
      "Medication management",
      "Monthly WhatsApp updates to family",
      "Bi-annual cognitive/mental health screening",
      "Emergency response line (business hours)",
      "Invites to social gatherings",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Gold Plan",
    planIcon: <PremiumPlan />,
    price: "₦62,000",
    period: "/month",
    bestFor: "Frequent care with round-the-clock emergency support",
    features: [
      "1 doctor home visit/month",
      "2 virtual consultations/month",
      "Monthly vitals monitoring report",
      "Medication management",
      "Monthly WhatsApp updates to family",
      "Bi-annual cognitive/mental health screening",
      "Blood work (full blood count, blood sugar check & urinalysis)",
      "24/7 emergency response line",
      "Caregiver family training included",
      "Invites to social gatherings",
    ],
    button: "Get Started",
    highlight: true, // This one is the "Best Plan"
  },
  {
    name: "Platinum Plan",
    planIcon: <OtherPlan />,
    price: "₦100,000",
    period: "/month",
    bestFor: "Full geriatric management for complex care needs",
    features: [
      "Everything in Gold, plus:",
      "Monthly Comprehensive Geriatric Assessment (CGA)",
      "Dedicated named care coordinator",
      "Quarterly specialist geriatrician telemedicine consultations",
      "Home sample collection lab tests (2 panels/year)",
      "Dementia/memory screening with structured care pathway",
      "Monthly family video briefings",
      "Priority emergency hospitalisation coordination",
      "Personalised nutrition & exercise plan",
      "Monthly psychosocial wellness check",
      "Caregiver family counselling (2 sessions/year)",
    ],
    button: "Get Started",
    highlight: false,
  },
];


