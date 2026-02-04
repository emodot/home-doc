# Supabase Setup Guide

This guide will help you set up your Supabase database tables for the Home Doc application.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Get your project URL and anon key from Settings > API

## Environment Variables

Add the following to your `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

## Database Tables

### 1. `care_requests` Table

This table stores care requests after successful payment.

**SQL to create the table:**

```sql
CREATE TABLE care_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_type TEXT NOT NULL, -- "For myself" or "Requesting for an elderly one"
  plan_name TEXT NOT NULL,
  payment_reference TEXT UNIQUE NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'success', 'failed'
  payment_verified BOOLEAN DEFAULT FALSE,
  payment_verified_at TIMESTAMPTZ,
  payment_amount BIGINT NOT NULL, -- Amount in kobo (smallest currency unit)
  payment_currency TEXT DEFAULT 'NGN',
  personal_details JSONB, -- For "For myself" requests
  personal_info JSONB, -- For "Requesting for an elderly one" requests
  beneficiary_info JSONB, -- Array of beneficiaries for "Requesting for an elderly one"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on payment_reference for faster lookups
CREATE INDEX idx_care_requests_payment_reference ON care_requests(payment_reference);

-- Create index on created_at for sorting
CREATE INDEX idx_care_requests_created_at ON care_requests(created_at DESC);
```

**Table Structure:**

- `personal_details` (JSONB) - Contains:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phoneNumber": "string",
    "age": "string",
    "gender": "string",
    "address": "string",
    "state": "string",
    "lga": "string"
  }
  ```

- `personal_info` (JSONB) - Contains:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phoneNumber": "string"
  }
  ```

- `beneficiary_info` (JSONB) - Array of:
  ```json
  [
    {
      "firstName": "string",
      "lastName": "string",
      "phoneNumber": "string",
      "age": "string",
      "gender": "string",
      "relationship": "string",
      "address": "string",
      "state": "string",
      "lga": "string"
    }
  ]
  ```

### 2. `contact_submissions` Table

This table stores contact form submissions.

**SQL to create the table:**

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on created_at for sorting
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Create index on email for lookups
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
```

## Row Level Security (RLS)

For security, enable Row Level Security on both tables:

```sql
-- Enable RLS on care_requests
ALTER TABLE care_requests ENABLE ROW LEVEL SECURITY;

-- Allow inserts (for saving requests)
CREATE POLICY "Allow inserts on care_requests" ON care_requests
  FOR INSERT
  WITH CHECK (true);

-- Allow updates (for payment verification)
CREATE POLICY "Allow updates on care_requests" ON care_requests
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Enable RLS on contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts (for contact form submissions)
CREATE POLICY "Allow inserts on contact_submissions" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);
```

## Testing

After setting up the tables:

1. Fill out a care request form and complete payment
2. Check the `care_requests` table in Supabase to verify the data was saved
3. Submit a contact form
4. Check the `contact_submissions` table in Supabase to verify the data was saved

## Notes

- Payment amounts are stored in kobo (smallest currency unit) - divide by 100 to get Naira
- All timestamps are stored in UTC
- The `payment_reference` field is unique to prevent duplicate entries
- Consider adding email notifications using Supabase Edge Functions for new submissions
