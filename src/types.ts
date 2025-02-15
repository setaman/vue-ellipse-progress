import type { App, Component, ConcreteComponent, CSSProperties } from "vue";

export type VeProgressComponent = ConcreteComponent<VeProgressProps>;
export type VeProgressPluginInstallFunction = (app: App, props?: Partial<VeProgressProps>) => void;
export type VeProgressPlugin = {
  install: VeProgressPluginInstallFunction;
};

declare const VeProgress: VeProgressComponent;
declare const VeProgressPlugin: VeProgressPlugin;
declare const install: VeProgressPlugin;

export default VeProgressPlugin;
export { install, VeProgress };

declare module "vue" {
  interface GlobalComponents {
    VeProgress: VeProgressComponent;
  }
}

export interface Gradient {
  colors: {
    color: string;
    offset: string;
    opacity?: string;
  }[];
  //@defaultValue false
  radial?: boolean;
}

export interface CounterTick {
  currentValue: number;
  currentFormattedValue: string;
}

export type Color = string | Gradient;

export enum Lines {
  round = "round",
  butt = "butt",
  square = "square",
}

export enum LineModes {
  center = "center",
  out = "out",
  in = "in",
  inOver = "in-over",
  outOver = "out-over",
  top = "top",
  bottom = "bottom",
}

export enum LinePositions {
  center = "center",
  out = "out",
  in = "in",
}

export enum Animations {
  default = "default",
  rs = "rs",
  loop = "loop",
  reverse = "reverse",
  bounce = "bounce",
}

export type Offset = number;
export type Duration = number;
export type Delay = number;
export type Legend = `${number}` | `${number}${"," | "."}${number}`;
export type LineMode = LineModes | `${LineModes} ${Offset}`;
export type LinePosition = LinePositions | `${LinePositions} ${Offset}`;
export type DashCount = number;
export type DashSpacing = number;
export type Dash = `strict ${DashCount} ${DashSpacing}` | `${DashCount} ${DashSpacing}`;
export type Animation =
  | Animations
  | `${Animations} ${Duration}`
  | `${Animations} ${Duration} ${Delay}`;

export interface Loader extends Pick<VeProgressProps, "color" | "thickness" | "line" | "lineMode"> {
  //@defaultValue 0.55
  opacity?: number;
  //@defaultValue 1000
  duration?: number;
}
export type Thickness = number | `${number}%`;
export type DotSizeString = `${number}` | `${number}%`;
export type DotColor = string;
export type DotString = `${DotSizeString}` | `${DotSizeString} ${DotColor}`;
export interface DotObject extends CSSProperties {
  size: DotString;
}
export type Dot = number | DotString | DotObject;
export type DataProps = Partial<Omit<VeProgressProps, "lineMode" | "emptyThickness" | "legend">>;
export type Data = DataProps[];

export interface VeProgressProps {
  progress: number;
  //@defaultValue 200
  size?: number;
  //@defaultValue Lines.round
  line?: Lines;
  //@defaultValue "#3f79ff"
  color?: Color;
  //@defaultValue "transparent"
  colorFill?: Color;
  //@defaultValue "#e6e9f0"
  emptyColor?: Color;
  //@defaultValue "transparent"
  emptyColorFill?: Color;
  //@defaultValue "5%"
  thickness?: Thickness;
  //@defaultValue "5%"
  emptyThickness?: Thickness;
  //@defaultValue LineModes.center
  lineMode?: LineMode;
  //@defaultValue LinePositions.center
  linePosition?: LinePosition;
  //@defaultValue LinePositions.center
  emptyLinePosition?: LinePosition;
  legend?: Legend;
  hideLegend?: boolean;
  legendFormatter?: (value: CounterTick) => string;
  animation?: Animation;
  loading?: boolean;
  determinate?: boolean;
  noData?: boolean;
  half?: boolean;
  gap?: number;
  reverse?: boolean;
  loader?: Loader;
  //@defaultValue -90
  angle?: number;
  //@defaultValue "1rem"
  fontSize?: number;
  //@defaultValue "gray"
  fontColor?: string;
  legendClass?: string;
  dash?: Dash;
  dot?: Dot;
  data?: Data;
}
