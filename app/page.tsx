import Link from "next/link";
import { ArrowUpRight, Check, HeartHandshake, Play, ShieldCheck, Trophy } from "lucide-react";
import SiteHeader from "../components/site-header";

const steps = [
  ["01", "Subscribe", "Choose monthly or yearly membership. Your subscription powers the platform and the reward pool."],
  ["02", "Track", "Keep your five latest Stableford scores in one calm, simple place. The oldest rolls away automatically."],
  ["03", "Give", "Pick a cause you care about and send at least 10% of your subscription towards it."],
  ["04", "Play monthly", "Every month brings a new draw. Simulate, verify, publish — with transparent prize rules."],
];

const charities = [
  ["Open Fairways", "Access to sport for young people.", "12 upcoming community days"],
  ["Green Ground", "Local environmental restoration.", "8 active projects"],
  ["Community Lift", "Practical support where it matters.", "5 regional initiatives"],
];

const charityVisuals = [
  "bg-[radial-gradient(circle_at_30%_30%,#f0d2b8,transparent_22%),linear-gradient(135deg,#718e7b,#29443b)]",
  "bg-[radial-gradient(circle_at_70%_35%,#ddebdc,transparent_21%),linear-gradient(135deg,#516f60,#1c2f29)]",
  "bg-[radial-gradient(circle_at_35%_30%,#e9c9b2,transparent_20%),linear-gradient(135deg,#866854,#3f3127)]",
];

