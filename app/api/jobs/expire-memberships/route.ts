import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * API endpoint for Vercel Cron to expire memberships
 * This endpoint should be called daily via Vercel Cron
 */
export async function GET(req: NextRequest) {
  try {
    // Verify the request is coming from Vercel Cron
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await getPayload({ config });
    const now = new Date().toISOString();

    // Find all users with active memberships that have expired
    const expiredUsers = await payload.find({
      collection: 'users',
      where: {
        and: [
          {
            subscriptionStatus: {
              equals: 'active',
            },
          },
          {
            subscriptionCurrentPeriodEnd: {
              less_than: now,
            },
          },
        ],
      },
      limit: 1000, // Process up to 1000 users per run
    });

    console.log(
      `Found ${expiredUsers.docs.length} expired memberships to process`,
    );

    // Update each expired membership
    let processedCount = 0;
    for (const user of expiredUsers.docs) {
      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            subscriptionPlan: 'free',
            subscriptionStatus: 'canceled',
          },
        });

        console.log(`Expired membership for user ${user.id} (${user.email})`);
        processedCount++;
      } catch (error) {
        console.error(`Error expiring membership for user ${user.id}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${processedCount} expired memberships`,
      total: expiredUsers.docs.length,
    });
  } catch (error) {
    console.error('Error in expire-memberships job:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
