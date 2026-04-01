import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export const ProofOfWorkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  const features = [
    { icon: "⛏️", label: "Real Miners", delay: 20 },
    { icon: "🔒", label: "Real Security", delay: 35 },
    { icon: "🌐", label: "Real Decentralization", delay: 50 },
  ];

  // Animated hash characters scrolling
  const hashChars = "0123456789abcdef";
  const hashRows = Array.from({ length: 8 }, (_, row) => {
    return Array.from({ length: 24 }, (_, col) => {
      const charIndex = Math.floor((frame * 2 + row * 7 + col * 3) % hashChars.length);
      return hashChars[charIndex];
    }).join("");
  });

  const noShortcutsOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateRight: "clamp",
  });
  const noShortcutsScale = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 8 } });

  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(180deg, #0d1117 0%, #0a1a0a 50%, #0d1117 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 30px",
      }}
    >
      {/* Scrolling hash background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.08,
          fontFamily: "monospace",
          fontSize: 16,
          color: "#3AB83A",
          lineHeight: 2.2,
          letterSpacing: 3,
        }}
      >
        {hashRows.map((row, i) => (
          <div key={i}>{row}</div>
        ))}
      </div>

      {/* Title */}
      <div
        style={{
          transform: `scale(${titleSpring})`,
          fontSize: 18,
          color: "#3AB83A",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        PROOF OF WORK
      </div>

      <div
        style={{
          transform: `scale(${titleSpring})`,
          fontSize: 40,
          fontWeight: 900,
          color: "white",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          lineHeight: 1.15,
          marginBottom: 50,
        }}
      >
        While others chose
        <br />
        <span style={{ color: "#3AB83A" }}>Proof of Stake</span>,
        <br />
        ETC stayed true.
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 340,
        }}
      >
        {features.map((feat, i) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - feat.delay),
            fps,
            config: { damping: 12 },
          });
          const itemOpacity = interpolate(
            frame,
            [feat.delay, feat.delay + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${(1 - itemSpring) * 80}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(58,184,58,0.1)",
                border: "1px solid rgba(58,184,58,0.3)",
                borderRadius: 16,
                padding: "16px 24px",
              }}
            >
              <span style={{ fontSize: 32 }}>{feat.icon}</span>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {feat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* No shortcuts */}
      <div
        style={{
          opacity: noShortcutsOpacity,
          transform: `scale(${noShortcutsScale})`,
          marginTop: 40,
          fontSize: 28,
          fontWeight: 900,
          color: "#3AB83A",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "2px",
        }}
      >
        NO SHORTCUTS.
      </div>
    </div>
  );
};
