import { SyntheticEvent } from "react";

export const withStopPropagation =
  <T extends SyntheticEvent>(fn?: (event: T) => void) =>
  (event: T) => {
    event.stopPropagation();

    if (fn) {
      fn(event);
    }
  };

export const withPreventDefault =
  <T extends SyntheticEvent>(fn?: (event: T) => void) =>
  (event: T) => {
    event.preventDefault();

    if (fn) {
      fn(event);
    }
  };

export const withTargetValue =
  <T extends unknown>(fn?: (value: T) => void) =>
  (event: SyntheticEvent<HTMLInputElement>) => {
    if (fn) {
      fn(event.target.value);
    }
  };
