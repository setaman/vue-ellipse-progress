import { useCircle } from "@/components/Circle/useCircle.ts";
import type { ParsedProps } from "@/components/Circle/useParsedProps.ts";

export const useCircleLoader = (props: ParsedProps) => {
  const circle = useCircle(props);

  return {
    ...circle,
  };
};
