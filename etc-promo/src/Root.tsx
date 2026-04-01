import { Composition } from "remotion";
import { ETCPromo } from "./ETCPromo";

// Total duration: 90 + 120 + 120 + 120 + 100 - (4 * 15 transitions) = 490 frames
// At 30fps = ~16.3 seconds

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ETCPromo"
        component={ETCPromo}
        durationInFrames={490}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
