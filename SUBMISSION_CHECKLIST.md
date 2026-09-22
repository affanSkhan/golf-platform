# Digital Heroes — Submission Checklist

## PRD coverage implemented

- Public, impact-first responsive website
- Monthly/yearly membership presentation and Stripe Checkout integration
- Supabase authentication and role boundaries
- Stableford score validation (1–45)
- One score per date with edit/delete
- Latest-five rolling score rule
- Charity directory, search/filter, selection and contribution percentage
- Random and score-frequency weighted algorithmic draw modes
- Simulation before publish
- 40% / 35% / 25% prize tiers
- Five-match jackpot rollover
- Equal prize splitting
- Winner proof upload with private storage design
- Admin users, draws, charities, winners and reporting surfaces
- Audit logging
- Unit tests for score and draw logic
- GitHub Actions test + build verification
- Responsive, motion-enhanced UI aligned with the PRD

## Infrastructure status

### Supabase — configured
- New Supabase project: `digital-heroes-golf-platform`
- Region: `ap-south-1`
- Project ref: `pgvopyvtumjzljqhsngl`
- Full initial schema, RLS, storage bucket and charity seed data applied
- Security hardening migrations applied
- Supabase security advisor currently returns no security findings

### Vercel — final deployment step
The PRD requires deployment to the newly connected Vercel account. The connected Vercel account is accessible, but the available deployment connector in this session does not expose a working project-create/deploy operation, so the repository is prepared for Vercel but the public Vercel URL and Vercel environment variables still need to be created in the Vercel dashboard.

Required Vercel environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_MONTHLY_PRICE_ID`
- `STRIPE_YEARLY_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`

## Current live staging

https://digital-heroes-golf-platform-8l0d.onrender.com

## Test checklist

1. Public homepage and responsive navigation
2. Signup/login
3. Active subscription gate
4. Monthly/yearly checkout
5. Five-score entry/edit/delete
6. Charity selection + contribution percentage
7. Draw preview/simulation
8. Draw publishing and prize allocation
9. Winner proof upload
10. Admin verification and payout state
11. Reports/analytics
12. Mobile and desktop layouts
13. Error and edge cases

## Architecture

Next.js + TypeScript + Tailwind CSS + Supabase Auth/Postgres/Storage + Stripe + deterministic draw engine + RLS + audit logs.
