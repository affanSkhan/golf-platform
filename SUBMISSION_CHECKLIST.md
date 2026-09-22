# Digital Heroes — Submission Checklist

## PRD coverage implemented

- Public, impact-first responsive website
- Monthly/yearly membership presentation and Stripe Checkout integration
- Supabase-ready authentication and role boundaries
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

## Current live staging

https://digital-heroes-golf-platform-8l0d.onrender.com

## Strict submission infrastructure still required

The PRD requires a **new Supabase project** and a **new Vercel account** with production environment variables. The codebase is prepared for those services, but credentials/account resources must be connected before the submission can honestly be described as fully production-backed.

The current connected Supabase organization has two active free projects, so creation of the required new project is blocked by the account's free-project limit. Do not pause an existing project without deciding which existing application may be taken offline.

The current deployment toolchain has a working Render deployment, while the available Vercel connection is read-only for deployment in this session. The live Render URL is kept as a staging fallback.

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
