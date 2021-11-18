import { SyntheticEvent, BaseSyntheticEvent } from "react";

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
  <T extends string>(fn: (value: T) => void) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (fn) {
      fn(target.value as T);
    }
  };
