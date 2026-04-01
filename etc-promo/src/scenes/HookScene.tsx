import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { ETCLogo } from "./ETCLogo";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });

  const textOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [15, 30], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subTextOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subTextY = interpolate(frame, [35, 50], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pulseGlow = interpolate(
    frame,
    [0, 30, 60, 90],
    [0.3, 0.8, 0.3, 0.8],
    { extrapolateRight: "clamp" }
  );

  // Particle effect
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const delay = i * 3;
    const progress = interpolate(frame, [delay, delay + 40], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const radius = 80 + progress * 200;
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 0]);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity, size: 2 + Math.random() * 3 };
  });

  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(180deg, #0a0a1a 0%, #0d1117 50%, #0a0a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(58,184,58,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,184,58,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "40%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "#3AB83A",
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "2px solid rgba(58,184,58,0.3)",
          boxShadow: `0 0 ${40 * pulseGlow}px rgba(58,184,58,${pulseGlow * 0.4})`,
        }}
      />

      <div style={{ transform: `scale(${logoScale})`, marginBottom: 40 }}>
        <ETCLogo size={180} glow />
      </div>

      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "white",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          STOP SLEEPING
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#3AB83A",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-1px",
            lineHeight: 1.1,
          }}
        >
          ON THIS.
        </div>
      </div>

      <div
        style={{
          opacity: subTextOpacity,
          transform: `translateY(${subTextY}px)`,
          marginTop: 24,
          fontSize: 22,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        Ethereum Classic
      </div>
    </div>
  );
};
