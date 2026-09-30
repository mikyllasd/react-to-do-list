// App.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";

const paragraphs = [
  "Happy 1st anniversary, baby. One year since we turned our “I like you” into “I love you,” and I’m the luckiest and most blessed person for having you.",
  "I know I’m not always the easiest person to love, and I’m really sorry for the times I hurt you, pressured you, or asked for too much.",
  "Baby, please know that I’m trying my best to love you, understand you, and treat you the way you deserve, and I’m trying to give you everything I can, everything that I’m capable of giving, because you deserve so much more.",
  "When I tell you the things that bother me, it’s never because I want to fight with you. I just don’t want to keep things inside until they become something that makes us lose each other. And I hope you’ll always feel safe enough to tell me the things that bother you too.",
  "I’m so proud of you, baby, and I’ll always pray for your happiness, your dreams, and for God to guide you in everything you do.",
  "Thank you for staying, for loving me, and for being patient with me.",
  "I want more days with you. More calls, more “I love yous,” more “Goodnight, my baby,” more “Take care, baby,” more “Good luck, baby,” and more of those little things we say to each other.",
  "I want more of us, baby.",
];

const CONFETTI_COLORS = [
  "#4fa77a", // green
  "#7fc8a0", // light green
  "#a8dcc0", // mint
  "#f48fb1", // pink
  "#f7a8c4", // soft pink
  "#fbc9da", // blush
];

// Draws falling green & pink confetti on a canvas. Returns a cleanup function.
function launchConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = w < 600 ? 90 : 160;

  const pieces = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: -20 - Math.random() * h * 0.5,
    size: 6 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 1.5,
    vy: 2 + Math.random() * 3,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.2,
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
      p.sway += 0.05;
      p.x += p.vx + Math.sin(p.sway) * 0.8;
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

    if (alive && now - start < 8000) {
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

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const envelopeRef = useRef(null);
  const scrollRef = useRef(null);
  const confettiRef = useRef(null);
  const previousOpen = useRef(false);

  // Move focus sensibly when opening / closing (skips the initial render)
  useEffect(() => {
    if (previousOpen.current === isOpen) return;
    previousOpen.current = isOpen;

    if (isOpen) {
      scrollRef.current?.focus({ preventScroll: true });
    } else {
      envelopeRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  // Escape closes the letter
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Confetti when the letter appears
  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop;
    const timer = setTimeout(() => {
      if (confettiRef.current) stop = launchConfetti(confettiRef.current);
    }, 800);

    return () => {
      clearTimeout(timer);
      stop?.();
    };
  }, [isOpen]);

  return (
    <main className={`app${isOpen ? " is-open" : ""}`}>
      {/* Background decoration */}
      <div className="bg" aria-hidden="true">
        <span className="glow" />
        <span className="glow" />
        <span className="glow" />
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="heart">♥</span>
        <span className="grain" />
      </div>

      <div className="dim" aria-hidden="true" />

      {/* Closed state */}
      <section className="stage">
        <h1 className="heading">For my forever baby ❤️</h1>

        <div className="scene" inert={isOpen}>
          <div className="float">
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
                <span className="fold fold-left" />
                <span className="fold fold-right" />
                <span className="fold fold-bottom" />
              </span>
              <span className="env-flap" />
              <span className="env-seal">♥</span>
            </button>
          </div>
        </div>

        <p className="hint" aria-hidden={isOpen}>
          Tap to open 💌
        </p>
      </section>

      {/* Opened state */}
      <section className="letter-layer" inert={!isOpen}>
        <article
          className="letter"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
        >
          <div
            className="letter-scroll"
            ref={scrollRef}
            tabIndex={0}
            aria-label="Anniversary letter"
          >
            <h2 id="letter-title" className="letter-title">
              Happy 1st Anniversary, Baby ❤️
            </h2>
            <span className="letter-rule" aria-hidden="true" />

            {paragraphs.map((text) => (
              <p key={text} className="letter-text">
                {text}
              </p>
            ))}

            <p className="letter-closing">
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

      {/* Confetti (sits above everything, never blocks taps) */}
      <canvas ref={confettiRef} className="confetti" aria-hidden="true" />
    </main>
  );
}

export default App;