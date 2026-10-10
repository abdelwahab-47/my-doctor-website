import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-void pt-28 pb-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(100% 80% at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(100% 80% at 50% 40%, #000 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(10,132,255,0.25), transparent 62%)",
        }}
      />
      <div className="shell relative">
        <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-care-blue/80">
          404
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          The route you followed doesn&apos;t exist — but the platform, the
          three applications and the FAQ all do.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-brand inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-void"
          >
            Back to the home page
          </Link>
          <Link
            href="/#apps"
            className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface/50 px-6 py-3.5 text-sm font-medium text-fg-soft transition-colors hover:bg-surface hover:text-fg"
          >
            Meet the three applications
          </Link>
        </div>
      </div>
    </section>
  );
}