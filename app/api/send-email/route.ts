import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS?.replace(/\s/g, ''), // Remove any spaces from app password
  },
  // Additional configuration for better reliability
  tls: {
    rejectUnauthorized: false
  }
};

// Your email address where you want to receive messages
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // Verify transporter configuration
    await transporter.verify();

    // Verify transporter configuration
    await transporter.verify();

    // Email content for you (notification)
    const notificationEmailOptions = {
      from: `"NANDHA Portfolio Contact" <${EMAIL_CONFIG.auth.user}>`,
      to: RECIPIENT_EMAIL,
      subject: `New Contact Form Message: ${subject}`,
      attachments: [
        {
          filename: 'nandha-logo.jpg',
          path: process.cwd() + '/public/name.jpg',
          cid: 'nandha-logo'
        }
      ],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <img src="cid:nandha-logo" alt="NANDHA Logo" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;" />
            <h2 style="color: white; margin: 0; text-align: center;">New Contact Form Message</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Contact Details</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
              <h3 style="margin: 0 0 15px 0; color: #333;">Message</h3>
              <div style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 25px; padding: 15px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: white; font-size: 14px;">
                Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <p style="margin: 5px 0; color: #666; font-size: 12px;">This message was sent from NANDHA's portfolio contact form</p>
            <p style="margin: 0; color: #888; font-size: 11px;">Visit: https://nandha-portfolio.vercel.app</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    };

    // Auto-reply email for the sender
    const autoReplyOptions = {
      from: `"NANDHA Portfolio" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: `Thank you for contacting NANDHA - ${subject}`,
      attachments: [
        {
          filename: 'nandha-logo.jpg',
          path: process.cwd() + '/public/name.jpg',
          cid: 'nandha-logo'
        }
      ],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <img src="cid:nandha-logo" alt="NANDHA Logo" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;" />
            <h2 style="color: white; margin: 0; text-align: center;">Thank You for Your Message!</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out! I've received your message regarding "<strong>${subject}</strong>" and I'll get back to you as soon as possible.
            </p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 5px;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Your Message Summary:</h3>
              <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0; color: #555;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              I typically respond within 24-48 hours. If your message is urgent, please feel free to send a follow-up email.
            </p>
            
            <div style="margin-top: 30px; text-align: center;">
              <div style="display: inline-block; padding: 15px 25px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 25px;">
                <p style="margin: 0; color: white; font-weight: bold;">Best regards,<br>NANDHA</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <img src="cid:nandha-logo" alt="NANDHA Logo" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;" />
            <p style="margin: 5px 0; color: #666; font-size: 12px;">This is an automated response from NANDHA's portfolio</p>
            <p style="margin: 0; color: #888; font-size: 11px;">Visit: https://nandha-portfolio.vercel.app</p>
          </div>
        </div>
      `,
    };

    // Send notification email to you
    await transporter.sendMail(notificationEmailOptions);
    
    // Send auto-reply to sender
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    // Return specific error messages for debugging
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          { error: 'Email authentication failed. Please check your email credentials.' },
          { status: 500 }
        );
      }
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Unable to connect to email server. Please check your network connection.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}