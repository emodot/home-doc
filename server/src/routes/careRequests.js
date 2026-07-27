import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { PLAN_PRICES_KOBO } from "../lib/plans.js";
import { verifyPaystackTransaction, PaymentVerificationError } from "../lib/paystack.js";
import { sendCareRequestEmails } from "../lib/email.js";
import { careRequestSchema } from "../validation/schemas.js";

export const careRequestsRouter = Router();

careRequestsRouter.post("/", async (req, res) => {
  const parsed = careRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { requestFor, plan, paymentReference, personalDetails, personalInfo, beneficiaryInfo } = parsed.data;
  const isForSelf = requestFor === "For myself";

  const expectedAmount = PLAN_PRICES_KOBO[plan];
  if (!expectedAmount) {
    return res.status(400).json({ error: `Unknown plan: ${plan}` });
  }

  let verifiedPayment;
  try {
    verifiedPayment = await verifyPaystackTransaction(paymentReference);
  } catch (error) {
    if (error instanceof PaymentVerificationError) {
      return res.status(402).json({ error: error.message });
    }
    console.error("Paystack verification failed:", error);
    return res.status(502).json({ error: "Unable to verify payment" });
  }

  if (verifiedPayment.amount !== expectedAmount) {
    return res.status(402).json({ error: "Paid amount does not match the selected plan" });
  }

  try {
    const requesterData = isForSelf
      ? { ...personalDetails }
      : { ...personalInfo };

    const careRequest = await prisma.$transaction(async (tx) => {
      const requester = await tx.requester.create({ data: requesterData });

      return tx.careRequest.create({
        data: {
          isForSelf,
          planName: plan,
          paymentReference,
          paymentStatus: "success",
          paymentAmount: verifiedPayment.amount,
          paymentCurrency: verifiedPayment.currency,
          requesterId: requester.id,
          ...(isForSelf
            ? {}
            : { beneficiaries: { create: beneficiaryInfo } }),
        },
        include: { requester: true, beneficiaries: true },
      });
    });

    const beneficiaryNames = isForSelf
      ? []
      : careRequest.beneficiaries.map((b) => `${b.firstName} ${b.lastName}`);

    await sendCareRequestEmails({
      requesterEmail: careRequest.requester.email,
      requesterName: `${careRequest.requester.firstName} ${careRequest.requester.lastName}`,
      planName: plan,
      isForSelf,
      beneficiaryNames,
      reference: paymentReference,
    }).catch((error) => {
      console.error("Failed to send care request emails:", error);
    });

    return res.status(201).json({ data: careRequest });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "This payment reference has already been submitted" });
    }
    console.error("Failed to save care request:", error);
    return res.status(500).json({ error: "Failed to save care request" });
  }
});
