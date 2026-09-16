import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const plansRouter = Router();

plansRouter.get("/", async (req, res) => {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return res.json({ data: plans });
});
