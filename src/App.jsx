// App.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";

const paragraphs = [
  "Baby, happy 12th month to us. One year since we turned our “I like you” into “I love you,” and I’m the luckiest and most blessed person for having you.",
  "I know I’m not always the easiest person to love, and I’m really sorry for the times I hurt you, pressured you, or asked for too much.",
  "Baby, please know that I’m trying my best to love you, understand you, and treat you the way you deserve, and I’m trying to give you everything I can, everything that I’m capable of giving, because you deserve so much more.",
  "When I tell you the things that bother me, it’s never because I want to fight with you. I just don’t want to keep things inside until they become something that makes us lose each other. And I hope you’ll always feel safe enough to tell me the things that bother you too.",
  "I’m so proud of you, baby, and I’ll always pray for your happiness, your dreams, and for God to guide you in everything you do.",
  "Thank you for staying, for loving me, and for being patient with me.",
  "Baby, I want more days with you. More calls, more “I love yous,” more “Goodnight, my baby,” more “Take care, baby,” more “Good luck, baby,” and more of those little things we say to each other.",
  "I want more of us, baby.",
  "I love you sooooo soooo very so muchhh very much so muchhh sooooooooooooooooooo veryyyy veryyyyyy sooo muchhhhh babyyy.",
  "- MIK ",
];

const CONFETTI_COLORS = [
  "#ee8a2e",
  "#f4a65c",
  "#f8c58f",
  "#e9b8a8",
  "#f3c9c0",
  "#c9a46a",
];

function launchConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = w < 600 ? 38 : 64;

  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: -20 - Math.random() * h * 0.5,
    size: 6 + Math.random() * 4,
    vx: (Math.random() - 0.5) * 1.1,
    vy: 1.4 + Math.random() * 2,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.14,
    sway: Math.random() * Math.PI * 2,
    round: Math.random() < 0.3,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));

  let frame;
  const start = performance.now();

  const tick = (now) => {
    ctx.clearRect(0, 0, w, h);
    let alive = false;

    for (const p of pieces) {
      p.sway += 0.04;
      p.x += p.vx + Math.sin(p.sway) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;

      if (p.y < h + 20) alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    if (alive && now - start < 6500) {
      frame = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, w, h);
    }
  };

  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, w, h);
  };
}

/* ---------- Decorative pieces ---------- */

function CornerOrnament() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M.5 64V18A17.5 17.5 0 0 1 18 .5H64" />
      <path d="M8.5 64V19A10.5 10.5 0 0 1 19 8.5H64" opacity="0.5" />
      <circle cx="19.5" cy="19.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M28 25.4L30.6 28L28 30.6L25.4 28Z" fill="currentColor" stroke="none" opacity="0.7" />
      <path
        d="M31 8.5C33 14 37 16.5 42 16C40 11.5 36 8.5 31 8.5Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <path
        d="M8.5 31C14 33 16.5 37 16 42C11.5 40 8.5 36 8.5 31Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <circle cx="50" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="50" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Corners() {
  return ["tl", "tr", "br", "bl"].map((c) => (
    <span key={c} className={`corner ${c}`}>
      <CornerOrnament />
    </span>
  ));
}

