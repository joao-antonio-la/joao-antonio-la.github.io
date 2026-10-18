import arrowImage from "@/assets/icons/ui/arrow.png";
import { PixelIcon, type IconProps } from "./PixelIcon";

const DIRECTION_CLASSES = {
  left: "",
  right: "-scale-x-100",
  up: "rotate-90",
  down: "-rotate-90",
  "up-right": "rotate-135",
};

type PixelArrowProps = IconProps & {
  direction?: keyof typeof DIRECTION_CLASSES;
};

export const PixelArrow = ({ direction = "left", className }: PixelArrowProps) => {
  return <PixelIcon src={arrowImage} className={className} shapeClassName={DIRECTION_CLASSES[direction]} />;
};
