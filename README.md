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
Verified staging deployment: https://digital-heroes-golf-platform-8l0d.onrender.com
Render auto-deploy is enabled from main.

## Production infrastructure
The PRD specifies a new Supabase project and a new Vercel account. The application is structured for both. Live authentication, persistent database storage and Stripe subscription processing require those project credentials to be connected.
