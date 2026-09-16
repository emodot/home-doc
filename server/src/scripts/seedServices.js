import "dotenv/config";
import { prisma } from "../lib/prisma.js";

const SERVICES = [
  { name: "Virtual Consultation (per session)", priceKobo: 1_000_000, sortOrder: 1 },
  { name: "At-Home Visit (per session)", priceKobo: 2_000_000, sortOrder: 2 },
  { name: "Preliminary Health Check", priceKobo: 1_500_000, sortOrder: 3 },
  { name: "Companion Visit (2 hrs)", priceKobo: 1_200_000, sortOrder: 4 },
  { name: "Medication Drop-Off (per trip)", priceKobo: 500_000, sortOrder: 5 },
];

async function main() {
  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { name: service.name },
      update: {},
      create: service,
    });
  }
  console.log(`Services seeded. Total services in database: ${await prisma.service.count()}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
