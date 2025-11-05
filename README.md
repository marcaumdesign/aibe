<p align="center">
  <a href="https://alignui.com">
    <img src="./public/images/logo.svg" height="96">
    <h3 align="center">AlignUI Design System</h3>
  </a>
  <p align="center">The Design System You Need</p>
</p>

[Join the AlignUI Community](https://discord.gg/alignui)

# AlignUI Starter Template with Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🔸 Includes all styles
- 🔸 Ready-to-use Tailwind setup
- 🔸 All base components included
- 🔸 All utils included
- 🔸 Inter font setup
- 🔸 Dark mode toggle included
- 🔸 Email + password authentication with Better Auth
- 🔸 Prisma ORM configured with SQLite

## Authentication

This starter ships with [Better Auth](https://better-auth.com) wired up for email + password flows:

- `auth.ts` defines the Better Auth instance using the Prisma adapter.
- `app/api/auth/[...all]/route.ts` exposes the auth handlers for Next.js App Router routes.
- Sign-in and sign-up pages live in `app/sign-in/page.tsx` and `app/sign-up/page.tsx`, respectively.

The setup supports session management via the `Session` model and links to additional identity providers through the `Account` model. Extend `auth.ts` to add OAuth providers, password reset logic, or custom flows.

## Database & ORM

Prisma handles all database access with a SQLite datasource (`prisma/schema.prisma`):

- Generated Prisma Client is output to `lib/generated/prisma`.
- `lib/prisma.ts` ensures a singleton Prisma Client across serverless hot reloads.
- The default `.env.local` points `DATABASE_URL` to `file:./prisma/sqlite.db`; update it if you switch databases.

Use Prisma CLI commands via `pnpm prisma` for schema updates, migrations, and seeding.

## Step-by-Step Setup

1. **Install dependencies**

```bash
pnpm i
```

2. **Configure environment variables**

   Copy `.env` → `.env.local` and adjust secrets as needed. Ensure `DATABASE_URL` reflects your SQLite file (default `file:./prisma/sqlite.db`).

3. **Prepare the database**

```bash
pnpm prisma db push
pnpm prisma generate
```

4. **Run the development server**

```bash
pnpm dev
```

5. **Visit the app**

   Open [http://localhost:3000](http://localhost:3000) to access the sign-in and sign-up flows backed by Better Auth and Prisma.
