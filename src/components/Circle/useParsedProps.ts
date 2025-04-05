import { computed, type MaybeRefOrGetter, toValue, useId } from "vue";
import {
  calcThickness,
  dotParser,
  dashParser,
  lineModeParser,
  linePositionParser,
  animationParser,
  loaderParser,
} from "@/components/optionsParser.ts";
import {
  type CircleProps,
  DEFAULT_ANGLE,
  DEFAULT_COLOR,
  DEFAULT_EMPTY_COLOR,
  DEFAULT_FILL_COLOR,
  DEFAULT_GAP,
  DEFAULT_SIZE,
} from "@/utils";
import { Lines } from "@/types.ts";

export type ParsedPreviousCircle = {
  thickness: ReturnType<typeof calcThickness>;
  gap: number;
  dot: ReturnType<typeof dotParser>;
};
export interface ParsedProps
  extends Omit<
    CircleProps,
    | "lineMode"
    | "linePosition"
    | "emptyLinePosition"
    | "animation"
    | "loader"
    | "thickness"
    | "emptyThickness"
    | "globalThickness"
    | "dot"
    | "globalDot"
    | "dash"
    | "previousCircles"
  > {
  circleId: string;
  gap: number;
  globalGap: number;
  size: number;
  thickness: ReturnType<typeof calcThickness>;
  emptyThickness: ReturnType<typeof calcThickness>;
  globalThickness: ReturnType<typeof calcThickness>;
  dot: ReturnType<typeof dotParser>;
  globalDot: ReturnType<typeof dotParser>;
  dash: ReturnType<typeof dashParser>;
  lineMode: ReturnType<typeof lineModeParser>;
  linePosition: ReturnType<typeof linePositionParser>;
  emptyLinePosition: ReturnType<typeof linePositionParser>;
  animation: ReturnType<typeof animationParser>;
  loader: ReturnType<typeof loaderParser> | undefined;
  previousCircles: ParsedPreviousCircle[];
}

export const useParsedProps = (props: MaybeRefOrGetter<CircleProps>) => {
  return {
    progress: computed(() => parseFloat(toValue(props).progress || 0)),
    size: computed(() => toValue(props).size || DEFAULT_SIZE),
    gap: computed(() => toValue(props).gap || DEFAULT_GAP),
    globalGap: computed(() => toValue(props).globalGap || DEFAULT_GAP),
    color: computed(() => toValue(props).color || DEFAULT_COLOR),
    emptyColor: computed(() => toValue(props).emptyColor || DEFAULT_EMPTY_COLOR),
    colorFill: computed(() => toValue(props).colorFill || DEFAULT_FILL_COLOR),
    emptyColorFill: computed(() => toValue(props).emptyColorFill || DEFAULT_FILL_COLOR),
    line: computed(() => toValue(props).line || Lines.round),
    hideLegend: computed(() => toValue(props).hideLegend || false),
    angle: computed(() => toValue(props).angle || DEFAULT_ANGLE),
    loading: computed(() => toValue(props).loading || false),
    thickness: computed(() => calcThickness(toValue(props).thickness, toValue(props).size)),
    emptyThickness: computed(() =>
      calcThickness(toValue(props).emptyThickness, toValue(props).size)
    ),
    globalThickness: computed(() =>
      calcThickness(toValue(props).globalThickness, toValue(props).size)
    ),
    dot: computed(() => dotParser(toValue(props).dot, toValue(props).size)),
    globalDot: computed(() => dotParser(toValue(props).globalDot, toValue(props).size)),
    dash: computed(() => dashParser(toValue(props).dash)),
    lineMode: computed(() => lineModeParser(toValue(props).lineMode)),
    linePosition: computed(() => linePositionParser(toValue(props).linePosition)),
    emptyLinePosition: computed(() => linePositionParser(toValue(props).emptyLinePosition)),
    animation: computed(() => animationParser(toValue(props).animation)),
    loader: computed(() =>
      toValue(props).loader ? loaderParser(toValue(props).loader, toValue(props)) : undefined
    ),
    previousCircles: computed<ParsedPreviousCircle[]>(() =>
      (toValue(props).previousCircles ?? []).map((circle) => ({
        thickness: calcThickness(circle.thickness, toValue(props).size),
        gap: circle.gap || DEFAULT_GAP,
        dot: dotParser(circle.dot, toValue(props).size),
      }))
    ),
  };
};
