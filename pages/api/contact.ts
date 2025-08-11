import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { sanitizeText, isSpamLike } from '@/lib/sanitize';

type ContactData = {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Debug: Check if environment variables are set
  console.log('Email config check:', {
    hasUser: !!process.env.EMAIL_USER,
    hasPass: !!process.env.EMAIL_PASS,
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length
  });

  try {
    const { name, email, message, honeypot }: ContactData = req.body;

    // Basic validation
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    // Honeypot check
    if (honeypot) {
      return res.status(200).json({ success: true }); // Pretend success for bots
    }

    // Spam check
    if (isSpamLike(message)) {
      return res.status(400).json({ error: 'Message contains suspicious content' });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeText(name, 100);
    const sanitizedEmail = email ? sanitizeText(email, 100) : '';
    const sanitizedMessage = sanitizeText(message, 1000);

    // Validate email format if provided
    if (sanitizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'ronaballoonb@gmail.com',
        pass: (process.env.EMAIL_PASS || '').replace(/\s/g, ''), // Remove spaces from app password
      },
      tls: {
        rejectUnauthorized: false
      },
      secure: true,
      port: 465
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'ronaballoonb@gmail.com',
      to: 'ronaballoonb@gmail.com',
      subject: `פנייה חדשה מאתר רון בלון - ${sanitizedName}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">פנייה חדשה מאתר רון בלון</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>שם:</strong> ${sanitizedName}</p>
            ${sanitizedEmail ? `<p><strong>אימייל:</strong> ${sanitizedEmail}</p>` : ''}
            <p><strong>הודעה:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-right: 4px solid #007bff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">נשלח ב-${new Date().toLocaleString('he-IL')}</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Email authentication failed. Please check your app password.';
      } else if (error.message.includes('Username and Password not accepted')) {
        errorMessage = 'Email credentials are incorrect. Please verify your email and app password.';
      } else if (error.message.includes('Connection timeout')) {
        errorMessage = 'Connection timeout. Please try again.';
      } else {
        errorMessage = `Email error: ${error.message}`;
      }
    }
    
    res.status(500).json({ error: errorMessage });
  }
}
