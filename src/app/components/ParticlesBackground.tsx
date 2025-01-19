"use client";

import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: "#000" } },
        particles: {
          color: { value: "#fff" },
          links: { enable: true, color: "#fff", distance: 150 },
          move: { enable: true, speed: 2 },
          size: { value: 3 },
        },
      }}
    />
  );
}
