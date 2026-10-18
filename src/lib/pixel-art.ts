export const px = (n: number) => `calc(${n} * var(--px))`;

const far = (n: number) => `calc(100% - ${n} * var(--px))`;

export const steppedPolygon = (steps: number[]) => {
  const corner: [number, number][] = [];
  for (let row = steps.length - 1; row >= 0; row--) {
    corner.push([steps[row], row + 1], [steps[row], row]);
  }

  const topLeft = corner.map(([x, y]) => `${px(x)} ${px(y)}`);
  const topRight = [...corner].reverse().map(([x, y]) => `${far(x)} ${px(y)}`);
  const bottomRight = corner.map(([x, y]) => `${far(x)} ${far(y)}`);
  const bottomLeft = [...corner].reverse().map(([x, y]) => `${px(x)} ${far(y)}`);

  return `polygon(${[...topLeft, ...topRight, ...bottomRight, ...bottomLeft].join(", ")})`;
};

export const OUTLINE_STYLE = { padding: px(1), clipPath: steppedPolygon([2, 1]) };
export const INNER_CLIP_PATH = steppedPolygon([1]);
