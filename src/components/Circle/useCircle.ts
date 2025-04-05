import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  type MaybeRefOrGetter,
  toValue,
  useId,
} from "vue";
import {
  baseRadius,
  emptyRadius,
  fillRadius,
  previousCirclesThickness,
  radius,
} from "@/components/Circle/radiusCalculation.ts";
import { type CircleProps, isValidNumber } from "@/utils.js";
import { useParsedProps } from "@/components/Circle/useParsedProps.ts";
import type { ParsedDashObject } from "@/components/optionsParser.ts";

const wait = (ms = 400) => new Promise((resolve) => setTimeout(() => resolve(""), ms));

export const useCircle = (props: MaybeRefOrGetter<CircleProps>) => {
  const {
    progress,
    size,
    color,
    colorFill,
    animation,
    dash,
    angle,
    emptyColor,
    emptyColorFill,
    line,
    lineMode,
    linePosition,
    emptyLinePosition,
    thickness,
    emptyThickness,
    loading,
    loader,
    dot,
    globalDot,
    globalThickness,
    gap,
    globalGap,
    previousCircles,
  } = useParsedProps(props);
  const circleId = useId();

  const circleRef = ref<SVGCircleElement | null>(null);
  const isInitialized = ref(false);
  const isAnimationPlaying = ref(false);

  const circumference = computed(() => {
    return radiusValue.value * 2 * Math.PI;
  });
  const position = computed(() => {
    return size.value / 2;
  });
  const progressOffset = computed(() => calculateProgressOffset(circumference.value));
  const radiusValue = computed(() => {
    if (toValue(props).multipleCircles) {
      const previousCirclesRadius = previousCirclesThickness(
        toValue(props).index,
        gap.value,
        globalGap.value,
        previousCircles.value,
        globalDot.value.size,
        globalThickness.value
      );
      return baseRadius(size.value, thickness.value, dot.value.size) - previousCirclesRadius;
    }
    return radius({
      thickness: thickness.value,
      emptyThickness: emptyThickness.value,
      dotSize: dot.value.size,
      lineMode: lineMode.value,
      size: size.value,
    });
  });
  const fillRadiusValue = computed(() =>
    fillRadius(linePosition.value, thickness.value, radiusValue.value)
  );
  const emptyRadiusValue = computed(() =>
    emptyRadius({
      thickness: thickness.value,
      emptyThickness: emptyThickness.value,
      dotSize: dot.value.size,
      lineMode: lineMode.value,
      size: size.value,
    })
  );
  const emptyFillRadiusValue = computed(() =>
    fillRadius(emptyLinePosition.value, emptyThickness.value, emptyRadiusValue.value)
  );
  const dataIsAvailable = computed(
    () => isValidNumber(toValue(props).progress) && !toValue(props).noData
  );
  const animationClass = computed(() => [
    isAnimationPlaying.value && "ep-animation-playing",
    `animation__${
      !toValue(props).loading && dataIsAvailable.value && isInitialized.value
        ? animation.value.type
        : "none"
    }`,
  ]);
  const animationDuration = computed(() => `${animation.value.duration}ms`);
  const circleColor = computed(() =>
    typeof color.value === "object" && Array.isArray(color.value.colors)
      ? `url(#ep-progress-gradient-${circleId})`
      : (color.value as string)
  );
  const circleEmptyColor = computed(() =>
    typeof emptyColor.value === "object" && Array.isArray(emptyColor.value.colors)
      ? `url(#ep-empty-gradient-${circleId})`
      : (emptyColor.value as string)
  );
  const circleColorFill = computed(() =>
    typeof colorFill.value === "object" && Array.isArray(colorFill.value.colors)
      ? `url(#ep-progress-fill-gradient-${circleId})`
      : (colorFill.value as string)
  );
  const circleEmptyColorFill = computed(() =>
    typeof emptyColorFill.value === "object" && Array.isArray(emptyColorFill.value.colors)
      ? `url(#ep-empty-fill-gradient-${circleId})`
      : (emptyColorFill.value as string)
  );
  const transformOrigin = computed(() => "50% 50%");
  const emptyDasharray = computed(() => {
    if (typeof toValue(props).dash !== "object") {
      return toValue(props).dash;
    }
    return `${2 * Math.PI * emptyRadiusValue.value * getDashPercent()},
            ${2 * Math.PI * emptyRadiusValue.value * getDashSpacingPercent()}`.trim();
  });
  const strokeDashOffset = computed(() =>
    dataIsAvailable.value && !toValue(props).loading && isInitialized.value
      ? progressOffset.value
      : circumference.value
  );
  const styles = computed(() => ({
    transition: `${animationDuration.value}, opacity 0.3s`,
    strokeDashoffset: strokeDashOffset.value,
    transitionTimingFunction: "ease-in-out",
    transformOrigin: transformOrigin.value,
    opacity: toValue(props).loading || !dataIsAvailable.value ? 0 : 1,
    "--ep-circumference": circumference.value,
    "--ep-negative-circumference": getNegativeCircumference(),
    "--ep-double-circumference": getDoubleCircumference(),
    "--ep-stroke-offset": progressOffset.value,
    "--ep-loop-stroke-offset": getLoopOffset(),
    "--ep-bounce-out-stroke-offset": getBounceOutOffset(),
    "--ep-bounce-in-stroke-offset": getBounceInOffset(),
    "--ep-reverse-stroke-offset": getReverseOffset(),
    "--ep-loading-stroke-offset": circumference.value * 0.2,
    "animation-duration": animationDuration.value,
  }));
  const isLoading = computed(
    () => (toValue(props).determinate || toValue(props).loading) && dataIsAvailable.value
  );

  function calculateProgressOffset(pathLength: number) {
    const offset = pathLength - (toValue(props).progress / 100) * pathLength;
    if (Math.abs(pathLength - offset) < 1) return pathLength - 0.5;
    return offset;
  }

  function getDashSpacingPercent() {
    const dashObject = dash.value as ParsedDashObject;
    return dashObject.spacing / dashObject.count;
  }

  function getDashPercent() {
    const dashObject = dash.value as ParsedDashObject;
    return (1 - dashObject.spacing) / dashObject.count;
  }

  function getNegativeCircumference() {
    return circumference.value * -1;
  }

  function getDoubleCircumference() {
    return circumference.value * 2;
  }

  function getLoopOffset() {
    return getNegativeCircumference() - (circumference.value - progressOffset.value);
  }

  function getReverseOffset() {
    return getDoubleCircumference() + progressOffset.value;
  }

  function getBounceOutOffset() {
    return progressOffset.value < 100 ? 0 : progressOffset.value - 100;
  }

  function getBounceInOffset() {
    return circumference.value - progressOffset.value < 100
      ? progressOffset.value
      : progressOffset.value + 100;
  }

  function toggleIsAnimationPlaying() {
    nextTick(() => {
      isAnimationPlaying.value = !isAnimationPlaying.value;
    });
  }

  onMounted(async () => {
    if (circleRef.value) {
      // this is only required for older MacOS/IOS versions and Safari. On Apple system the transition is triggered
      // right after initial animation causing the progress line rendered twice. So we track animation state to
      // add/remove CSS transition properties
      circleRef.value.addEventListener("animationstart", toggleIsAnimationPlaying, false);
      circleRef.value.addEventListener("animationend", toggleIsAnimationPlaying, false);
    }
    if (animation.value.delay && !loading.value) {
      // await initial delay before applying animations
      await wait(animation.value.delay);
    }
    isInitialized.value = true;
  });

  onUnmounted(() => {
    if (circleRef.value) {
      circleRef.value.removeEventListener("animationstart", toggleIsAnimationPlaying, false);
      circleRef.value.removeEventListener("animationend", toggleIsAnimationPlaying, false);
    }
  });

  return {
    progress,
    circumference,
    isInitialized,
    isAnimationPlaying,
    progressOffset,
    position,
    radius: radiusValue,
    fillRadius: fillRadiusValue,
    emptyRadius: emptyRadiusValue,
    emptyFillRadius: emptyFillRadiusValue,
    dataIsAvailable,
    animationClass,
    animationDuration,
    color: circleColor,
    colorFill: circleColorFill,
    emptyColorFill: circleEmptyColorFill,
    emptyColor: circleEmptyColor,
    angle,
    transformOrigin,
    emptyDasharray,
    strokeDashOffset,
    styles,
    isLoading,
    line,
    thickness,
    emptyThickness,
    loader,
  };
};
