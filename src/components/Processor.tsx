import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
const workflows = [
  {
    name: "Lead capture",
    input: "NEW ENQUIRY",
    output: "QUALIFIED LEAD",
    description:
      "Capture an enquiry. Understand the opportunity. Connect it to your team.",
  },
  {
    name: "Onboarding",
    input: "NEW CLIENT",
    output: "READY TO GO",
    description:
      "Welcome a client. Prepare their workspace. Start the relationship smoothly.",
  },
  {
    name: "Support",
    input: "NEW QUESTION",
    output: "RIGHT ANSWER",
    description:
      "Understand a question. Find the context. Route it to the right answer.",
  },
];
const traces = Array.from({ length: 9 }, (_, i) => {
  const x = 214 + i * 12,
    spread = 30 + i * 7;
  return `M ${x} 198 V ${172 - i * 6} L ${x - spread} ${172 - i * 6 - spread} V ${20 + (i % 3) * 14}`;
});
export default function Processor() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(true);
  const scene = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLDivElement>(null);
  const animationPaused = paused || reducedMotion || !visible;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (scene.current) observer.observe(scene.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (animationPaused || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    artwork.current?.style.setProperty(
      "--tilt-x",
      `${(event.clientY - rect.top - rect.height / 2) / 90}deg`,
    );
    artwork.current?.style.setProperty(
      "--tilt-y",
      `${(event.clientX - rect.left - rect.width / 2) / 90}deg`,
    );
  }
  return (
    <div
      ref={scene}
      className={`processor-scene ${animationPaused ? "motion-paused" : ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        artwork.current?.style.setProperty("--tilt-x", "0deg");
        artwork.current?.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <div className="processor-topline">
        <span>
          <span className="status-dot" /> DALAUX ENGINE
        </span>
        <button
          className="motion-button"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play processor animation" : "Pause processor animation"
          }
          aria-pressed={paused}
          disabled={reducedMotion}
        >
          {reducedMotion ? "REDUCED MOTION" : paused ? "PLAY" : "PAUSE"}{" "}
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        </button>
      </div>
      <div className="processor-art" ref={artwork} aria-hidden="true">
        <div className="board-shadow" />
        <div className="circuit-board">
          <div className="board-edge" />
          <svg className="circuit-traces" viewBox="0 0 520 520" fill="none">
            <defs>
              <radialGradient id="board-glow">
                <stop stopColor="#7897a6" stopOpacity=".16" />
                <stop offset="1" stopColor="#192126" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="copper">
                <stop stopColor="#687678" />
                <stop offset=".5" stopColor="#a1acaa" />
                <stop offset="1" stopColor="#414d50" />
              </linearGradient>
              <filter id="signal-glow">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>
            <rect
              x="0"
              y="0"
              width="520"
              height="520"
              rx="20"
              fill="url(#board-glow)"
            />
            {[0, 90, 180, 270].map((rotation, side) => (
              <g key={rotation} transform={`rotate(${rotation} 260 260)`}>
                {traces.map((d, i) => (
                  <g key={i}>
                    <path d={d} stroke="url(#copper)" strokeWidth="1.15" />
                    <path
                      d={d}
                      stroke="#a2e2ff"
                      strokeWidth="2.2"
                      pathLength="100"
                      className="signal signal-bloom"
                      filter="url(#signal-glow)"
                      style={
                        {
                          "--delay": `${-(i * 0.7 + side * 1.2 + active * 0.4)}s`,
                        } as CSSProperties
                      }
                    />
                    <path
                      d={d}
                      stroke="#d1f4ff"
                      strokeWidth="1.5"
                      pathLength="100"
                      className="signal"
                      style={
                        {
                          "--delay": `${-(i * 0.7 + side * 1.2 + active * 0.4)}s`,
                        } as CSSProperties
                      }
                    />
                  </g>
                ))}
                <path
                  d="M35 90h35l36 36v30l54 54v95l-65 65H25M455 28v65l-44 44v41l-65 65v85l45 45v57h65"
                  stroke="#536269"
                  strokeWidth=".8"
                />
                {[24, 52, 80].map((x, i) => (
                  <g key={x}>
                    <rect
                      x={x + 33}
                      y="38"
                      width="17"
                      height="32"
                      rx="2"
                      fill="#101619"
                      stroke="#647075"
                      strokeWidth=".6"
                    />
                    <path
                      d={`M${x + 37} 37v-5m8 5v-5m-8 39v5m8-5v5`}
                      stroke="#a4a99c"
                      strokeWidth="2"
                    />
                    <circle cx={420 + i * 19} cy="45" r="3" stroke="#708185" />
                    <circle cx="58" cy={157 + i * 20} r="3" fill="#b2b5a8" />
                  </g>
                ))}
              </g>
            ))}
            {[24, 496].flatMap((x) =>
              [24, 496].map((y) => (
                <g key={`${x}-${y}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="7"
                    fill="#111719"
                    stroke="#818580"
                    strokeWidth="2"
                  />
                  <path d={`M${x - 3} ${y + 3}l6-6`} stroke="#adb2ac" />
                </g>
              )),
            )}
          </svg>
          <div className="board-label">
            DLX–01
            <br />
            <span>INTELLIGENCE CORE</span>
          </div>
          <div className="board-label board-label-bottom">
            DESIGNED TO CONNECT
          </div>
          <div className="processor-socket" />
          <div className="chip-pins pins-horizontal" />
          <div className="chip-pins pins-vertical" />
          <div className="processor-chip">
            <div className="chip-surface">
              <span className="chip-model">DLX / NEURAL ENGINE</span>
              <span className="chip-brand">
                dalaux<span>.</span>
              </span>
              <span className="chip-rule" />
              <span className="chip-description">INTELLIGENCE, APPLIED.</span>
              <span className="chip-status" />
            </div>
          </div>
          <div className="memory-unit memory-one">
            <i />
            <i />
            <i />
          </div>
          <div className="memory-unit memory-two">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="processor-callout input-callout">
        <span className="callout-point" />
        <span>
          <small>INPUT / 01</small>
          {workflows[active].input}
        </span>
      </div>
      <div className="processor-callout output-callout">
        <span className="callout-point" />
        <span>
          <small>OUTPUT / 02</small>
          {workflows[active].output}
        </span>
      </div>
      <div className="processor-controls">
        <div
          className="workflow-switcher"
          role="group"
          aria-label="Choose a workflow demonstration"
        >
          {workflows.map((workflow, i) => (
            <button
              key={workflow.name}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              {workflow.name}
            </button>
          ))}
        </div>
        <p aria-live="polite">{workflows[active].description}</p>
        <span className="demo-label">INTERACTIVE CONCEPT · NO LIVE DATA</span>
      </div>
    </div>
  );
}
