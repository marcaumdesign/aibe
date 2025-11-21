import type { PayloadHandler } from 'payload';

/**
 * Job to expire memberships that have passed their expiration date
 * Should be run daily via Vercel Cron
 */
export const expireMemberships: PayloadHandler = async ({ payload }) => {
  try {
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

    console.log(`Found ${expiredUsers.docs.length} expired memberships to process`);

    // Update each expired membership
    for (const user of expiredUsers.docs) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          subscriptionPlan: 'free',
          subscriptionStatus: 'canceled',
        },
      });

      console.log(`Expired membership for user ${user.id} (${user.email})`);
    }

    return {
      success: true,
      message: `Processed ${expiredUsers.docs.length} expired memberships`,
    };
  } catch (error) {
    console.error('Error expiring memberships:', error);
    throw error;
  }
};

