import menuImage from "@/assets/icons/ui/menu.png";
import { PixelIcon, type IconProps } from "./PixelIcon";

export const PixelMenu = ({ className }: IconProps) => {
  return <PixelIcon src={menuImage} className={className} />;
};
