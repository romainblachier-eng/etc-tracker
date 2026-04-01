import React from "react";

export const ETCLogo: React.FC<{ size?: number; glow?: boolean }> = ({
  size = 200,
  glow = false,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(58,184,58,0.4) 0%, rgba(58,184,58,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="95" fill="#1a1a2e" stroke="#3AB83A" strokeWidth="4" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="#3AB83A" strokeWidth="1" opacity="0.5" />
        {/* Diamond shape */}
        <polygon
          points="100,30 155,100 100,130 45,100"
          fill="none"
          stroke="#3AB83A"
          strokeWidth="3"
        />
        <polygon
          points="100,45 145,100 100,122 55,100"
          fill="rgba(58,184,58,0.15)"
          stroke="#3AB83A"
          strokeWidth="1.5"
        />
        {/* Lower part */}
        <polygon
          points="100,135 145,105 100,170 55,105"
          fill="none"
          stroke="#3AB83A"
          strokeWidth="2"
        />
        {/* Three horizontal lines (ETC symbol) */}
        <line x1="75" y1="88" x2="125" y2="88" stroke="#3AB83A" strokeWidth="3" />
        <line x1="80" y1="100" x2="120" y2="100" stroke="#3AB83A" strokeWidth="3" />
        <line x1="75" y1="112" x2="125" y2="112" stroke="#3AB83A" strokeWidth="3" />
      </svg>
    </div>
  );
};
