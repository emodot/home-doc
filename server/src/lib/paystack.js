const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify";

export class PaymentVerificationError extends Error {}

export async function verifyPaystackTransaction(reference) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured");
  }

  const response = await fetch(`${PAYSTACK_VERIFY_URL}/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok || !body?.status) {
    throw new PaymentVerificationError(body?.message || "Unable to verify payment with Paystack");
  }

  const transaction = body.data;
  if (transaction.status !== "success") {
    throw new PaymentVerificationError(`Payment was not successful (status: ${transaction.status})`);
  }

  return {
    amount: transaction.amount,
    currency: transaction.currency,
    reference: transaction.reference,
  };
}
