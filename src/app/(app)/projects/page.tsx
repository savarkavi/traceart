import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  FileImage,
  LockKeyhole,
  MoreHorizontal,
  Palette,
  Plus,
  Sparkles,
  StickyNote,
  Upload,
} from "lucide-react";

const TestPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border/60 bg-background/85 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            <span className="border-border bg-card group-hover:border-primary/50 group-hover:bg-muted flex size-8 items-center justify-center rounded-full border transition-colors">
              <ArrowLeft className="size-4" />
            </span>
            <span className="hidden sm:inline">All projects</span>
          </Link>

          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Saved locally
            </span>
            <button
              type="button"
              aria-label="More project options"
              className="hover:border-border hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-full border border-transparent transition-colors"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase">
              <span>Project</span>
              <span className="text-border">/</span>
              <span className="text-primary">Untitled</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Untitled
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs font-medium text-amber-200">
                <span className="size-1.5 rounded-full bg-amber-300" />
                Draft
              </span>
            </div>

            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-7">
              A quiet place for this piece to take shape. Add the first version
              when you are ready.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border-border bg-card text-foreground hover:bg-muted inline-flex h-9 items-center gap-2 rounded-lg border px-3.5 text-sm font-medium shadow-sm transition-colors"
            >
              <StickyNote className="text-muted-foreground size-4" />
              Add note
            </button>
            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-semibold shadow-sm transition-all active:translate-y-px"
            >
              <Upload className="size-4" />
              Upload version
            </button>
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold tracking-wide uppercase">
                  Version timeline
                </h2>
                <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                  0 versions
                </span>
              </div>
              <span className="text-muted-foreground hidden text-xs sm:inline">
                Your process, in order
              </span>
            </div>

            <div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.11),transparent_34%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.015))]" />
              <div className="relative flex min-h-[390px] flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[430px]">
                <div className="border-primary/20 bg-primary/10 text-primary relative mb-7 flex size-24 items-center justify-center rounded-[28px] border shadow-[0_0_0_12px_rgba(234,179,8,0.04)]">
                  <div className="border-border bg-card text-muted-foreground absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full border shadow-sm">
                    <Plus className="size-3.5" />
                  </div>
                  <FileImage className="size-10 stroke-[1.25]" />
                </div>

                <p className="text-primary mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
                  The beginning
                </p>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Add your first version
                </h3>
                <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
                  Upload a sketch, reference, or finished piece. Every version
                  stays here, so the story of the artwork never gets lost.
                </p>

                <button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 mt-7 inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition-all active:translate-y-px"
                >
                  <Upload className="size-4" />
                  Upload first version
                </button>

                <p className="text-muted-foreground/75 mt-4 text-xs">
                  PNG, JPG, WEBP, or GIF · up to 20 MB
                </p>
              </div>
            </div>

            <div className="border-border/80 bg-background/40 mt-5 rounded-xl border border-dashed px-4 py-3.5">
              <div className="flex items-start gap-3">
                <div className="bg-muted text-muted-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Sparkles className="size-3.5" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    A timeline grows with you
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs leading-5">
                    Name each stage as you go—sketch, lineart, colors, final—or
                    leave the note for later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="border-border bg-card rounded-2xl border p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Project details</h2>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
                >
                  Edit
                </button>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <Clock3 className="size-3.5" />
                    Started
                  </dt>
                  <dd className="text-foreground text-right">Today</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <Palette className="size-3.5" />
                    Palette
                  </dt>
                  <dd className="text-muted-foreground text-right">
                    After upload
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <FileImage className="size-3.5" />
                    Versions
                  </dt>
                  <dd className="text-foreground text-right">0</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground flex items-center gap-2">
                    <LockKeyhole className="size-3.5" />
                    Visibility
                  </dt>
                  <dd className="text-foreground text-right">Private</dd>
                </div>
              </dl>
            </section>

            <section className="border-border bg-card rounded-2xl border p-5 shadow-sm">
              <div className="bg-muted text-muted-foreground mb-3 flex size-8 items-center justify-center rounded-lg">
                <StickyNote className="size-4" />
              </div>
              <h2 className="text-sm font-semibold">Leave yourself a note</h2>
              <p className="text-muted-foreground mt-1.5 text-xs leading-5">
                Capture the idea, mood, or intention before the details start to
                move around.
              </p>
              <button
                type="button"
                className="text-primary hover:text-primary/80 mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
              >
                Add project note
                <ArrowUpRight className="size-3.5" />
              </button>
            </section>

            <div className="text-muted-foreground/70 flex items-center gap-2 px-1 text-xs leading-5">
              <Check className="size-3.5 text-emerald-400" />
              Nothing is public until you choose to share it.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
