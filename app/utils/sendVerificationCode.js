import resend from '../config/resend.js';

export async function sendVerificationCode(email, code) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Email will not be sent.');
    throw new Error('Email service not configured');
  }

  try {
    const resp = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Email Verification',
      html: `
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1>${code}</h1>
        <p>This code expires in 2 minutes.</p>
      `,
    });

    console.log('Verification email sent (resend):', { to: email, resp });
    try {
      console.log('Full resend response:', JSON.stringify(resp, null, 2));
    } catch (e) {
      console.log('Full resend response (raw):', resp);
    }
    return resp;
  } catch (err) {
    console.error('Failed to send verification email:', err);
    throw err;
  }
}
