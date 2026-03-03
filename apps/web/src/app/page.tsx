'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  Code2,
  Database,
  Layers,
  LayoutGrid,
  ShieldCheck,
  Wrench
} from 'lucide-react'

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation
} from '@/components/ui/terminal'
import { useAuth } from '@/providers/auth-provider'

// ─── Data ────────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  'TURBOREPO',
  'NEXT.JS 16',
  'EXPRESS',
  'FIREBASE',
  'MONGODB',
  'TYPESCRIPT',
  'SHADCN/UI',
  'TAILWIND',
  'BUN',
  'MONGOOSE',
  'TANSTACK QUERY',
  'ZOD',
  'RADIX UI',
  'AXIOM'
]

const BENTO_SMALL_CARDS = [
  {
    id: 'auth',
    label: 'Auth Ready',
    description:
      'Firebase with email/password + Google OAuth. Email verification, protected routes, and server-side token validation — already wired.',
    icon: ShieldCheck,
    accent: 'primary' as const
  },
  {
    id: 'typescript',
    label: 'Type-Safe Stack',
    description:
      'End-to-end TypeScript across every app and package. Strict mode, shared tsconfig presets, and zero implicit any.',
    icon: Code2,
    accent: 'accent' as const
  },
  {
    id: 'database',
    label: 'Database Ready',
    description:
      'MongoDB + Mongoose with a shared model registry via the db package. Connect and define schemas — no boilerplate.',
    icon: Database,
    accent: 'primary' as const
  },
  {
    id: 'ui',
    label: 'UI Components',
    description:
      'shadcn/ui with Radix UI primitives, custom theme tokens, Osiris font, light/dark mode — ready to extend.',
    icon: LayoutGrid,
    accent: 'accent' as const
  },
  {
    id: 'tooling',
    label: 'Dev Tooling',
    description:
      'ESLint, Prettier, Commitlint, Husky, lint-staged, and a GitHub Actions CI — all pre-configured, none to think about.',
    icon: Wrench,
    accent: 'muted' as const
  }
]

const ACCENT_CLASSES = {
  primary: {
    icon: 'bg-primary/10 text-primary group-hover:bg-primary/20',
    hover: 'hover:border-primary/50'
  },
  accent: {
    icon: 'bg-accent/10 text-accent group-hover:bg-accent/20',
    hover: 'hover:border-accent/40'
  },
  muted: {
    icon: 'bg-muted text-muted-foreground group-hover:bg-muted/60',
    hover: 'hover:border-muted-foreground/40'
  }
}

const STACK_ROW_ONE = [
  { name: 'Turborepo', desc: 'Monorepo orchestration' },
  { name: 'Next.js 16', desc: 'React framework' },
  { name: 'Express', desc: 'Node API server' },
  { name: 'Bun', desc: 'Fast runtime & package manager' },
  { name: 'TypeScript', desc: 'Type-safe development' },
  { name: 'Firebase', desc: 'Auth & identity' }
]

const STACK_ROW_TWO = [
  { name: 'MongoDB', desc: 'Document database' },
  { name: 'Mongoose', desc: 'ODM + model registry' },
  { name: 'TanStack Query', desc: 'Server state management' },
  { name: 'shadcn/ui', desc: 'Component library' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'Radix UI', desc: 'Accessible primitives' },
  { name: 'Axiom', desc: 'Structured logging' },
  { name: 'Zod', desc: 'Schema validation' }
]

const FOOTER_NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Stack', href: '#stack' },
  { label: 'Dev Experience', href: '#devex' }
]

