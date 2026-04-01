import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { ETCLogo } from "./ETCLogo";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10 } });

  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [15, 30], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulsing CTA button
  const pulse = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.05, 1],
  );

  const dyorOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animated rings
  const rings = [0, 1, 2].map((i) => {
    const ringProgress = interpolate(
      (frame + i * 20) % 60,
      [0, 60],
      [0, 1]
    );
    return {
      scale: 1 + ringProgress * 2,
      opacity: interpolate(ringProgress, [0, 0.3, 1], [0, 0.3, 0]),
    };
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
      {/* Background gradient pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, rgba(58,184,58,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Expanding rings */}
      {rings.map((ring, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            width: 160,
            height: 160,
            marginLeft: -80,
            marginTop: -80,
            borderRadius: "50%",
            border: "2px solid #3AB83A",
            transform: `scale(${ring.scale})`,
            opacity: ring.opacity,
          }}
        />
      ))}

      <div style={{ transform: `scale(${logoScale})`, marginBottom: 30 }}>
        <ETCLogo size={140} glow />
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "white",
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.2,
          }}
        >
          The OG Ethereum.
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#3AB83A",
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.2,
            marginTop: 4,
          }}
        >
          Your chance is NOW.
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${pulse})`,
          marginTop: 40,
          padding: "18px 48px",
          background: "linear-gradient(135deg, #3AB83A, #2ecc71)",
          borderRadius: 50,
          boxShadow: "0 4px 30px rgba(58,184,58,0.4)",
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: "white",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "2px",
          }}
        >
          RESEARCH ETC
        </span>
      </div>

      {/* DYOR disclaimer */}
      <div
        style={{
          opacity: dyorOpacity,
          marginTop: 30,
          fontSize: 14,
          color: "rgba(255,255,255,0.4)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        DYOR — Not Financial Advice
      </div>

      {/* Bottom tag */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "3px",
          opacity: dyorOpacity,
        }}
      >
        #EthereumClassic #ETC #Crypto
      </div>
    </div>
  );
};
