import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
const workflows = [
  {
    name: "Lead capture",
    input: "NEW ENQUIRY",
    output: "READY TO REPLY",
    description:
      "Collect the details. Understand the need. Give your team a useful brief.",
  },
  {
    name: "Onboarding",
    input: "NEW CLIENT",
    output: "READY TO GO",
    description:
      "Welcome the client. Gather essentials. Prepare a smooth handoff.",
  },
  {
    name: "Support",
    input: "NEW QUESTION",
    output: "ANSWER OR HANDOFF",
    description:
      "Find approved context. Help with the routine. Hand complex cases to a person.",
  },
];
const traces = Array.from({ length: 9 }, (_, i) => {
  const x = 214 + i * 12,
    spread = 30 + i * 7;
  return `M ${x} 198 V ${172 - i * 6} L ${x - spread} ${172 - i * 6 - spread} V ${20 + (i % 3) * 14}`;
});
type ProcessorProps = {
  active: number;
  immersed: boolean;
  onSelect: (index: number) => void;
};

export default function Processor({
  active,
  immersed,
  onSelect,
}: ProcessorProps) {
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
      data-workflow={active}
      data-immersed={immersed}
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
      {immersed && (
        <div className="processor-stage-badge" aria-live="polite">
          <span>WORKFLOW 0{active + 1} / 03</span>
          <strong>{workflows[active].name}</strong>
        </div>
      )}
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
                      stroke="var(--signal-color)"
                      strokeWidth="2.2"
                      pathLength="100"
                      className={`signal signal-bloom signal-side-${side}`}
                      filter="url(#signal-glow)"
                      style={
                        {
                          "--delay": `${-(i * 0.7 + side * 1.2)}s`,
                        } as CSSProperties
                      }
                    />
                    <path
                      d={d}
                      stroke="var(--signal-highlight)"
                      strokeWidth="1.5"
                      pathLength="100"
                      className={`signal signal-side-${side}`}
                      style={
                        {
                          "--delay": `${-(i * 0.7 + side * 1.2)}s`,
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
          <svg
            className="board-workflow-overlay"
            viewBox="0 0 520 520"
            fill="none"
          >
            <g className="board-route route-capture">
              <path
                className="route-track"
                d="M28 172h100l76 76M316 274l75 74h101"
              />
              <path
                className="route-flow"
                d="M28 172h100l76 76M316 274l75 74h101"
                pathLength="100"
              />
              <circle className="route-node" cx="52" cy="172" r="10" />
              <circle className="route-node route-node-late" cx="465" cy="348" r="10" />
            </g>
            <g className="board-route route-onboard">
              <path
                className="route-track"
                d="M122 24v93l86 87M260 22v144M398 24v93l-86 87M208 312l-86 87v94M312 312l86 87v94"
              />
              <path
                className="route-flow"
                d="M122 24v93l86 87M260 22v144M398 24v93l-86 87M208 312l-86 87v94M312 312l86 87v94"
                pathLength="100"
              />
              <circle className="route-node" cx="260" cy="64" r="9" />
              <circle className="route-node route-node-late" cx="122" cy="455" r="9" />
              <circle className="route-node route-node-late" cx="398" cy="455" r="9" />
            </g>
            <g className="board-route route-support">
              <path
                className="route-track"
                d="M22 260h130l58-58M310 202l58-58h130M310 318l58 58h130"
              />
              <path
                className="route-flow"
                d="M22 260h130l58-58M310 202l58-58h130M310 318l58 58h130"
                pathLength="100"
              />
              <circle className="route-ring" cx="260" cy="260" r="113" />
              <circle className="route-ring route-ring-outer" cx="260" cy="260" r="150" />
              <circle className="route-node" cx="52" cy="260" r="9" />
              <circle className="route-node route-node-late" cx="465" cy="376" r="9" />
            </g>
          </svg>
          <div className="board-focus-marker focus-capture">
            <span>01</span>
            <strong>CAPTURE</strong>
          </div>
          <div className="board-focus-marker focus-onboard">
            <span>02</span>
            <strong>PREPARE</strong>
          </div>
          <div className="board-focus-marker focus-support">
            <span>03</span>
            <strong>RESOLVE</strong>
          </div>
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
          <small>{immersed ? "PHASE 01 / INPUT" : "INPUT / 01"}</small>
          {workflows[active].input}
        </span>
      </div>
      <div className="processor-callout output-callout">
        <span className="callout-point" />
        <span>
          <small>{immersed ? "PHASE 02 / OUTCOME" : "OUTPUT / 02"}</small>
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
              onClick={() => onSelect(i)}
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
