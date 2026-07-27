import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
}

function sendMail(options) {
  return getTransporter().sendMail({
    from: `"Home Doc" <${process.env.EMAIL_USER}>`,
    ...options,
  });
}

export async function sendCareRequestEmails({ requesterEmail, requesterName, planName, isForSelf, beneficiaryNames, reference }) {
  const who = isForSelf ? "yourself" : beneficiaryNames.join(", ");

  await sendMail({
    to: requesterEmail,
    subject: "We've received your Home Doc care request",
    html: `
      <p>Hi ${requesterName},</p>
      <p>Thanks for requesting the <strong>${planName}</strong> with Home Doc for <strong>${who}</strong>.</p>
      <p>Your payment (reference <strong>${reference}</strong>) has been confirmed and our team will be in touch shortly to coordinate care.</p>
      <p>&mdash; The Home Doc Team</p>
    `,
  });

  await sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: `New care request: ${planName}`,
    html: `
      <p>New paid care request submitted.</p>
      <ul>
        <li><strong>Plan:</strong> ${planName}</li>
        <li><strong>Requester:</strong> ${requesterName} (${requesterEmail})</li>
        <li><strong>Care for:</strong> ${who}</li>
        <li><strong>Payment reference:</strong> ${reference}</li>
      </ul>
    `,
  });
}

export async function sendContactEmails({ name, email, message }) {
  await sendMail({
    to: email,
    subject: "We've received your message — Home Doc",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to Home Doc. We've received your message and will get back to you within 24 hours.</p>
      <p>&mdash; The Home Doc Team</p>
    `,
  });

  await sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: `New contact form submission from ${name}`,
    html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
}