function EdgeMarks() {
  const horizontal = (
    <svg
      viewBox="0 0 64 14"
      width="64"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 7H17M47 7H62" opacity="0.55" />
      <circle cx="23" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="41" cy="7" r="1" fill="currentColor" stroke="none" />
      <path d="M32 1.8L37.2 7L32 12.2L26.8 7Z" />
      <circle cx="32" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
  const vertical = (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" opacity="0.6" />
      <circle cx="7" cy="7" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
  return (
    <>
      <span className="mark top">{horizontal}</span>
      <span className="mark bottom">{horizontal}</span>
      <span className="mark side left">{vertical}</span>
      <span className="mark side right">{vertical}</span>
    </>
  );
}

const LEAVES = [
  [131, 1, 1],
  [119, -1, 1],
  [99, 1, 0.92],
  [87, -1, 0.92],
  [68, 1, 0.8],
  [56, -1, 0.8],
  [38, 1, 0.66],
  [28, -1, 0.66],
];

function Sprig({ className = "" }) {
  return (
    <svg
      className={`sprig ${className}`}
      viewBox="0 0 90 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M45 168C44 130 46 90 45 12" />
      {LEAVES.map(([y, side, s]) => (
        <g
          key={y}
          transform={`translate(45 ${y}) rotate(${side > 0 ? -38 : -142}) scale(${s})`}
        >
          <path
            d="M0 0C7-9 20-10 30-2C20 7 8 8 0 0Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M2 0H24" opacity="0.5" />
        </g>
      ))}
      <g transform="translate(45 13) rotate(-90)">
        <path
          d="M0 0C5-7 15-8 22-1C15 6 6 6 0 0Z"
          fill="currentColor"
          fillOpacity="0.1"
        />
      </g>
    </svg>
  );
}

function Flower({ className = "" }) {
  return (
    <svg
      className={`flower ${className}`}
      viewBox="-20 -20 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse
          key={r}
          cx="0"
          cy="-8.5"
          rx="3.6"
          ry="7"
          transform={`rotate(${r})`}
          fill="currentColor"
          fillOpacity="0.08"
        />
      ))}
      <circle cx="0" cy="0" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="-6 -6 12 12" aria-hidden="true">
      <path
        d="M0-5L1.3-1.3L5 0L1.3 1.3L0 5L-1.3 1.3L-5 0L-1.3-1.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeartOutline() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 14C3 10 1 7.6 1 5.2A3.2 3.2 0 0 1 6.6 3.2L8 4.6L9.4 3.2A3.2 3.2 0 0 1 15 5.2C15 7.6 13 10 8 14Z" />
    </svg>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef(null);
  const scrollRef = useRef(null);
  const confettiRef = useRef(null);
  const previousOpen = useRef(false);

  useEffect(() => {
    if (previousOpen.current === isOpen) return;
    previousOpen.current = isOpen;

    if (isOpen) {
      scrollRef.current?.focus({ preventScroll: true });
    } else {
      envelopeRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop;
    const timer = setTimeout(() => {
      if (confettiRef.current) stop = launchConfetti(confettiRef.current);
    }, 1200);

    return () => {
      clearTimeout(timer);
      stop?.();
    };
  }, [isOpen]);

  return (
    <main className={`app${isOpen ? " is-open" : ""}`}>
      <div className="bg" aria-hidden="true">
        <span className="glow" />
        <span className="glow" />
        <span className="glow" />
        <span className="grain" />
      </div>

      <div className="frame" aria-hidden="true">
        <Corners />
        <EdgeMarks />
        <span className="deco d-star-a">
          <Star />
        </span>
        <span className="deco d-heart">
          <HeartOutline />
        </span>
        <span className="deco d-dots">
          <svg viewBox="0 0 30 6" aria-hidden="true">
            <circle cx="3" cy="3" r="2.2" fill="currentColor" />
            <circle cx="15" cy="3" r="1.5" fill="currentColor" opacity="0.7" />
            <circle cx="26" cy="3" r="0.9" fill="currentColor" opacity="0.5" />
          </svg>
        </span>
        <span className="deco d-star-b">
          <Star />
        </span>
        <span className="deco d-sprig">
          <Sprig />
        </span>
      </div>

      <div className="dim" aria-hidden="true" />

      <section className="stage">
        <header className="masthead">
          <span className="crest" aria-hidden="true">
            <svg viewBox="0 0 54 14" width="54" height="14">
              <path
                transform="translate(7 7)"
                d="M0-5L1.3-1.3L5 0L1.3 1.3L0 5L-1.3 1.3L-5 0L-1.3-1.3Z"
                fill="currentColor"
              />
              <circle cx="27" cy="7" r="1.4" fill="currentColor" />
              <path
                transform="translate(47 7)"
                d="M0-5L1.3-1.3L5 0L1.3 1.3L0 5L-1.3 1.3L-5 0L-1.3-1.3Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <p className="eyebrow">
            10 <i>•</i> 01<i>•</i> 2026
          </p>
          <h1 className="heading">
            Hi, Jimar! <span className="emoji">❤️</span>
          </h1>
          <span className="divider" aria-hidden="true">
            <svg
              viewBox="0 0 120 10"
              width="120"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M2 5H46M74 5H118" opacity="0.6" />
              <circle cx="51" cy="5" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="69" cy="5" r="0.9" fill="currentColor" stroke="none" />
              <path d="M60 1.5L63.5 5L60 8.5L56.5 5Z" />
            </svg>
          </span>
        </header>

        <div className="scene" inert={isOpen}>
          <div className="float">
            <Sprig className="sprig-left" />
            <Sprig className="sprig-right" />
            <Flower />

            <button
              ref={envelopeRef}
              type="button"
              className="envelope"
              aria-label="Open the anniversary letter"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
            >
              <span className="env-shadow" />
              <span className="env-back" />
              <span className="env-paper" />
              <span className="env-front">
                <svg
                  className="env-front-art"
                  viewBox="0 0 100 68"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="ef-l" x1="0" y1="0" x2="1" y2="0.3">
                      <stop offset="0" stopColor="#f29a48" />
                      <stop offset="0.6" stopColor="#ec8329" />
                      <stop offset="1" stopColor="#e4761e" />
                    </linearGradient>
                    <linearGradient id="ef-r" x1="1" y1="0" x2="0" y2="0.3">
                      <stop offset="0" stopColor="#ee9238" />
                      <stop offset="0.6" stopColor="#e88026" />
                      <stop offset="1" stopColor="#df711b" />
                    </linearGradient>
                    <linearGradient id="ef-b" x1="0" y1="1" x2="0" y2="0.3">
                      <stop offset="0" stopColor="#f6a353" />
                      <stop offset="0.7" stopColor="#ef8c31" />
                      <stop offset="1" stopColor="#ea8329" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 50,36.7 0,68" fill="url(#ef-l)" />
                  <polygon points="100,0 50,36.7 100,68" fill="url(#ef-r)" />
                  <polygon points="0,68 50,36.7 100,68" fill="url(#ef-b)" />
                  <polyline
                    points="0,67.4 50,36.1 100,67.4"
                    fill="none"
                    stroke="rgba(120,50,5,0.28)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <polyline
                    points="0,68 50,36.7 100,68"
                    fill="none"
                    stroke="rgba(255,228,196,0.5)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="94"
                    height="62"
                    rx="1.5"
                    fill="none"
                    stroke="rgba(255,235,210,0.3)"
                    strokeWidth="1"
                    strokeDasharray="0.5 4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
              <span className="env-address">My forever baby</span>
              <span className="env-stamp">
                <svg viewBox="0 0 64 52" aria-hidden="true">
                  <rect
                    x="22"
                    y="2"
                    width="38"
                    height="46"
                    fill="#fff6e8"
                    stroke="#e88026"
                    strokeWidth="3.4"
                    strokeDasharray="0 4.6"
                    strokeLinecap="round"
                  />
                  <rect
                    x="27"
                    y="7"
                    width="28"
                    height="36"
                    fill="none"
                    stroke="rgba(185,86,15,0.45)"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M41 35C35 31 33 28.6 33 26.4A3 3 0 0 1 38.2 24.6L41 27L43.8 24.6A3 3 0 0 1 49 26.4C49 28.6 47 31 41 35Z"
                    fill="none"
                    stroke="rgba(221,116,32,0.85)"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31 15H51M34 19H48"
                    stroke="rgba(185,86,15,0.35)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18"
                    cy="25"
                    r="15"
                    fill="none"
                    stroke="rgba(80,30,5,0.3)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="18"
                    cy="25"
                    r="11"
                    fill="none"
                    stroke="rgba(80,30,5,0.24)"
                    strokeWidth="0.8"
                    strokeDasharray="1.5 2"
                  />
                  <path
                    d="M8 21q4-3 8 0t8 0t8 0t8 0M8 26q4-3 8 0t8 0t8 0t8 0M8 31q4-3 8 0t8 0t8 0t8 0"
                    fill="none"
                    stroke="rgba(80,30,5,0.22)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="env-flap">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="ef-fo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#ea7c22" />
                      <stop offset="0.9" stopColor="#d3651a" />
                    </linearGradient>
                    <linearGradient id="ef-fi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#bf5a16" />
                      <stop offset="1" stopColor="#cb6119" />
                    </linearGradient>
                  </defs>
                  <path
                    className="flap-in"
                    d="M0 4Q0 0 1.6 0H98.4Q100 0 100 4L50 100Z"
                    fill="url(#ef-fi)"
                  />
                  <path
                    className="flap-out"
                    d="M0 4Q0 0 1.6 0H98.4Q100 0 100 4L50 100Z"
                    fill="url(#ef-fo)"
                  />
                  <g className="flap-out">
                    <path
                      d="M0 4L50 100L100 4"
                      fill="none"
                      stroke="rgba(255,226,190,0.5)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M4 5L50 91L96 5"
                      fill="none"
                      stroke="rgba(255,235,210,0.3)"
                      strokeWidth="1"
                      strokeDasharray="0.5 4"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                </svg>
              </span>
              <span className="env-seal">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <radialGradient id="ws-g" cx="36%" cy="30%" r="80%">
                      <stop offset="0" stopColor="#d9603a" />
                      <stop offset="0.55" stopColor="#b53c20" />
                      <stop offset="1" stopColor="#862714" />
                    </radialGradient>
                    <radialGradient id="ws-i" cx="40%" cy="34%" r="75%">
                      <stop offset="0" stopColor="#c44a2a" />
                      <stop offset="1" stopColor="#9a3019" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M50 4C58 3 63 7 70 9C78 11 86 16 90 24C95 31 96 40 96 49C97 58 94 66 90 73C86 81 79 87 71 91C63 95 57 97 49 97C41 97 34 94 27 90C19 86 13 80 9 72C5 64 3 56 4 47C5 38 8 30 13 23C18 16 26 11 33 8C39 5 44 4 50 4Z"
                    fill="url(#ws-g)"
                  />
                  <path
                    d="M50 4C58 3 63 7 70 9C78 11 86 16 90 24C95 31 96 40 96 49C97 58 94 66 90 73C86 81 79 87 71 91C63 95 57 97 49 97C41 97 34 94 27 90C19 86 13 80 9 72C5 64 3 56 4 47C5 38 8 30 13 23C18 16 26 11 33 8C39 5 44 4 50 4Z"
                    fill="none"
                    stroke="rgba(255,190,150,0.3)"
                    strokeWidth="1.4"
                    transform="translate(-0.8 -0.8) scale(0.99)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="33"
                    fill="url(#ws-i)"
                    stroke="rgba(60,14,6,0.5)"
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="33"
                    fill="none"
                    stroke="rgba(255,190,150,0.28)"
                    strokeWidth="1"
                    transform="translate(0.9 1)"
                  />
                  <path
                    d="M50 67C36 57 31 50 31 43C31 37 35.5 33 41 33C45 33 48.5 35.5 50 39C51.5 35.5 55 33 59 33C64.5 33 69 37 69 43C69 50 64 57 50 67Z"
                    fill="rgba(40,8,3,0.55)"
                    transform="translate(1 1.2)"
                  />
                  <path
                    d="M50 67C36 57 31 50 31 43C31 37 35.5 33 41 33C45 33 48.5 35.5 50 39C51.5 35.5 55 33 59 33C64.5 33 69 37 69 43C69 50 64 57 50 67Z"
                    fill="rgba(255,200,165,0.5)"
                    transform="translate(-0.8 -1)"
                  />
                  <path
                    d="M50 67C36 57 31 50 31 43C31 37 35.5 33 41 33C45 33 48.5 35.5 50 39C51.5 35.5 55 33 59 33C64.5 33 69 37 69 43C69 50 64 57 50 67Z"
                    fill="#a7351c"
                  />
                  <ellipse
                    cx="30"
                    cy="22"
                    rx="9"
                    ry="4.2"
                    fill="rgba(255,225,200,0.32)"
                    transform="rotate(-35 30 22)"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <footer className="stage-foot">
          <p className="hint" aria-hidden={isOpen}>
            <span>Tap to open po</span> <span className="hint-emoji">💌</span>
          </p>
          <p className="footnote" aria-hidden="true">
            <span>UNO</span>
          </p>
        </footer>
      </section>

      <section className="letter-layer" inert={!isOpen}>
        <article
          className="letter"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
        >
          <div className="letter-frame" aria-hidden="true">
            <Corners />
          </div>

          <div
            className="letter-scroll"
            ref={scrollRef}
            tabIndex={0}
            aria-label="Anniversary letter"
          >
            <span className="letter-ornament" style={{ "--i": 0 }} aria-hidden="true">
              <svg
                width="84"
                height="14"
                viewBox="0 0 84 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                strokeLinecap="round"
              >
                <path d="M2 7h24M58 7h24" opacity="0.5" />
                <path d="M42 11C36 7.5 35 5.5 35 4.3A2.6 2.6 0 0 1 40 3.3L42 5.2L44 3.3A2.6 2.6 0 0 1 49 4.3C49 5.5 48 7.5 42 11Z" />
                <path
                  d="M28.5 7 30 5.5 31.5 7 30 8.5ZM52.5 7 54 5.5 55.5 7 54 8.5Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>

            <h2 id="letter-title" className="letter-title" style={{ "--i": 1 }}>
              Happy 1st Anniversary, Baby <span className="emoji">❤️</span>
            </h2>
            <span className="letter-rule" style={{ "--i": 2 }} aria-hidden="true" />

            {paragraphs.map((text, idx) => (
              <p key={text} className="letter-text" style={{ "--i": 3 + idx }}>
                {text}
              </p>
            ))}

            <p
              className="letter-closing"
              style={{ "--i": 3 + paragraphs.length }}
            >
              I love you so much, my forever baby. ❤️
            </p>
          </div>

          <footer className="letter-footer">
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden="true">✉</span> Close letter
            </button>
          </footer>
        </article>
      </section>

      <canvas ref={confettiRef} className="confetti" aria-hidden="true" />
    </main>
  );
}

export default App;