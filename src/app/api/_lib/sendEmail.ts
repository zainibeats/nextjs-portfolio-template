import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(
  to: string,
  from: string,
  subject: string,
  text: string
) {
  try {
    await sgMail.send({
      to,
      from,
      subject,
      text,
      html: text.replace(/\n/g, '<br>')
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
} 