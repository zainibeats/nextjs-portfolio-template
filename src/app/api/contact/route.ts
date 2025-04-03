import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../_lib/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send to your email
    await sendEmail(
      process.env.ADMIN_EMAIL!, // Your receiving email
      process.env.SENDER_EMAIL!, // Verified sender email
      `New message from ${name}`,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    );

    // Send confirmation to user
    await sendEmail(
      email, // User's email
      process.env.SENDER_EMAIL!, // Verified sender email
      'Thank you for contacting me',
      `Hi ${name},\n\nThank you for reaching out! I'll respond shortly.\n\nBest regards,\nJohn Doe`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    );
  }
} 