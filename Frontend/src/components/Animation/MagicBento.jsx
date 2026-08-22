import React, { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "105, 117, 101";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    title: "Repositories",
    description: "Organize and navigate project files seamlessly.",
    label: "Management",
  },
  {
    title: "Commits",
    description: "Track snapshot history across your codebase.",
    label: "Version Control",
  },
  {
    title: "Push & Pull",
    description: "Keep local workspace in sync with remote repositories.",
    label: "Remote Sync",
  },
  {
    title: "Clone",
    description: "Initialize workspace from existing repositories.",
    label: "Repository",
  },
  {
    title: "Revert",
    description: "Safely restore project to a previous stable build.",
    label: "Recovery",
  },
  {
    title: "CLI",
    description: "Full version control access straight from your terminal.",
    label: "Command Line",
  },
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const CardVisual = ({ type }) => {
  switch (type) {
    case "Repositories":
      return (
        <div className="card-visual repository-visual">
          <div className="repo-tree">
            <div className="repo-line repo-root">.chron</div>
            <div className="repo-line">├── commits/</div>
            <div className="repo-line">├── staging/</div>
            <div className="repo-line">└── config.json</div>
          </div>
          <div className="repo-info">
            <div><span>FILES</span><strong>24</strong></div>
            <div><span>COMMITS</span><strong>18</strong></div>
            <div><span>STATUS</span><strong>SYNCED</strong></div>
          </div>
        </div>
      );
    case "Commits":
      return (
        <div className="card-visual commits-visual">
          <div className="commit-line">
            <span className="commit-index">01</span>
            <span>Initial setup</span>
            <small>2m</small>
          </div>
          <div className="commit-line">
            <span className="commit-index">02</span>
            <span>Add auth module</span>
            <small>8m</small>
          </div>
          <div className="commit-line active">
            <span className="commit-index">03</span>
            <span>Update state</span>
            <small>now</small>
          </div>
        </div>
      );
    case "Push & Pull":
      return (
        <div className="card-visual sync-visual">
          <div className="sync-status">
            <div className="sync-node">
              <span className="sync-node-label">LOCAL</span>
              <strong>workspace</strong>
              <small>3 pending changes</small>
            </div>
            <div className="sync-flow">
              <div><span>PUSH</span><strong>→</strong></div>
              <div><span>PULL</span><strong>←</strong></div>
            </div>
            <div className="sync-node">
              <span className="sync-node-label">REMOTE</span>
              <strong>origin/main</strong>
              <small>18 commits ahead</small>
            </div>
          </div>
          <div className="sync-metrics">
            <span><b>●</b> Connected</span>
            <span>Last sync 2 min ago</span>
            <span>Up to date</span>
          </div>
        </div>
      );
    case "Clone":
      return (
        <div className="card-visual clone-visual">
          <div className="clone-box">
            <div>
              <span>REMOTE</span>
              <strong>codechronicle/repo</strong>
            </div>
            <small>origin</small>
          </div>
          <div className="clone-arrow">↓</div>
          <div className="clone-box local">
            <div>
              <span>LOCAL</span>
              <strong>./workspace</strong>
            </div>
            <small>ready</small>
          </div>
        </div>
      );
    case "Revert":
      return (
        <div className="card-visual revert-visual">
          <div className="revert-header">
            <span>SNAPSHOTS</span>
            <strong>3 versions</strong>
          </div>
          <div className="revert-line">
            <span className="revert-node"></span>
            <span className="revert-node"></span>
            <span className="revert-node active"></span>
          </div>
          <div className="revert-labels">
            <span>v1</span>
            <span>v2</span>
            <span>current</span>
          </div>
          <div className="revert-action">↶ Restore prior build</div>
        </div>
      );
    case "CLI":
      return (
        <div className="card-visual cli-visual">
          <div className="cli-topbar">
            <span>chron</span>
            <span>terminal</span>
          </div>
          <div className="cli-body">
            <div className="cli-line"><span>$</span>chron init</div>
            <div className="cli-line"><span>$</span>chron add .</div>
            <div className="cli-line"><span>$</span>chron commit -m "sync"</div>
          </div>
          <div className="cli-output">✓ workspace synchronized</div>
        </div>
      );
    default:
      return null;
  }
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach((p) => p.remove());
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const card = cardRef.current;

    const handleMouseEnter = () => {
      clearParticles();
      const { width, height } = card.getBoundingClientRect();
      for (let i = 0; i < particleCount; i++) {
        const p = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
        card.appendChild(p);
        particlesRef.current.push(p);

        gsap.to(p, {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    };

    const handleMouseLeave = () => clearParticles();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      clearParticles();
    };
  }, [disableAnimations, particleCount, glowColor, clearParticles]);

  return (
    <div ref={cardRef} className={`particle-container ${className}`}>
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, glowColor = DEFAULT_GLOW_COLOR, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
  useEffect(() => {
    if (!gridRef.current) return;

    const handleMouseMove = (e) => {
      const cards = gridRef.current.querySelectorAll(".magic-bento-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        const intensity = Math.max(0, 1 - dist / spotlightRadius);

        card.style.setProperty("--glow-x", `${x}%`);
        card.style.setProperty("--glow-y", `${y}%`);
        card.style.setProperty("--glow-intensity", intensity.toString());
        card.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gridRef, spotlightRadius]);

  return null;
};

export default function MagicBento() {
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {!isMobile && <GlobalSpotlight gridRef={gridRef} />}
      <div className="card-grid" ref={gridRef}>
        {cardData.map((card, index) => (
          <ParticleCard
            key={index}
            className="magic-bento-card magic-bento-card--border-glow"
            disableAnimations={isMobile}
          >
            <div className="magic-bento-card__header">
              <div className="magic-bento-card__label">{card.label}</div>
            </div>

            <CardVisual type={card.title} />

            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </ParticleCard>
        ))}
      </div>
    </>
  );
}