import { durationRegex } from "@src/content/config";
import * as tinyduration from "tinyduration";

/**
 * Date utilities.
 */
export const readableDuration = (duration: string): string => {
  if (!durationRegex.test(duration)) {
    throw new Error("Must be a ISO-8601 duration to parse to human readable.");
  }
  const parsed = tinyduration.parse(duration);
  let output = "";
  if (parsed.minutes) {
    output = `${parsed.minutes} mins`;
  }
  if (parsed.hours) {
    output = `${parsed.hours} hr, ${output}`;
  }

  return output;
};
