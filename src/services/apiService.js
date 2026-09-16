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

async function adminRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(result.error || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return result;
}

export const adminLogin = (username, password) =>
  adminRequest("/api/admin/login", { method: "POST", body: JSON.stringify({ username, password }) });

export const adminLogout = () => adminRequest("/api/admin/logout", { method: "POST" });

export const getAdminSession = () => adminRequest("/api/admin/me");

export const changeAdminPassword = (currentPassword, newPassword) =>
  adminRequest("/api/admin/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });

export const fetchCareRequests = () => adminRequest("/api/admin/care-requests");

export const fetchContactSubmissions = () => adminRequest("/api/admin/contact-submissions");

export const fetchOverview = () => adminRequest("/api/admin/overview");

export const deleteContactSubmission = (id) =>
  adminRequest(`/api/admin/contact-submissions/${id}`, { method: "DELETE" });

export const fetchAdminPlans = () => adminRequest("/api/admin/plans");

export const createPlan = (plan) =>
  adminRequest("/api/admin/plans", { method: "POST", body: JSON.stringify(plan) });

export const updatePlan = (id, plan) =>
  adminRequest(`/api/admin/plans/${id}`, { method: "PATCH", body: JSON.stringify(plan) });

export const deletePlan = (id) => adminRequest(`/api/admin/plans/${id}`, { method: "DELETE" });

/**
 * Fetch the publicly visible pricing plans.
 * @returns {Promise<Array>} - Active plans, ordered for display
 */
export const fetchPlans = async () => {
  const response = await fetch(`${API_URL}/api/plans`);
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || `HTTP error! status: ${response.status}`);
  }

  return result.data;
};

/**
 * Fetch the publicly visible one-time services.
 * @returns {Promise<Array>} - Active services, ordered for display
 */
export const fetchServices = async () => {
  const response = await fetch(`${API_URL}/api/services`);
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || `HTTP error! status: ${response.status}`);
  }

  return result.data;
};

export const fetchAdminServices = () => adminRequest("/api/admin/services");

export const createService = (service) =>
  adminRequest("/api/admin/services", { method: "POST", body: JSON.stringify(service) });

export const updateService = (id, service) =>
  adminRequest(`/api/admin/services/${id}`, { method: "PATCH", body: JSON.stringify(service) });

export const deleteService = (id) =>
  adminRequest(`/api/admin/services/${id}`, { method: "DELETE" });

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