const tiers = [
  ["5 numbers", "40%", "Jackpot rolls over"],
  ["4 numbers", "35%", "Shared equally"],
  ["3 numbers", "25%", "Shared equally"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f3ea]">
      <SiteHeader />
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
            <div className="relative z-10">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/55 px-3.5 py-2 text-xs font-medium uppercase tracking-[.18em] text-black/60 glass">
                <span className="size-1.5 rounded-full bg-[#d58f58]" />
                Golf for impact
              </div>
              <h1 className="reveal-2 mt-7 max-w-3xl text-5xl font-semibold leading-[.92] tracking-[-.045em] sm:text-6xl lg:text-8xl">
                Play the game.<br />
                <span className="text-[#567261]">Move something bigger.</span>
              </h1>
              <p className="reveal-3 mt-7 max-w-2xl text-lg leading-8 text-black/62 md:text-xl">
                Digital Heroes turns your regular golf routine into a simple cycle of performance, giving and monthly rewards — without the golf-club cliché.
              </p>
              <div className="reveal-4 mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup" className="group inline-flex items-center gap-2 rounded-full bg-[#12201d] px-6 py-3.5 text-sm font-medium text-white shadow-xl shadow-black/10 transition hover:-translate-y-1">
                  Start your membership <ArrowUpRight size={17} />
                </Link>
                <Link href="/draw" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-6 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-white">
                  <span className="grid size-6 place-items-center rounded-full bg-black/5"><Play size={12} fill="currentColor" /></span>
                  See the draw
                </Link>
              </div>
              <div className="reveal-4 mt-10 flex flex-wrap gap-4 text-sm text-black/50">
                <div className="flex items-center gap-2"><Check size={15} className="text-[#567261]" />Monthly or yearly</div>
                <div className="flex items-center gap-2"><Check size={15} className="text-[#567261]" />10%+ to your chosen cause</div>
                <div className="flex items-center gap-2"><Check size={15} className="text-[#567261]" />Five-score rolling view</div>
              </div>
            </div>

            <div className="relative min-h-[530px] lg:min-h-[620px]">
              <div className="absolute right-8 top-3 size-56 rounded-full bg-[#d9e5dc]/80 blur-3xl md:size-72" />
              <div className="hero-stage soft-shadow absolute left-0 top-8 h-[470px] w-full max-w-xl rounded-[2.25rem] border border-white/10 p-5 text-white md:h-[555px] md:p-7">
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[.28em] text-white/45">Member impact</div>
                      <div className="mt-2 text-sm text-white/72">Performance in motion.</div>
                    </div>
                    <div className="rounded-full border border-white/12 bg-white/10 p-2 backdrop-blur"><HeartHandshake size={17} /></div>
                  </div>

                  <div className="relative mx-auto grid size-[280px] place-items-center md:size-[330px]">
                    <div className="hero-orbit orbit-spin" />
                    <div className="absolute inset-[15%] rounded-full border border-white/8" />
                    <div className="absolute inset-[23%] rounded-full border border-white/7 bg-white/[.025] backdrop-blur-sm" />
                    <div className="hero-ball size-40 md:size-48">
                      <div className="relative z-10 text-center text-[#12201d]">
                        <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-black/35">Impact score</div>
                        <div className="mt-1 text-4xl font-semibold tracking-[-.04em] md:text-5xl">10<span className="text-xl">%</span></div>
                        <div className="mt-1 text-[10px] uppercase tracking-[.14em] text-black/40">minimum to a cause</div>
                      </div>
                    </div>
                    <div className="shimmer-line absolute left-1/2 top-1/2 h-px w-[88%] -translate-x-1/2 bg-white/10" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["5", "scores"],
                      ["40%", "jackpot"],
                      ["1×", "monthly"],
                    ].map(([value, label], index) => (
                      <div key={label} className={"rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-sm " + (index === 1 ? "shimmer-line" : "")}>
                        <div className="text-lg font-semibold">{value}</div>
                        <div className="text-[10px] uppercase tracking-[.15em] text-white/50">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pulse-soft absolute -bottom-2 right-0 w-52 rounded-3xl border border-black/8 bg-white p-5 soft-shadow-sm md:right-[-10px] md:w-60">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-black/45">This month</div>
                  <Trophy size={16} className="text-[#d58f58]" />
                </div>
                <div className="mt-4 flex items-end gap-1"><span className="text-4xl font-semibold tracking-tight">40%</span><span className="pb-1 text-xs text-black/45">of the draw pool</span></div>
                <div className="shimmer-line mt-3 h-2 overflow-hidden rounded-full bg-black/5"><div className="h-full w-[78%] rounded-full bg-[#567261]" /></div>
                <div className="mt-2 flex justify-between text-[11px] text-black/45"><span>Jackpot</span><span>Rolls if unclaimed</span></div>
              </div>

              <div className="reveal-4 absolute left-0 top-20 hidden -translate-x-5 rounded-2xl border border-white/40 bg-white/75 px-4 py-3 text-black/70 shadow-xl backdrop-blur-md sm:block lg:-translate-x-10">
                <div className="text-[9px] font-semibold uppercase tracking-[.2em] text-black/40">Latest round</div>
                <div className="mt-1 text-sm font-semibold">33 · 31 · 28 · 26 · 24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/55">
        <div className="mx-auto max-w-7xl overflow-hidden px-5 py-4 md:px-8">
          <div className="flex min-w-max gap-8 text-xs font-medium uppercase tracking-[.22em] text-black/45">
            <div className="marquee-track flex gap-8">
              {["Performance","·","Purpose","·","Community","·","Reward","·","Performance","·","Purpose","·","Community","·","Reward","·"].map((word, index) => <span key={word + index}>{word}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#d58f58]">The rhythm</div>
            <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-[-.03em] md:text-5xl">One membership.<br />Four simple moves.</h2>
            <p className="mt-5 max-w-md leading-7 text-black/55">The product is designed around what matters: low-friction score entry, visible impact, clear rules and a reward layer that feels earned.</p>
            <Link href="/signup" className="mt-7 inline-flex items-center gap-2 text-sm font-medium underline decoration-black/20 underline-offset-4">Join the rhythm <ArrowUpRight size={15} /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([number, title, description], index) => (
              <article key={number} className={"group rounded-[1.75rem] border border-black/7 bg-white/60 p-7 transition hover:-translate-y-1 hover:bg-white hover:soft-shadow-sm " + (index === 0 ? "reveal" : index === 1 ? "reveal-2" : index === 2 ? "reveal-3" : "reveal-4")}>
                <div className="flex items-center justify-between">
                  <div className="grid size-10 place-items-center rounded-full bg-[#d9e5dc] text-xs font-semibold text-[#40584b]">{number}</div>
                  <ArrowUpRight size={17} className="text-black/20 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/60" />
                </div>
                <h3 className="mt-10 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#12201d] text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#d6a57e]">Give back</div>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.03em] md:text-6xl">Your cause should be part of the product.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">Choose a charity at signup, decide how much of your subscription you want to direct there, and see the impact without leaving the platform.</p>
            </div>
            <Link href="/charities" className="inline-flex items-center justify-self-start gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#12201d] transition hover:-translate-y-0.5">Explore charities <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {charities.map(([name, description, meta], index) => (
              <article key={name} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[.04] p-6 transition hover:bg-white/[.07]">
                <div className={charityVisuals[index] + " h-32 rounded-2xl transition duration-500 group-hover:scale-[1.015]"} />
                <div className="mt-6 text-[10px] uppercase tracking-[.22em] text-white/40">Featured cause</div>
                <h3 className="mt-2 text-xl font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/40"><span>{meta}</span><ArrowUpRight size={14} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="draw" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#d58f58]">The monthly draw</div>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-.03em] md:text-6xl">Clear rules. Real anticipation.</h2>
            <p className="mt-5 max-w-xl leading-7 text-black/55">Every draw is simulated before publishing. Prize tiers are fixed. Multiple winners share their tier equally. The five-number jackpot rolls forward when it goes unclaimed.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-white px-4 py-2 soft-shadow-sm">Simulation before publish</span><span className="rounded-full bg-white px-4 py-2 soft-shadow-sm">Auditable outcomes</span></div>
          </div>

          <div className="dark-panel rounded-[2rem] p-7 text-white soft-shadow md:p-9">
            <div className="flex items-center justify-between">
              <div><div className="text-[10px] uppercase tracking-[.25em] text-white/45">September draw</div><div className="mt-1 text-lg font-medium">Pool distribution</div></div>
              <ShieldCheck size={20} className="text-[#d6a57e]" />
            </div>
            <div className="mt-9 space-y-5">
              {tiers.map(([label, share, subtitle]) => (
                <div key={label}>
                  <div className="mb-2 flex items-end justify-between gap-4"><div><div className="text-sm font-medium">{label}</div><div className="mt-1 text-xs text-white/40">{subtitle}</div></div><div className="text-2xl font-semibold">{share}</div></div>
                  <div className="shimmer-line h-3 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-[#7e9a88]" style={{width: share}} /></div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] uppercase tracking-[.18em] text-white/35">Five match</div><div className="mt-2 font-medium">Jackpot</div><div className="mt-1 text-xs text-white/45">Carries forward when unclaimed</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] uppercase tracking-[.18em] text-white/35">Three & four</div><div className="mt-2 font-medium">Shared equally</div><div className="mt-1 text-xs text-white/45">No rollover</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="overflow-hidden rounded-[2.2rem] border border-black/8 bg-[#d9e5dc]">
          <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1fr_.72fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.22em] text-[#567261]">Ready when you are</div>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-.03em] md:text-6xl">Make your next round mean a little more.</h2>
              <p className="mt-5 max-w-xl leading-7 text-black/55">Membership gives you one place to track your scores, choose your cause and stay in the loop each month.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#12201d] px-6 py-3.5 text-sm font-medium text-white">Become a member <ArrowUpRight size={16} /></Link>
                <Link href="/charities" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-6 py-3.5 text-sm font-medium">Browse causes</Link>
              </div>
            </div>
            <div className="relative min-h-[250px]">
              <div className="impact-orb absolute right-0 top-0 size-56 rounded-full md:size-72" />
              <div className="absolute right-6 top-14 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-xl backdrop-blur"><div className="text-[10px] uppercase tracking-[.2em] text-black/40">Start here</div><div className="mt-2 text-3xl font-semibold">10%+</div><div className="mt-1 text-xs leading-5 text-black/50">towards a cause you choose</div></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-black/45 md:flex-row md:items-center md:justify-between md:px-8">
          <div>© 2026 Digital Heroes</div>
          <div className="flex items-center gap-5"><Link href="/impact">Impact</Link><Link href="/draw">Draw rules</Link><Link href="/login">Member sign in</Link></div>
        </div>
      </footer>
    </main>
  );
}
