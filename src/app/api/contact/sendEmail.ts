import sgMail from '@sendgrid/mail';

export async function sendEmail(
  to: string,
  from: string,
  subject: string,
  text: string
) {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br>')}</p>`,
  };

  return sgMail.send(msg);
}