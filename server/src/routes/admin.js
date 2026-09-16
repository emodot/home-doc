import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get("/overview", async (req, res) => {
  const [careRequestCount, contactCount, planCount, revenue, recentRequests] = await Promise.all([
    prisma.careRequest.count(),
    prisma.contactSubmission.count(),
    prisma.plan.count({ where: { isActive: true } }),
    prisma.careRequest.aggregate({ _sum: { paymentAmount: true } }),
    prisma.careRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { requester: true, beneficiaries: true },
    }),
  ]);

  const planBreakdown = await prisma.careRequest.groupBy({
    by: ["planName"],
    _count: { planName: true },
  });

  return res.json({
    data: {
      careRequestCount,
      contactCount,
      planCount,
      totalRevenueKobo: revenue._sum.paymentAmount || 0,
      planBreakdown: planBreakdown.map((row) => ({
        planName: row.planName,
        count: row._count.planName,
      })),
      recentRequests,
    },
  });
});

adminRouter.get("/care-requests", async (req, res) => {
  const careRequests = await prisma.careRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { requester: true, beneficiaries: true },
  });
  return res.json({ data: careRequests });
});

adminRouter.get("/contact-submissions", async (req, res) => {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.json({ data: submissions });
});

adminRouter.delete("/contact-submissions/:id", async (req, res) => {
  try {
    await prisma.contactSubmission.delete({ where: { id: req.params.id } });
    return res.json({ data: { deleted: true } });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Contact submission not found" });
    }
    console.error("Failed to delete contact submission:", error);
    return res.status(500).json({ error: "Failed to delete contact submission" });
  }
});

const planSchema = z.object({
  name: z.string().min(1),
  priceKobo: z.number().int().positive(),
  period: z.string().min(1).optional(),
  bestFor: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  icon: z.enum(["other", "premium"]).optional(),
  highlight: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

adminRouter.get("/plans", async (req, res) => {
  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });
  return res.json({ data: plans });
});

adminRouter.post("/plans", async (req, res) => {
  const parsed = planSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid plan", details: parsed.error.flatten() });
  }

  try {
    const plan = await prisma.plan.create({ data: parsed.data });
    return res.status(201).json({ data: plan });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A plan with that name already exists" });
    }
    console.error("Failed to create plan:", error);
    return res.status(500).json({ error: "Failed to create plan" });
  }
});

adminRouter.patch("/plans/:id", async (req, res) => {
  const parsed = planSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid plan", details: parsed.error.flatten() });
  }

  try {
    const plan = await prisma.plan.update({ where: { id: req.params.id }, data: parsed.data });
    return res.json({ data: plan });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Plan not found" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A plan with that name already exists" });
    }
    console.error("Failed to update plan:", error);
    return res.status(500).json({ error: "Failed to update plan" });
  }
});

adminRouter.delete("/plans/:id", async (req, res) => {
  try {
    await prisma.plan.delete({ where: { id: req.params.id } });
    return res.json({ data: { deleted: true } });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Plan not found" });
    }
    console.error("Failed to delete plan:", error);
    return res.status(500).json({ error: "Failed to delete plan" });
  }
});

const serviceSchema = z.object({
  name: z.string().min(1),
  priceKobo: z.number().int().positive(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

adminRouter.get("/services", async (req, res) => {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return res.json({ data: services });
});

adminRouter.post("/services", async (req, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid service", details: parsed.error.flatten() });
  }

  try {
    const service = await prisma.service.create({ data: parsed.data });
    return res.status(201).json({ data: service });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A service with that name already exists" });
    }
    console.error("Failed to create service:", error);
    return res.status(500).json({ error: "Failed to create service" });
  }
});

adminRouter.patch("/services/:id", async (req, res) => {
  const parsed = serviceSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid service", details: parsed.error.flatten() });
  }

  try {
    const service = await prisma.service.update({ where: { id: req.params.id }, data: parsed.data });
    return res.json({ data: service });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Service not found" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "A service with that name already exists" });
    }
    console.error("Failed to update service:", error);
    return res.status(500).json({ error: "Failed to update service" });
  }
});

adminRouter.delete("/services/:id", async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    return res.json({ data: { deleted: true } });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Service not found" });
    }
    console.error("Failed to delete service:", error);
    return res.status(500).json({ error: "Failed to delete service" });
  }
});
