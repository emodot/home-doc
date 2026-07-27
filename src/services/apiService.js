const API_URL = process.env.REACT_APP_API_URL;

async function postJSON(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || `HTTP error! status: ${response.status}`);
  }

  return result;
}

/**
 * Submit a care request after a successful Paystack payment.
 * The backend independently verifies the payment with Paystack before saving.
 * @param {Object} requestData - The request data from localStorage
 * @param {string} paymentReference - Paystack payment reference
 * @returns {Promise<Object>} - Result of the submit operation
 */
export const saveCareRequest = async (requestData, paymentReference) => {
  try {
    const { personalDetails, personalInfo, beneficiaryInfo, plan, requestFor } = requestData;

    const payload = {
      requestFor,
      plan,
      paymentReference,
      ...(requestFor === "For myself"
        ? { personalDetails }
        : { personalInfo, beneficiaryInfo }),
    };

    const result = await postJSON("/api/care-requests", payload);

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error saving care request:", error);
    return { success: false, error: error.message || "Failed to save care request" };
  }
};

/**
 * Submit a contact form.
 * @param {Object} formData - Contact form data with firstName, lastName, emailAddress, phoneNumber, message
 * @returns {Promise<Object>} - Result of the submit operation
 */
export const saveContactForm = async (formData) => {
  try {
    const result = await postJSON("/api/contact", formData);

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error saving contact form:", error);
    return { success: false, error: error.message || "Failed to submit contact form" };
  }
};
