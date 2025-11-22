import { getPayload } from 'payload';
import config from '@payload-config';

interface MembershipNotificationData {
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  invoiceId?: string;
  invoiceUrl?: string;
  membershipEndDate: string;
}

/**
 * Sends a notification email to AIBE admin when a new membership is purchased
 */
export async function sendMembershipNotification(
  data: MembershipNotificationData,
) {
  try {
    const payload = await getPayload({ config });

    const {
      userName,
      userEmail,
      amount,
      currency,
      invoiceId,
      invoiceUrl,
      membershipEndDate,
    } = data;

    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);

    const formattedDate = new Date(membershipEndDate).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );

    // Send email to admin
    await payload.sendEmail({
      to: 'aibe@aibe.website',
      subject: `🎉 New AIBE Membership - ${userName}`,
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
                justify-content: space-between;
                padding: 12px 0;
                border-bottom: 1px solid #e9ecef;
              }
              .info-row:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: 600;
                color: #495057;
              }
              .value {
                color: #212529;
              }
              .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 10px 5px;
                font-weight: 500;
              }
              .footer {
                text-align: center;
                color: #6c757d;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
              }
              .amount {
                font-size: 32px;
                font-weight: bold;
                color: #28a745;
                text-align: center;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 New Membership Purchase!</h1>
            </div>
            
            <div class="content">
              <div class="amount">${formattedAmount}</div>
              
              <div class="info-card">
                <h2 style="margin-top: 0; color: #667eea;">Member Information</h2>
                
                <div class="info-row">
                  <span class="label">Name:</span>
                  <span class="value">${userName}</span>
                </div>
                
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value">${userEmail}</span>
                </div>
                
                <div class="info-row">
                  <span class="label">Membership Valid Until:</span>
                  <span class="value">${formattedDate}</span>
                </div>
                
                ${
                  invoiceId
                    ? `
                <div class="info-row">
                  <span class="label">Invoice ID:</span>
                  <span class="value">${invoiceId}</span>
                </div>
                `
                    : ''
                }
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                ${
                  invoiceUrl
                    ? `
                  <a href="${invoiceUrl}" class="button" style="color: white;">
                    📄 View Invoice
                  </a>
                `
                    : ''
                }
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL || 'https://aibe.website'}/admin/collections/users" class="button" style="color: white;">
                  👤 View User Profile
                </a>
              </div>
              
              <div class="info-card" style="background: #e7f3ff; border-left: 4px solid #0066cc;">
                <p style="margin: 0;">
                  <strong>💡 Next Steps:</strong><br>
                  The member has been automatically activated and can now access all premium content.
                  You can view their full profile in the admin dashboard.
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p>
                This is an automated notification from AIBE Platform<br>
                Italian-Brazilian Economics Association
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log(
      `✅ Membership notification sent to aibe@aibe.website for user: ${userName}`,
    );
  } catch (error) {
    console.error('❌ Failed to send membership notification:', error);
    // Don't throw - we don't want to fail the payment if email fails
  }
}
