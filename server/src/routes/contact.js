import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { sendContactEmails } from "../lib/email.js";
import { contactSchema } from "../validation/schemas.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { firstName, lastName, emailAddress, phoneNumber, message } = parsed.data;

  try {
    const submission = await prisma.contactSubmission.create({
      data: { firstName, lastName, email: emailAddress, phoneNumber, message },
    });

    await sendContactEmails({
      name: `${firstName} ${lastName}`,
      email: emailAddress,
      message,
    }).catch((error) => {
      console.error("Failed to send contact emails:", error);
    });

    return res.status(201).json({ data: submission });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return res.status(500).json({ error: "Failed to save contact submission" });
  }
});
