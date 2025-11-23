import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { stripe } from '@/lib/stripe';

/**
 * GET /api/stripe/get-invoice
 * Retrieves the invoice URL for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Verify authentication
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json(
        { error: 'You need to be logged in to view invoices' },
        { status: 401 },
      );
    }

    // Check if user has an invoice
    if (!user.stripeInvoiceId) {
      return NextResponse.json(
        { error: 'No invoice found for your account' },
        { status: 404 },
      );
    }

    // Retrieve the invoice from Stripe to get the latest information
    const invoice = await stripe.invoices.retrieve(user.stripeInvoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found in Stripe' },
        { status: 404 },
      );
    }

    // Return invoice information
    return NextResponse.json({
      invoiceId: invoice.id,
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      status: invoice.status,
      amountPaid: invoice.amount_paid / 100, // Convert from cents to euros
      currency: invoice.currency,
      created: new Date(invoice.created * 1000).toISOString(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to retrieve invoice';
    console.error('Error retrieving invoice:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

