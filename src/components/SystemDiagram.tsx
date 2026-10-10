export interface DiagramLabels {
  hub: string;
  hubSub: string;
  nodes: { id: string; name: string; sub: string }[];
}

const apps = [
  { y: 22, color: "#12b981" },
  { y: 214, color: "#35e3ff" },
  { y: 406, color: "#0096f2" },
];

const services = [
  { y: 30, name: "Firestore", sub: "Realtime data", color: "#35e3ff" },
  { y: 144, name: "Auth", sub: "Roles & sessions", color: "#35e3ff" },
  { y: 258, name: "Cloud Messaging", sub: "Turn notifications", color: "#35e3ff" },
  { y: 372, name: "Cloud Functions", sub: "Atomic logic", color: "#35e3ff" },
];

export function SystemDiagram({ labels }: { labels: DiagramLabels }) {
  return (
    <svg
      viewBox="0 0 960 520"
      role="img"
      aria-label={`${labels.hub}: ${labels.nodes
        .map((n) => n.name)
        .join(", ")} connected through Firebase — Firestore, Auth, Cloud Messaging and Cloud Functions`}
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6de8b8" />
          <stop offset="0.5" stopColor="#12b981" />
          <stop offset="1" stopColor="#0096f2" />
        </linearGradient>
      </defs>

      <g aria-hidden>
        {apps.map((a, i) => (
          <path
            key={a.y}
            d={`M 234 ${a.y + 45} C 360 ${a.y + 45}, 400 250, 428 250`}
            fill="none"
            stroke={a.color}
            strokeOpacity="0.32"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-dash"
          />
        ))}
        {services.map((s) => (
          <path
            key={s.y}
            d={`M 572 250 C 610 250, 612 ${s.y + 33}, 726 ${s.y + 33}`}
            fill="none"
            stroke={s.color}
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="animate-dash"
          />
        ))}
      </g>

      <g className="font-display">
        {apps.map((a, i) => {
          const node = labels.nodes[i];
          return (
            <g key={a.y}>
              <rect
                x="24"
                y={a.y}
                width="210"
                height="90"
                rx="18"
                fill="#0e1424"
                stroke={a.color}
                strokeOpacity="0.45"
                strokeWidth="1.2"
              />
              <rect
                x="24"
                y={a.y}
                width="210"
                height="90"
                rx="18"
                fill={a.color}
                fillOpacity="0.08"
              />
              <circle cx="58" cy={a.y + 45} r="16" fill={a.color} fillOpacity="0.16" stroke={a.color} strokeOpacity="0.5" />
              <text
                x="58"
                y={a.y + 49}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={a.color}
                className="font-mono"
              >
                ●
              </text>
              <text x="88" y={a.y + 40} fontSize="15" fontWeight="600" fill="#eef4ff">
                {node.name || "●"}
              </text>
              <text x="88" y={a.y + 60} fontSize="10.5" fill="#5b6a86">
                {node.sub}
              </text>
            </g>
          );
        })}

        <g>
          <circle cx="500" cy="250" r="84" fill="none" stroke="#12b981" strokeOpacity="0.35" className="animate-pulse-ring svg-pulse" />
          <circle cx="500" cy="250" r="74" fill="#0a0f1b" stroke="url(#hubGrad)" strokeOpacity="0.85" strokeWidth="1.4" />
          <circle cx="500" cy="250" r="74" fill="url(#hubGrad)" fillOpacity="0.07" />
          <text x="500" y="238" textAnchor="middle" fontSize="15" fontWeight="700" fill="#eef4ff">
            {labels.hub}
          </text>
          <text x="500" y="258" textAnchor="middle" fontSize="10.5" fill="#8b9bb6">
            {labels.hubSub}
          </text>
          <text x="500" y="274" textAnchor="middle" fontSize="9.5" fill="#5b6a86">
            Firebase
          </text>
        </g>

        {services.map((s) => (
          <g key={s.y}>
            <rect
              x="726"
              y={s.y}
              width="210"
              height="66"
              rx="16"
              fill="#0e1424"
              stroke="#2d3a55"
              strokeWidth="1.2"
            />
            <text x="831" y={s.y + 28} textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#eef4ff">
              {s.name}
            </text>
            <text x="831" y={s.y + 46} textAnchor="middle" fontSize="10" fill="#5b6a86">
              {s.sub}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}