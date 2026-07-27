import { z } from "zod";

const personalDetailsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  age: z.string().min(1),
  gender: z.string().min(1),
  address: z.string().min(1),
  state: z.string().min(1),
  lga: z.string().min(1),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
});

const beneficiarySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  age: z.string().min(1),
  gender: z.string().min(1),
  relationship: z.string().min(1),
  address: z.string().min(1),
  state: z.string().min(1),
  lga: z.string().min(1),
});

export const careRequestSchema = z
  .object({
    requestFor: z.enum(["For myself", "Requesting for an elderly one"]),
    plan: z.string().min(1),
    paymentReference: z.string().min(1),
    personalDetails: personalDetailsSchema.optional(),
    personalInfo: personalInfoSchema.optional(),
    beneficiaryInfo: z.array(beneficiarySchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.requestFor === "For myself" && !data.personalDetails) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "personalDetails is required for 'For myself' requests", path: ["personalDetails"] });
    }
    if (data.requestFor === "Requesting for an elderly one") {
      if (!data.personalInfo) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "personalInfo is required", path: ["personalInfo"] });
      }
      if (!data.beneficiaryInfo || data.beneficiaryInfo.length === 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "At least one beneficiary is required", path: ["beneficiaryInfo"] });
      }
    }
  });

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(1),
  message: z.string().min(1),
});
