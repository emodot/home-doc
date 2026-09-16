import { Router } from "express";
import { prisma } from "../lib/prisma.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (req, res) => {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return res.json({ data: services });
});
