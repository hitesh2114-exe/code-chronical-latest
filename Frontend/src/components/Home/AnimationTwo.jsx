import React from "react";
import Box from "@mui/material/Box";
import WebThreads from "../Animation/WebThreads";

function AnimationTwo() {
  return (
    <>
      <Box sx={{ width: "100%", height: "auto", backgroundColor: "black" }}>
        <div style={{ width: "100%", height: "300px", position: "relative" }}>
          <WebThreads
            color1="#3C3D37"
            color2="#697565"
            color3="#FFFFFF"
            speed={0.2}
            threadCount={6}
            frequency={5}
            spread={0.18}
            taper={1}
            position={0.5}
            fanMode="center"
            glow={0.02}
            falloff={0.6}
            thickness={1.1}
            brightness={0.6}
            opacity={1}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseStrength={0.3}
          />
        </div>
      </Box>
    </>
  );
}

export default AnimationTwo;
