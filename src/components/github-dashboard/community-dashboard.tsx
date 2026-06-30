"use client";

import { Activity, Clock3, GitPullRequestArrow, HeartHandshake, MessageSquareMore, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatCardData {
  label: string;
  value: string;
  delta: string;
  detail: string;
  tone: "good" | "steady" | "watch";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface TrendPoint {
  week: string;
  pullRequests: number;
  issues: number;
  reviews: number;
}

interface Contributor {
  name: string;
  initials: string;
  focus: string;
  reviews: number;
  streak: string;
}

interface ActivityItem {
  title: string;
  repo: string;
  actor: string;
  time: string;
  impact: string;
}

interface HealthSignal {
  label: string;
  value: number;
  hint: string;
}

const chartConfig = {
  pullRequests: {
    label: "Pull requests",
    color: "var(--color-chart-5)",
  },
  issues: {
    label: "Issues closed",
    color: "var(--color-chart-2)",
  },
  reviews: {
    label: "Reviews",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

const statCards: StatCardData[] = [
  {
    label: "Community health score",
    value: "92 / 100",
    delta: "+6 this sprint",
    detail: "Response times, review coverage, and contributor return rate are all trending up.",
    tone: "good",
    icon: HeartHandshake,
  },
  {
    label: "Median first response",
    value: "2.4h",
    delta: "Target < 4h",
    detail: "Issues and discussions are acknowledged quickly, keeping contributors engaged.",
    tone: "steady",
    icon: MessageSquareMore,
  },
  {
    label: "Review SLA coverage",
    value: "96%",
    delta: "18 of 19 active PRs",
    detail: "Most pull requests receive at least one actionable review within the agreed window.",
    tone: "good",
    icon: ShieldCheck,
  },
  {
    label: "Repeat contributors",
    value: "68%",
    delta: "+9 vs. last month",
    detail: "Returning contributors signal that onboarding and collaboration loops feel healthy.",
    tone: "watch",
    icon: Users,
  },
];

const trendData: TrendPoint[] = [
  { week: "W1", pullRequests: 18, issues: 11, reviews: 28 },
  { week: "W2", pullRequests: 24, issues: 14, reviews: 33 },
  { week: "W3", pullRequests: 20, issues: 13, reviews: 31 },
  { week: "W4", pullRequests: 29, issues: 17, reviews: 39 },
  { week: "W5", pullRequests: 27, issues: 16, reviews: 41 },
  { week: "W6", pullRequests: 34, issues: 21, reviews: 46 },
];

const contributors: Contributor[] = [
  {
    name: "Ava Martin",
    initials: "AM",
    focus: "Triage captain",
    reviews: 14,
    streak: "7 day streak",
  },
  {
    name: "Kenji Sato",
    initials: "KS",
    focus: "Docs & DX",
    reviews: 11,
    streak: "5 merged PRs",
  },
  {
    name: "Mina Patel",
    initials: "MP",
    focus: "Frontend fixes",
    reviews: 9,
    streak: "3 first-time mentors",
  },
  {
    name: "Luis Romero",
    initials: "LR",
    focus: "Release shepherd",
    reviews: 12,
    streak: "0 stale threads",
  },
];

const activityFeed: ActivityItem[] = [
  {
    title: "Accessibility cleanup landed",
    repo: "frontend-vibes-template",
    actor: "Ava",
    time: "12m ago",
    impact: "+4 review comments resolved",
  },
  {
    title: "Discussion triaged into starter issue",
    repo: "community",
    actor: "Kenji",
    time: "26m ago",
    impact: "2 new contributors subscribed",
  },
  {
    title: "Release board reached zero blockers",
    repo: "ops",
    actor: "Luis",
    time: "41m ago",
    impact: "Lead time down 18%",
  },
  {
    title: "Mentorship pairing closed a first PR",
    repo: "web",
    actor: "Mina",
    time: "1h ago",
    impact: "New maintainer confidence up",
  },
];

const healthSignals: HealthSignal[] = [
  {
    label: "Pull requests reviewed in 24 hours",
    value: 96,
    hint: "Goal: 90%",
  },
  {
    label: "Issues with clear next action",
    value: 88,
    hint: "Goal: 85%",
  },
  {
    label: "Discussions converted to contributors",
    value: 72,
    hint: "Goal: 70%",
  },
  {
    label: "Merged work with follow-up documentation",
    value: 81,
    hint: "Goal: 80%",
  },
];

const toneClasses: Record<StatCardData["tone"], string> = {
  good: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  steady: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  watch: "border-amber-500/30 bg-amber-500/10 text-amber-100",
};

const attentionRadarCompletion = 94;

export function CommunityDashboard() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1800px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%),linear-gradient(135deg,_rgba(9,16,32,0.98),_rgba(13,25,46,0.98)_48%,_rgba(25,47,40,0.94))] p-4 text-white shadow-2xl shadow-black/30 md:p-6 xl:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-[dashboard-float_12s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl animate-[dashboard-float_16s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[dashboard-pan_8s_linear_infinite]" />

      <div className="relative z-10 flex w-full flex-col gap-4 xl:gap-6">
        <header className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur md:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.9fr)] md:p-6 xl:p-8">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border-white/15 bg-white/10 px-3 py-1 text-sm tracking-[0.18em] uppercase text-white/90">
                TV community mode
              </Badge>
              <Badge className="border-emerald-400/25 bg-emerald-400/12 px-3 py-1 text-sm text-emerald-100 animate-[dashboard-glow_4s_ease-in-out_infinite]">
                Live pulse healthy
              </Badge>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.35em] text-white/55 uppercase">
                GitHub community contribution dashboard
              </p>
              <h1 className="max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl xl:text-6xl 2xl:text-7xl">
                Track contribution health, celebrate momentum, and surface friction before it slows the community down.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-white/72 md:text-lg xl:text-xl">
                A large-format view for team rooms and event screens showing the signals that matter most: response time, review coverage, contributor retention, and the work moving through the ecosystem right now.
              </p>
            </div>
          </div>

          <Card className="border-white/10 bg-black/20 py-0 text-white shadow-xl shadow-black/20">
            <CardHeader className="px-5 pt-5 pb-4 md:px-6">
              <CardDescription className="text-white/60">Now watching</CardDescription>
              <CardTitle className="text-2xl md:text-3xl">Contribution velocity</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 px-5 pb-5 md:px-6">
              <div className="grid grid-cols-3 gap-3">
                <SignalTile label="PRs this week" value="34" accent="from-fuchsia-400 to-primary" />
                <SignalTile label="Reviews completed" value="46" accent="from-cyan-400 to-sky-500" />
                <SignalTile label="New voices" value="12" accent="from-emerald-400 to-lime-400" />
              </div>
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/60">Attention radar</p>
                    <p className="text-lg font-medium">Only one stale thread needs follow-up.</p>
                  </div>
                  <Clock3 className="size-8 text-primary" />
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-300 animate-[dashboard-pan_6s_linear_infinite]"
                    style={{ width: `${attentionRadarCompletion}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="grid gap-4 xl:grid-cols-[1.65fr_1fr] xl:gap-6">
          <div className="grid gap-4 xl:gap-6">
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {statCards.map((card, index) => (
                <Card
                  key={card.label}
                  className="overflow-hidden border-white/10 bg-white/8 py-0 text-white backdrop-blur"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <CardHeader className="gap-3 px-5 pt-5 pb-3 md:px-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <CardDescription className="text-sm text-white/60">{card.label}</CardDescription>
                        <CardTitle className="text-3xl md:text-4xl">{card.value}</CardTitle>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
                        <card.icon className="size-6 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-3 px-5 pb-5 md:px-6">
                    <Badge className={cn("w-fit border px-3 py-1 text-sm", toneClasses[card.tone])}>
                      {card.delta}
                    </Badge>
                    <p className="text-sm leading-6 text-white/70">{card.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-white/10 bg-white/8 py-0 text-white backdrop-blur">
              <CardHeader className="px-5 pt-5 pb-3 md:px-6">
                <CardDescription className="text-white/60">6-week trend</CardDescription>
                <CardTitle className="text-2xl md:text-3xl">Community throughput</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-4 md:px-3 xl:px-4">
                <ChartContainer config={chartConfig} className="h-[320px] w-full">
                  <AreaChart data={trendData} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="fillPullRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-pullRequests)" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="var(--color-pullRequests)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="fillReviews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-reviews)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-reviews)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                    <XAxis
                      axisLine={false}
                      dataKey="week"
                      tickLine={false}
                      tickMargin={12}
                      tick={{ fill: "rgba(255,255,255,0.72)", fontSize: 13 }}
                    />
                    <ChartTooltip
                      cursor={{ stroke: "rgba(255,255,255,0.18)", strokeDasharray: "4 4" }}
                      content={<ChartTooltipContent className="border-white/10 bg-slate-950/95 text-white" />}
                    />
                    <Area
                      dataKey="issues"
                      fill="none"
                      stroke="var(--color-issues)"
                      strokeWidth={3}
                      type="monotone"
                    />
                    <Area
                      dataKey="pullRequests"
                      fill="url(#fillPullRequests)"
                      stroke="var(--color-pullRequests)"
                      strokeWidth={4}
                      type="monotone"
                    />
                    <Area
                      dataKey="reviews"
                      fill="url(#fillReviews)"
                      stroke="var(--color-reviews)"
                      strokeWidth={3}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:gap-6">
            <Card className="border-white/10 bg-white/8 py-0 text-white backdrop-blur">
              <CardHeader className="px-5 pt-5 pb-4 md:px-6">
                <CardDescription className="text-white/60">Contributor spotlight</CardDescription>
                <CardTitle className="text-2xl md:text-3xl">Who is carrying momentum?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 px-5 pb-5 md:px-6">
                {contributors.map((person, index) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/16 px-4 py-3"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Avatar className="size-14 border border-white/10 bg-white/8">
                      <AvatarFallback className="bg-transparent text-lg font-semibold text-white">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-lg font-medium">{person.name}</p>
                        <Badge className="border-white/10 bg-white/10 text-white/80">{person.streak}</Badge>
                      </div>
                      <p className="text-sm text-white/60">{person.focus}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold">{person.reviews}</p>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/50">reviews</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/8 py-0 text-white backdrop-blur">
              <CardHeader className="px-5 pt-5 pb-4 md:px-6">
                <CardDescription className="text-white/60">Health signals</CardDescription>
                <CardTitle className="text-2xl md:text-3xl">Where the community feels strong</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 px-5 pb-5 md:px-6">
                {healthSignals.map((signal, index) => (
                  <div key={signal.label} className="grid gap-2">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-white/70">{signal.label}</p>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/45">{signal.hint}</p>
                      </div>
                      <span className="text-lg font-semibold">{signal.value}%</span>
                    </div>
                    <Progress
                      className="h-3 bg-white/10"
                      style={{ animationDelay: `${index * 120}ms` }}
                      value={signal.value}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/8 py-0 text-white backdrop-blur">
              <CardHeader className="px-5 pt-5 pb-4 md:px-6">
                <CardDescription className="text-white/60">Recent activity</CardDescription>
                <CardTitle className="text-2xl md:text-3xl">What changed in the last hour?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 px-5 pb-5 md:px-6">
                {activityFeed.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/16 px-4 py-3">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Activity className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-base font-medium text-white">{item.title}</p>
                        <Badge className="border-white/10 bg-white/8 text-white/75">{item.repo}</Badge>
                      </div>
                      <p className="text-sm text-white/60">
                        {item.actor} · {item.time}
                      </p>
                      <p className="text-sm text-white/78">{item.impact}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/72 backdrop-blur md:grid-cols-3 md:p-5">
          <FooterCallout icon={Sparkles} label="How to use it" value="Display in a team room to keep contribution health visible without opening a dozen tabs." />
          <FooterCallout icon={GitPullRequestArrow} label="Track leading indicator" value="Review coverage shows whether incoming work can keep flowing before queues become visible." />
          <FooterCallout icon={Users} label="Celebrate the humans" value="Spotlight repeat contributors and first-time wins to make the dashboard motivational, not just operational." />
        </footer>
      </div>
    </section>
  );
}

interface SignalTileProps {
  label: string;
  value: string;
  accent: string;
}

function SignalTile({ label, value, accent }: SignalTileProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/8 p-3">
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className={cn("mt-2 bg-gradient-to-r bg-clip-text text-3xl font-semibold text-transparent", accent)}>
        {value}
      </p>
    </div>
  );
}

interface FooterCalloutProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

function FooterCallout({ icon: Icon, label, value }: FooterCalloutProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/12 px-4 py-3">
      <div className="rounded-xl border border-white/10 bg-white/8 p-2">
        <Icon className="size-5 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
        <p className="text-sm leading-6 text-white/78">{value}</p>
      </div>
    </div>
  );
}
