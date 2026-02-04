import { supabase } from '../lib/supabase';

/**
 * Save a care request to Supabase after successful payment
 * @param {Object} requestData - The request data from localStorage
 * @param {Object} paymentData - Payment information from Paystack
 * @returns {Promise<Object>} - Result of the insert operation
 */
export const saveCareRequest = async (requestData, paymentData) => {
  try {
    const { personalDetails, personalInfo, beneficiaryInfo, plan, requestFor } = requestData;
    
    // Prepare the data structure for Supabase
    const careRequestData = {
      request_type: requestFor, // "For myself" or "Requesting for an elderly one"
      plan_name: plan,
      payment_reference: paymentData.reference,
      payment_status: 'success',
      payment_amount: paymentData.amount,
      payment_currency: paymentData.currency || 'NGN',
      created_at: new Date().toISOString(),
    };

    // Add personal information based on request type
    if (requestFor === 'For myself') {
      careRequestData.personal_details = {
        firstName: personalDetails?.firstName,
        lastName: personalDetails?.lastName,
        email: personalDetails?.email,
        phoneNumber: personalDetails?.phoneNumber,
        age: personalDetails?.age,
        gender: personalDetails?.gender,
        address: personalDetails?.address,
        state: personalDetails?.state,
        lga: personalDetails?.lga,
      };
      careRequestData.beneficiary_info = null;
    } else {
      // For elderly one requests
      careRequestData.personal_info = {
        firstName: personalInfo?.firstName,
        lastName: personalInfo?.lastName,
        email: personalInfo?.email,
        phoneNumber: personalInfo?.phoneNumber,
      };
      careRequestData.beneficiary_info = beneficiaryInfo || [];
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('care_requests')
      .insert([careRequestData])
      .select();

    if (error) {
      console.error('Error saving care request:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in saveCareRequest:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update care request payment status after payment verification
 * @param {string} paymentReference - Paystack payment reference
 * @param {Object} paymentData - Updated payment information
 * @returns {Promise<Object>} - Result of the update operation
 */
export const updateCareRequestPayment = async (paymentReference, paymentData) => {
  try {
    const { data, error } = await supabase
      .from('care_requests')
      .update({
        payment_status: paymentData.status || 'success',
        payment_verified: true,
        payment_verified_at: new Date().toISOString(),
        payment_amount: paymentData.amount,
        payment_currency: paymentData.currency || 'NGN',
      })
      .eq('payment_reference', paymentReference)
      .select();

    if (error) {
      console.error('Error updating care request payment:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in updateCareRequestPayment:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Save a contact form submission to Supabase
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - Result of the insert operation
 */
export const saveContactForm = async (formData) => {
  try {
    const contactData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.emailAddress,
      phone_number: formData.phoneNumber,
      message: formData.message,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contactData])
      .select();

    if (error) {
      console.error('Error saving contact form:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in saveContactForm:', error);
    return { success: false, error: error.message };
  }
};
