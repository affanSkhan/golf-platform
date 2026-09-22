# Digital Heroes Golf Platform

Production-oriented implementation of the Digital Heroes 2026 Level 1 PRD: a subscription-driven golf performance, charity contribution and monthly draw platform.

## Architecture
- Next.js + TypeScript + Tailwind CSS
- Supabase Auth/Postgres/Storage for the production data layer
- Stripe subscription lifecycle with webhook verification
- Role-based subscriber/admin surfaces
- Deterministic draw simulation with 5/4/3 match tiers and prize-pool calculation
- Audit-log-ready relational schema
- Responsive, motion-ready UI

## PRD coverage
- Public concept, charity directory and draw mechanics
- Monthly/yearly plan presentation
- Stableford score validation and latest-five rolling logic
- Charity contribution model with 10% minimum
- Draw simulation/publishing workflow
- Winner proof-upload flow
- Subscriber dashboard
- Admin operations surface
- Supabase migration schema
- CI build verification

## Deployment
- Submission staging: https://digital-heroes-golf-platform-8l0d.onrender.com
- Vercel production project: configured in the required new Vercel account
- Supabase production project: `digital-heroes-golf-platform` (`pgvopyvtumjzljqhsngl`, `ap-south-1`)

## Production environment
Required variables are documented in `.env.example` and must be configured in Vercel for the production build. Supabase auth/database/storage are ready; Stripe checkout/webhook functionality requires valid Stripe test/live credentials.
