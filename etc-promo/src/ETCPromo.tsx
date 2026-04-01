import React from "react";
import { Sequence, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { ProofOfWorkScene } from "./scenes/ProofOfWorkScene";
import { CodeIsLawScene } from "./scenes/CodeIsLawScene";
import { ScarcityScene } from "./scenes/ScarcityScene";
import { CTAScene } from "./scenes/CTAScene";

const SCENE_DURATION = {
  hook: 90,        // ~3s
  proofOfWork: 120, // ~4s
  codeIsLaw: 120,   // ~4s
  scarcity: 120,    // ~4s
  cta: 100,         // ~3.3s
};

const TRANSITION_FRAMES = 15;

const FadeTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, TRANSITION_FRAMES], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - TRANSITION_FRAMES, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export const ETCPromo: React.FC = () => {
  let offset = 0;

  const scenes = [
    { Component: HookScene, duration: SCENE_DURATION.hook },
    { Component: ProofOfWorkScene, duration: SCENE_DURATION.proofOfWork },
    { Component: CodeIsLawScene, duration: SCENE_DURATION.codeIsLaw },
    { Component: ScarcityScene, duration: SCENE_DURATION.scarcity },
    { Component: CTAScene, duration: SCENE_DURATION.cta },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      {scenes.map(({ Component, duration }, i) => {
        const from = offset;
        // Overlap scenes by transition frames for smooth fade
        offset += duration - (i < scenes.length - 1 ? TRANSITION_FRAMES : 0);

        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <FadeTransition durationInFrames={duration}>
              <AbsoluteFill>
                <Component />
              </AbsoluteFill>
            </FadeTransition>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