const FOOTER_AUTH = [
  { label: 'Sign In', href: '/login' },
  { label: 'Sign Up', href: '/signup' },
  { label: 'Forgot Password', href: '/forgot-password' }
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RootPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (!isLoading && user) router.replace('/home')
  }, [isLoading, user, router])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="dark">
      <div className="min-h-screen bg-background text-foreground">
        {/* ── Navbar ─────────────────────────────────────────────────────── */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-background/80 backdrop-blur-xl border-b border-border/40'
              : 'bg-transparent'
          }`}
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xl font-brand font-bold tracking-tight text-foreground">
                TejaDev
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Stack', href: '#stack' },
                { label: 'Dev Experience', href: '#devex' }
              ].map((link) => (
                <a
                  key={link.label}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <Link
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-dark transition-all duration-200 font-semibold"
                href="/signup"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-blob [animation-delay:3s]" />
            <div className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob [animation-delay:5s]" />
          </div>
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />
          {/* Content */}
          <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
            <div className="inline-flex items-center gap-2 bg-card/60 border border-border/50 backdrop-blur-sm rounded-full px-4 py-1.5 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground font-semibold tracking-widest uppercase">
                Production-Ready · Open Source
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-brand font-bold tracking-tight leading-[0.95] mb-6">
              <span className="text-foreground">SHIP THE FEATURE.</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%] animate-shiny-text">
                NOT THE SETUP.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A full-stack TypeScript monorepo with auth, database, UI
              components, and tooling — all wired and working. Clone it. Fill{' '}
              <code className="text-accent font-mono text-sm bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                .env
              </code>
              . Build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20"
                href="/signup"
              >
                Get Started Free
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Open Source
              </span>
              <span className="w-px h-4 bg-border/50" />
              <span>Bun · Turborepo · Next.js 16</span>
              <span className="w-px h-4 bg-border/50" />
              <span>MIT License</span>
            </div>
          </div>
          {/* Marquee strip */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 overflow-hidden py-3.5 bg-card/30 backdrop-blur-md">
            <div
              className="flex whitespace-nowrap animate-marquee"
              style={{ willChange: 'transform' }}
            >
              {[
                ...MARQUEE_ITEMS,
                ...MARQUEE_ITEMS,
                ...MARQUEE_ITEMS,
                ...MARQUEE_ITEMS
              ].map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 px-6 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                >
                  {tech}
                  <span className="text-accent/40">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bento Features ─────────────────────────────────────────────── */}
        <section className="py-28 px-6" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
                Features
              </span>
              <h2 className="text-4xl md:text-5xl font-brand font-bold text-foreground mb-4 leading-tight">
                Everything wired in.
                <br />
                Nothing to configure.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every piece you need to ship — already set up and working
                together before you write a single line.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
              {/* Large card — Monorepo */}
              <div className="md:col-span-2 md:row-span-2 p-8 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden group cursor-default">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-72 h-48 bg-primary-foreground/5 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-primary-foreground/15 rounded-xl">
                      <Layers className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-xs bg-primary-foreground/15 text-primary-foreground px-3 py-1 rounded-full font-semibold tracking-wide">
                      Core
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-brand font-bold mb-3">
                    Monorepo Architecture
                  </h3>
                  <p className="text-primary-foreground/75 text-base leading-relaxed mb-8 max-w-md">
                    Turborepo orchestrates your apps and packages. Web, API, DB,
                    UI, logging, and config — all in one repo, shared types,
                    zero duplication.
                  </p>
                  <div className="mt-auto bg-primary-foreground/10 border border-primary-foreground/15 rounded-xl p-5 font-mono text-sm space-y-1.5 text-primary-foreground/80">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-foreground/40">📁</span>
                      <span className="font-semibold">apps/</span>
                    </div>
                    <div className="pl-5 flex items-center gap-2">
                      <span className="text-primary-foreground/40">📁</span>
                      <span>web</span>
                      <span className="text-primary-foreground/40 text-xs">
                        — Next.js 16
                      </span>
                    </div>
                    <div className="pl-5 flex items-center gap-2">
                      <span className="text-primary-foreground/40">📁</span>
                      <span>api</span>
                      <span className="text-primary-foreground/40 text-xs">
                        — Express + Bun
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-primary-foreground/40">📁</span>
                      <span className="font-semibold">packages/</span>
                    </div>
                    <div className="pl-5 flex items-center gap-2">
                      <span className="text-primary-foreground/40">📁</span>
                      <span>
                        db · ui · logging · shared · typescript-config
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Small cards */}
              {BENTO_SMALL_CARDS.map((card) => {
                const Icon = card.icon
                const cls = ACCENT_CLASSES[card.accent]
                return (
                  <div
                    key={card.id}
                    className={`p-6 rounded-2xl bg-card border border-border/50 ${cls.hover} transition-colors duration-200 group cursor-default`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${cls.icon}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-brand font-semibold text-foreground">
                        {card.label}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Stack Showcase ──────────────────────────────────────────────── */}
        <section className="py-28 overflow-hidden" id="stack">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
              Tech Stack
            </span>
            <h2 className="text-4xl md:text-5xl font-brand font-bold text-foreground mb-4 leading-tight">
              Best-in-class tools.
              <br />
              <span className="text-muted-foreground font-normal">
                Already configured together.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Handpicked for developer experience, production reliability, and
              zero lock-in. Every tool talks to every other tool — out of the
              box.
            </p>
          </div>
          {/* Row 1 — scrolls left */}
          <div className="relative mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div
              className="flex animate-marquee whitespace-nowrap"
              style={{ willChange: 'transform' }}
            >
              {[
                ...STACK_ROW_ONE,
                ...STACK_ROW_ONE,
                ...STACK_ROW_ONE,
                ...STACK_ROW_ONE
              ].map((tech, i) => (
                <div
                  key={`r1-${i}`}
                  className="inline-flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 mx-2 shrink-0 hover:border-primary/40 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-foreground font-brand">
                      {tech.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div
              className="flex animate-marquee-reverse whitespace-nowrap"
              style={{ willChange: 'transform' }}
            >
              {[
                ...STACK_ROW_TWO,
                ...STACK_ROW_TWO,
                ...STACK_ROW_TWO,
                ...STACK_ROW_TWO
              ].map((tech, i) => (
                <div
                  key={`r2-${i}`}
                  className="inline-flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 mx-2 shrink-0 hover:border-primary/40 transition-all duration-200 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                  <div>
                    <p className="text-sm font-semibold text-foreground font-brand">
                      {tech.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Dev Terminal ───────────────────────────────────────────────── */}
        <section className="py-28 px-6" id="devex">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
                  Developer Experience
                </span>
                <h2 className="text-4xl md:text-5xl font-brand font-bold text-foreground mb-6 leading-tight">
                  One command
                  <br />
                  to rule them all.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Turborepo handles the dependency graph. All apps and packages
                  build, lint, and run in the right order — with caching so you
                  never repeat work.
                </p>
                <ul className="mt-2 space-y-3">
                  {[
                    'Parallel execution across all apps',
                    'Intelligent caching — skip unchanged packages',
                    'Shared ESLint + Prettier + tsconfig presets',
                    'Commitlint + Husky enforce clean git history'
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right — terminal */}
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl pointer-events-none" />
                <Terminal className="shadow-2xl border-border/60 min-h-[380px] font-mono">
                  <TypingAnimation className="text-accent font-bold">
                    bun install
                  </TypingAnimation>
                  <AnimatedSpan className="text-muted-foreground">
                    {' '}
                    bun install v1.3.9
                  </AnimatedSpan>
                  <AnimatedSpan className="text-muted-foreground">
                    {' '}
                    Resolving packages from lockfile...
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    ✔ packages/db installed
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    ✔ packages/ui installed
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    ✔ packages/logging installed
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    ✔ apps/web + apps/api installed
                  </AnimatedSpan>
                  <AnimatedSpan className="text-muted-foreground">
                    {' '}
                    847 packages installed [1.24s]
                  </AnimatedSpan>
                  <AnimatedSpan>&nbsp;</AnimatedSpan>
                  <TypingAnimation className="text-accent font-bold">
                    bun run dev
                  </TypingAnimation>
                  <AnimatedSpan className="text-muted-foreground">
                    {' '}
                    @tejadev/web:dev ▶ starting on :3000
                  </AnimatedSpan>
                  <AnimatedSpan className="text-muted-foreground">
                    {' '}
                    @tejadev/api:dev ▶ starting on :8000
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    @tejadev/api:dev ✔ connected to MongoDB
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    @tejadev/api:dev ✔ Firebase Admin initialized
                  </AnimatedSpan>
                  <AnimatedSpan className="text-primary">
                    {' '}
                    @tejadev/web:dev ✔ compiled in 1.8s
                  </AnimatedSpan>
                  <AnimatedSpan>&nbsp;</AnimatedSpan>
                  <AnimatedSpan className="text-primary font-semibold">
                    {' '}
                    ✔ Ready on http://localhost:3000
                  </AnimatedSpan>
                </Terminal>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-primary overflow-hidden p-12 md:p-20 text-center">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-primary-foreground/15 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Open Source Template
                </span>
                <h2 className="text-4xl md:text-6xl font-brand font-bold text-primary-foreground leading-tight mb-6">
                  Stop setting up.
                  <br />
                  Start shipping.
                </h2>
                <p className="text-lg md:text-xl text-primary-foreground/75 max-w-xl mx-auto leading-relaxed mb-10">
                  Clone the repo, fill in your{' '}
                  <code className="text-accent font-mono bg-primary-foreground/10 px-2 py-0.5 rounded text-base">
                    .env
                  </code>{' '}
                  , and you&apos;re building features on day one — not day five.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-bold hover:opacity-90 transition-all duration-200 shadow-xl"
                    href="/signup"
                  >
                    Get Started Free
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                      />
                    </svg>
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all duration-200"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </div>
                <p className="text-sm text-primary-foreground/50 mt-8">
                  MIT License · No vendor lock-in · Fully yours to extend
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="border-t border-border/40 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-lg font-brand font-bold text-foreground">
                    TejaDev
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  A production-ready Turborepo monorepo template. Auth,
                  database, UI, logging, and tooling — wired and working before
                  you start.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  Explore
                </h4>
                <ul className="space-y-2.5">
                  {FOOTER_NAV.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  Account
                </h4>
                <ul className="space-y-2.5">
                  {FOOTER_AUTH.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} TejaDev Template. MIT License.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  Built with Turborepo · Next.js · Bun
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
