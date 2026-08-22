import React from "react";
import MagicBento from "../Animation/MagicBento";
import "./Features.css";

function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-heading">
          <span className="features-label">CAPABILITIES</span>
          <h2>
            Everything you need to
            <span> track your code.</span>
          </h2>
          <p>
            Code Chronicle provides the essential operations for creating
            repositories, tracking changes, synchronizing code, and working
            with different versions of your project.
          </p>
        </div>
        <div className="features-bento">
          <MagicBento
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={8}
            glowColor="105, 117, 101"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;