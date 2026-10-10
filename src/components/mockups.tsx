"use client";

import { useLang } from "@/lib/i18n";

export const gradientBrand =
  "linear-gradient(100deg,#6de8b8,#12b981 40%,#0094e6)";
export const gradientBlue = "linear-gradient(100deg,#35b6ff,#0a84ff 50%,#0066cc)";

export function BrandMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_24px_-10px_rgba(10,132,255,0.8)] ${className}`}
      style={{ width: size, height: size, background: "linear-gradient(160deg,#0a84ff,#0066cc)" }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 64 64" aria-hidden>
        <path d="M32 17 V47" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
        <path d="M20 32 H44" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function StatusDot({ color = "#12b981" }: { color?: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}

export function PatientPhone({ showSearch = false }: { showSearch?: boolean }) {
  const { t } = useLang();
  const u = t.ui.patient;
  return (
    <div className="relative w-[248px] rounded-[1.7rem] border border-ledge bg-white p-1.5 shadow-[0_34px_90px_-38px_rgba(13,31,60,0.5)]">
      <div className="overflow-hidden rounded-[1.35rem] bg-lbg">
        <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-ledge" />
        <div className="px-3 pb-3 pt-3">
          <div className="flex items-center gap-2.5">
            <BrandMark size={30} />
            <div>
              <p className="text-[11px] font-semibold text-ltext">My Doctor</p>
              <p className="text-[9px] text-lfaint">طبيبي</p>
            </div>
          </div>

          {showSearch ? (
            <button
              type="button"
              className="mt-3 flex w-full items-center gap-2 rounded-xl border border-ledge bg-white px-3 py-2.5 text-start text-[10.5px] text-lfaint"
            >
              <span aria-hidden className="text-lfaint">
                ⌕
              </span>
              {u.search}
            </button>
          ) : (
            <p className="mt-3 text-[9.5px] uppercase tracking-[0.18em] text-lfaint">
              {u.today}
            </p>
          )}

          {!showSearch && (
            <>
              <p className="mt-1 text-[12.5px] font-semibold text-ltext">
                {u.clinic}
              </p>
              <div className="mt-2.5 rounded-xl border border-care/25 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] text-lmuted">
                    {u.queuePosition}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-medium text-care">
                    <StatusDot /> {u.live}
                  </span>
                </div>
                <p className="mt-1 font-display text-[22px] font-semibold text-ltext">
                  <span aria-hidden className="text-lfaint">
                    #
                  </span>
                  3
                </p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-lbg">
                  <div className="h-full rounded-full" style={{ width: "60%", background: gradientBrand }} />
                </div>
                <p className="mt-1.5 flex items-center justify-between text-[9.5px] text-lmuted">
                  <span>{u.estimatedSlot}</span>
                  <span className="font-mono">10:00</span>
                </p>
              </div>
              <button
                type="button"
                className="mt-2.5 w-full rounded-xl py-2.5 text-[10.5px] font-semibold text-white"
                style={{ background: gradientBrand }}
              >
                {u.track}
              </button>
              <div className="mt-2.5 flex items-center justify-around pb-0.5 pt-0.5 text-[13px]">
                {[u.home, u.search, u.messages, u.profile].map((s, i) => (
                  <span
                    key={s}
                    aria-hidden
                    className={`grid h-6 place-items-center rounded-lg px-2 text-[9px] font-medium ${
                      i === 0 ? "bg-care/12 text-care" : "text-lfaint"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function DoctorWindow({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const u = t.ui.doctor;
  const navItems = [u.queue, u.patients, u.notes, u.settings];
  const rows = [
    { label: u.inConsult, pos: "#1", now: true },
    { label: u.upNext, pos: "#2", now: false },
  ];
  return (
    <div
      className={`w-full overflow-hidden rounded-[1rem] border border-ledge bg-white shadow-[0_34px_90px_-38px_rgba(13,31,60,0.5)] ${
        compact ? "max-w-[360px]" : "max-w-[420px]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-ledge bg-lbg px-3.5 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <i className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <i className="h-2 w-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="truncate text-[10px] text-lfaint">My Doctor — {u.queue}</span>
      </div>
      <div className={compact ? "p-3" : "p-4"}>
        <div className="grid grid-cols-[84px_1fr] gap-3">
          <div className="space-y-1">
            {navItems.map((n, i) => (
              <div
                key={n}
                className={`rounded-lg px-2 py-1.5 text-[9.5px] font-medium ${
                  i === 0 ? "bg-care/12 text-care" : "text-lfaint"
                }`}
              >
                {n}
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-ledge bg-lbg p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-ltext">{u.liveQueue}</p>
              <span className="flex items-center gap-1 rounded-full bg-care/10 px-1.5 py-0.5 text-[8.5px] font-medium text-care">
                <StatusDot /> {u.synced}
              </span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              {rows.map((r) => (
                <div
                  key={r.pos}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[10px] ${
                    r.now
                      ? "border border-care/25 bg-white"
                      : "bg-white/70"
                  }`}
                >
                  <span className="text-ltext">{r.label}</span>
                  <span className={`font-mono ${r.now ? "text-care" : "text-lfaint"}`}>
                    {r.pos}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-lg py-2 text-[9.5px] font-semibold text-white"
              style={{ background: gradientBrand }}
            >
              {u.completeNext}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssistantBoard({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const u = t.ui.assistant;
  return (
    <div
      className={`w-full overflow-hidden rounded-[1rem] border border-ledge bg-white shadow-[0_34px_90px_-38px_rgba(13,31,60,0.5)] ${
        compact ? "max-w-[360px]" : "max-w-[420px]"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-ledge bg-lbg px-3.5 py-2.5">
        <BrandMark size={20} className="rounded-md" />
        <span className="text-[10px] font-medium text-ltext">{u.queueBoard}</span>
        <span className="ms-auto flex items-center gap-1.5 text-[8.5px] font-medium text-care">
          <StatusDot /> 09:00 → 11:00
        </span>
      </div>
      <div className={compact ? "p-3" : "p-3.5"}>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-care/25 bg-white p-2.5">
            <p className="text-[8.5px] uppercase tracking-[0.16em] text-care">{u.now}</p>
            <p className="mt-1 font-display text-[12px] font-semibold text-ltext">#2 · 09:30</p>
          </div>
          <div className="rounded-lg bg-lbg p-2.5">
            <p className="text-[8.5px] uppercase tracking-[0.16em] text-lfaint">{u.noShowRisk}</p>
            <p className="mt-1 text-[10px] text-lmuted">#5</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[10px] font-semibold text-white"
          style={{ background: gradientBrand }}
        >
          <span aria-hidden className="text-[12px]">
            ↕
          </span>
          {u.callNext}
        </button>
        <div className="mt-2.5 flex gap-1.5">
          {[1, 2, 3, 4].map((d) => (
            <div
              key={d}
              className={`flex-1 rounded-md py-1 text-center text-[9px] ${
                d === 2 ? "bg-care/12 text-care" : "bg-lbg text-lfaint"
              }`}
            >
              {u.registered} {10 + d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}