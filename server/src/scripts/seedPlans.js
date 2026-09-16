import "dotenv/config";
import { prisma } from "../lib/prisma.js";

const PLANS = [
  {
    name: "Basic Plan",
    priceKobo: 1_000_000,
    bestFor: "Occasional check-ins and virtual support",
    icon: "other",
    highlight: false,
    sortOrder: 1,
    features: [
      "2 virtual consultations/month",
      "Drug/medication coordination",
      "Monthly WhatsApp briefing to family",
      "Invites to social gatherings",
    ],
  },
  {
    name: "Silver Plan",
    priceKobo: 3_000_000,
    bestFor: "Light support and regular check-ins",
    icon: "other",
    highlight: false,
    sortOrder: 2,
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
  },
  {
    name: "Gold Plan",
    priceKobo: 6_200_000,
    bestFor: "Frequent care with round-the-clock emergency support",
    icon: "premium",
    highlight: true,
    sortOrder: 3,
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
  },
  {
    name: "Platinum Plan",
    priceKobo: 10_000_000,
    bestFor: "Full geriatric management for complex care needs",
    icon: "other",
    highlight: false,
    sortOrder: 4,
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
  },
];

async function main() {
  for (const plan of PLANS) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: {},
      create: plan,
    });
  }
  const count = await prisma.plan.count();
  console.log(`Plans seeded. Total plans in database: ${count}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
