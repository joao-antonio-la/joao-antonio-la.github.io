const LAYER_COUNT = 3;
const STRIPS_PER_LAYER = 18;

export const WaveBackground = () => {
  return (
    <div aria-hidden className="wave-background absolute top-0 left-0 -z-10 h-full brightness-20">
      {Array.from({ length: LAYER_COUNT }, (_, layerIndex) => (
        <div key={layerIndex} className="wave-background__layer absolute flex h-full flex-col">
          {Array.from({ length: STRIPS_PER_LAYER }, (_, stripIndex) => (
            <div
              key={stripIndex}
              className="wave-background__strip w-64 flex-1 bg-accent"
              style={{ animationDelay: `-${stripIndex + 2 * layerIndex}s` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
