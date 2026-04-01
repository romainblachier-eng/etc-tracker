import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export const ScarcityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter animation for supply number
  const targetNumber = 210_700_000;
  const counterProgress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const displayNumber = Math.floor(counterProgress * targetNumber);

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const stats = [
    { label: "Fixed Supply", value: "210.7M", icon: "📊", delay: 30 },
    { label: "Dev Community", value: "Growing", icon: "👥", delay: 45 },
    { label: "Ecosystem", value: "Expanding", icon: "🚀", delay: 60 },
  ];

  const undervaluedOpacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateRight: "clamp",
  });
  const undervaluedScale = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 8 },
  });

  // Animated progress bar
  const barWidth = interpolate(frame, [20, 70], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(180deg, #0d1117 0%, #0a0a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 30px",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(58,184,58,0.1) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          fontSize: 18,
          color: "#3AB83A",
          fontFamily: "Arial, sans-serif",
          letterSpacing: "6px",
          textTransform: "uppercase",
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        TOKENOMICS
      </div>

      {/* Counter */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 900,
          color: "white",
          fontFamily: "'Courier New', monospace",
          marginBottom: 8,
        }}
      >
        {displayNumber.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Arial, sans-serif",
          marginBottom: 30,
        }}
      >
        Maximum Supply (ETC)
      </div>

      {/* Supply bar */}
      <div
        style={{
          width: "100%",
          maxWidth: 320,
          height: 8,
          backgroundColor: "rgba(58,184,58,0.15)",
          borderRadius: 4,
          marginBottom: 40,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            background: "linear-gradient(90deg, #3AB83A, #2ecc71)",
            borderRadius: 4,
            boxShadow: "0 0 10px rgba(58,184,58,0.5)",
          }}
        />
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 340,
        }}
      >
        {stats.map((stat, i) => {
          const itemOpacity = interpolate(
            frame,
            [stat.delay, stat.delay + 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const itemX = interpolate(
            frame,
            [stat.delay, stat.delay + 12],
            [-60, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(58,184,58,0.2)",
                borderRadius: 14,
                padding: "14px 20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26 }}>{stat.icon}</span>
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {stat.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#3AB83A",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Undervalued banner */}
      <div
        style={{
          opacity: undervaluedOpacity,
          transform: `scale(${undervaluedScale})`,
          marginTop: 36,
          padding: "12px 28px",
          background: "linear-gradient(90deg, rgba(58,184,58,0.2), rgba(58,184,58,0.1))",
          border: "2px solid #3AB83A",
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: "#3AB83A",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "2px",
          }}
        >
          MASSIVELY UNDERVALUED
        </span>
      </div>
    </div>
  );
};
