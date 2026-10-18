import closeImage from "@/assets/icons/ui/close.png";
import { PixelIcon, type IconProps } from "./PixelIcon";

export const PixelClose = ({ className }: IconProps) => {
  return <PixelIcon src={closeImage} className={className} />;
};
