import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

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
