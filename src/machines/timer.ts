import { useMachine } from "@xstate/react";
import { createMachine, sendParent } from "xstate";

interface Context {}

export const timerMachine = createMachine<Context>({
  id: "timer",
  initial: "running",
  states: {
    running: {
      invoke: {
        id: "ticker",
        src: () => (cb) => cb("TICK"),
      },
      on: {
        TOGGLE: { target: "paused", actions: sendParent("PAUSED") },
        TICK: { actions: sendParent("TICK", { delay: 100 }) },
      },
    },
    paused: {
      on: {
        TOGGLE: { target: "running", actions: sendParent("RESUME") },
      },
    },
  },
});

export const useTimerMachine = () =>
  useMachine(timerMachine, { devTools: true });
