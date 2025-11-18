# Paid Feature Implementation Plan

This document breaks the remaining work into focused workstreams so you can ship a gated, paid experience backed by Better Auth, Payload CMS, and Stripe. Each section lists concrete actions and references to the parts of the codebase they touch.

## 1. Better Auth Hardening
- Audit the auth instance in `auth.ts` and the API route handlers in `app/api/auth/[...all]/route.ts` to ensure session persistence, error propagation, and redirect handling are aligned with Better Auth docs.
- Confirm all required environment variables are defined for every environment (`BETTER_AUTH_SECRET`, `DATABASE_URL`, email settings, etc.) and document them in `.env.example`.
- Add server-side guards around protected routes in `app/(...)` layouts/middleware so unauthenticated users are redirected before page render.
- Create Vitest/Playwright smoke tests that cover: successful sign-in, invalid credential messaging, logout flow, and accessing a protected article as an anonymous user (should redirect to sign-in).
- Log and surface auth errors (e.g., toast or inline message) instead of silent failures; wire Sentry/logging hooks where available.

## 2. Entitlement & Paywall Model
- Extend the Prisma `User` model (`prisma/schema.prisma`) with fields such as `plan`, `stripeCustomerId`, `stripeSubscriptionId`, `subscriptionStatus`, and `accessExpiresAt`; run migrations and regenerate the client.
- Mirror these entitlement fields inside the Payload `users` collection (`collections/Users/index.ts`) so editorial tooling can see the user’s current tier. Lock down write access to system hooks only.
- Update `collections/Posts/index.ts` to include a `paywallLevel` (enum: `free`, `premium`, `founders`, etc.) plus any teaser content fields needed for previews.
- Introduce server utilities (e.g., `lib/entitlements.ts`) that resolve the active user’s access level from the session + Stripe sync data.
- Add middleware to `app/(site)/posts/[slug]/page.tsx` (or shared loader) that checks entitlements and either renders the post, truncates at a teaser boundary, or returns a paywall component with an upgrade CTA.

## 3. Stripe Integration
- In Stripe Dashboard, create Products/Prices for the intended subscription tiers and capture their IDs in env vars (`STRIPE_PRICE_PREMIUM`, etc.).
- Build backend endpoints in `app/api/stripe/create-checkout-session/route.ts` and `app/api/stripe/create-portal-session/route.ts` that validate the Better Auth session, attach/create a Stripe Customer using `stripeCustomerId`, and redirect to Checkout/Billing Portal.
- Implement webhooks under `app/api/stripe/webhook/route.ts` with signature verification. Handle `checkout.session.completed`, `customer.subscription.updated`, `invoice.payment_failed`, and `customer.subscription.deleted` to keep Prisma + Payload in sync.
- On webhook events, update the user’s subscription fields (plan, status, current period end) inside Prisma and optionally mirror critical bits in Payload via its REST API if needed for CMS-driven rendering.
- Provide a recovery job/script to resync entitlements from Stripe (`stripe subscriptions list`) in case of missed events.

## 4. CMS & Content Operations
- Update the Payload admin UI to surface the new `paywallLevel` field for editors and add validation so premium tiers can’t accidentally publish without the field set.
- Create a lightweight guideline doc for content creators explaining how to choose a tier, what teaser text to fill out, and the review process before publishing premium posts.
- If certain globals (e.g., `Header` or `Footer`) need paywalled CTAs, expose configurable links/labels in `Header/config.ts` so marketing can adjust without code changes.

## 5. Frontend Experience
- Add a dedicated pricing/upgrade page under `app/(marketing)/pricing/page.tsx` that lists the tiers, features, and includes Checkout buttons wired to the new API routes.
- Implement a reusable `PaywallDialog` or `UpgradeBanner` component in `components/` that appears when access is denied; ensure it gracefully handles both logged-out and logged-in-but-unsubscribed states.
- After successful checkout, handle the redirect in `app/api/stripe/success/route.ts` (or a `/success` page) to revalidate the user session and show confirmation messaging; include error fallback for canceled payments.
- Provide a user settings/subscription page (e.g., `app/(dashboard)/account/page.tsx`) where subscribers can see their plan status, renewal date, and access the Stripe Billing Portal.
- Ensure skeleton states and optimistic UI account for the delay between webhook completion and UI revalidation (e.g., poll or re-fetch session data after checkout).

## 6. Testing & Quality Assurance
- Unit-test entitlement helper utilities and paywall components (e.g., ensure `premium` posts throw when accessed by `free` users).
- Write end-to-end tests (Playwright/Cypress) covering: anonymous user hitting premium article → sees paywall; subscriber hitting same article → sees content; subscription cancellation → loses access after webhook simulation.
- Add webhook replay tests or scripts to validate signature verification and payload parsing using Stripe CLI fixtures.
- Include regression tests around Better Auth session expiration to ensure gated pages prompt for re-authentication rather than throwing runtime errors.

## 7. Deployment, Monitoring, and Ops
- Document all required secrets (`BETTER_AUTH_SECRET`, `PAYLOAD_SECRET`, `POSTGRES_URL`, `STRIPE_SECRET_KEY`, webhook secret, price IDs) and ensure they are set in Vercel/hosting environments.
- Configure Stripe CLI or dashboard alerts for failed webhooks, payment failures, and disputed charges; route them to the team’s incident channel.
- Add logging around key flows (auth failures, paywall denials, webhook updates) and expose dashboards/metrics where possible.
- Create a runbook describing how to manually grant access, refund a user, replay webhooks, or rotate Stripe keys.
- Before launch, run a full Stripe test-mode simulation (sign-up → checkout → read premium post → cancel) and capture the steps/results in QA notes.

## 8. Documentation & Handoff
- Update `README.md` (or create `/docs/auth.md`, `/docs/payments.md`) with instructions for setting up Better Auth, running Stripe webhooks locally, and managing premium content.
- Record any CMS migrations or manual steps (adding new fields, running scripts) so future teammates can reproduce the setup in new environments.
- Outline future enhancements (gift links, metered paywall, analytics) but keep this document focused on the must-haves listed above.
