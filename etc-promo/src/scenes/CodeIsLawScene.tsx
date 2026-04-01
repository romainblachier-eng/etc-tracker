import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

export const CodeIsLawScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title - typewriter effect
  const titleText = "CODE IS LAW.";
  const charsVisible = Math.floor(
    interpolate(frame, [0, 40], [0, titleText.length], {
      extrapolateRight: "clamp",
    })
  );

  const cursorOpacity = frame % 20 < 10 ? 1 : 0;

  const descOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const descY = interpolate(frame, [45, 60], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const words = [
    { text: "IMMUTABLE", delay: 65 },
    { text: "UNSTOPPABLE", delay: 80 },
    { text: "UNTAMPERABLE", delay: 95 },
  ];

  // Animated border
  const borderProgress = interpolate(frame, [0, 60], [0, 4], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        background: "#0a0a1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 30px",
      }}
    >
      {/* Animated corner borders */}
      {borderProgress > 0 && (
        <>
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 30,
              width: Math.min(borderProgress, 1) * 80,
              height: 3,
              backgroundColor: "#3AB83A",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 30,
              width: 3,
              height: Math.max(0, Math.min(borderProgress - 1, 1)) * 80,
              backgroundColor: "#3AB83A",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 30,
              width: Math.max(0, Math.min(borderProgress - 2, 1)) * 80,
              height: 3,
              backgroundColor: "#3AB83A",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 30,
              width: 3,
              height: Math.max(0, Math.min(borderProgress - 3, 1)) * 80,
              backgroundColor: "#3AB83A",
            }}
          />
        </>
      )}

      {/* Code lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
          padding: "0 20px",
          opacity: 0.06,
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              height: 2,
              backgroundColor: "#3AB83A",
              width: `${30 + ((i * 37) % 60)}%`,
              marginLeft: i % 3 === 0 ? 0 : i % 3 === 1 ? 30 : 60,
            }}
          />
        ))}
      </div>

      {/* Main title with typewriter */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: "#3AB83A",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "2px",
          position: "relative",
          textAlign: "center",
        }}
      >
        {titleText.slice(0, charsVisible)}
        <span
          style={{
            opacity: charsVisible < titleText.length ? cursorOpacity : 0,
            color: "#3AB83A",
          }}
        >
          |
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          fontSize: 20,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginTop: 20,
          maxWidth: 340,
          lineHeight: 1.5,
        }}
      >
        Not just a slogan.
        <br />
        It's the foundation of ETC.
      </div>

      {/* Word stamps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          marginTop: 50,
        }}
      >
        {words.map((word, i) => {
          const stampScale = spring({
            frame: Math.max(0, frame - word.delay),
            fps,
            config: { damping: 6, stiffness: 200 },
          });
          const stampOpacity = interpolate(
            frame,
            [word.delay, word.delay + 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                opacity: stampOpacity,
                transform: `scale(${stampScale})`,
                fontSize: 32,
                fontWeight: 900,
                color: "white",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "4px",
                padding: "8px 24px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
              }}
            >
              {word.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
