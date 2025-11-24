import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 },
      );
    }

    // Get Payload instance
    const payload = await getPayload({ config });

    // Send email to AIBE
    await payload.sendEmail({
      to: 'aibe@aibe.website',
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .info-card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .info-row {
                display: flex;
                flex-direction: column;
                padding: 12px 0;
                border-bottom: 1px solid #e9ecef;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: 600;
                color: #495057;
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 4px;
              }
              .value {
                color: #212529;
                font-size: 16px;
              }
              .message-box {
                background: #e7f3ff;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #0066cc;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #6c757d;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <div class="info-card">
                <h2 style="margin-top: 0; color: #667eea;">Contact Information</h2>
                
                <div class="info-row">
                  <span class="label">Name</span>
                  <span class="value">${firstName} ${lastName}</span>
                </div>
                
                <div class="info-row">
                  <span class="label">Email</span>
                  <span class="value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></span>
                </div>
                
                ${
                  phone
                    ? `
                <div class="info-row">
                  <span class="label">Phone</span>
                  <span class="value"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></span>
                </div>
                `
                    : ''
                }
              </div>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: #0066cc;">Message</h3>
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div class="footer">
              <p>
                This is an automated notification from AIBE Contact Form<br>
                Italian-Brazilian Economics Association
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log(
      `✅ Contact form email sent to aibe@aibe.website from: ${firstName} ${lastName} (${email})`,
    );

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('❌ Failed to send contact form email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 },
    );
  }
}

