import { useMachine } from "@xstate/react";
import {
  startSession,
  pauseSession,
  resumeSession,
  enterActiveSession,
  enterBreakSession,
  resetSession,
} from "services/sessions";
import { createMachine, assign, send } from "xstate";

const DEFAULT_ACTIVE_DURATION = 1500;
const DEFAULT_BREAK_DURATION = 300;

const now = () => Math.round(new Date().getTime() / 1000);

interface Context {
  sessionId: string;
  startedTime: number;
  currentTime: number;
  pausedTime: number;
  duration: number;
  cycle: number;
}

const timerState = {
  initial: "running",
  states: {
    running: {
      invoke: {
        id: "interval",
        src: "tickerService",
      },
      on: {
        TICK: [
          {
            actions: "updateCurrentTime",
            cond: "inProgress",
          },
          { actions: send("NEXT") },
        ],
        TOGGLE: {
          target: "paused",
          actions: ["updatePausedTime", "pausedEvent"],
        },
      },
    },
    paused: {
      on: {
        TOGGLE: { target: "running", actions: ["resumeTime", "resumedEvent"] },
      },
    },
  },
  on: {},
};

const initialContext = {
  sessionId: "",
  startedTime: 0,
  currentTime: 0,
  pausedTime: 0,
  duration: 0,
  cycle: 0,
};

const pomodoroMachine = createMachine<Context>(
  {
    id: "pomodoro",
    initial: "idle",
    context: {
      ...initialContext,
    },
    states: {
      idle: {
        on: {
          TOGGLE: {
            target: "start",
            actions: ["initializeTime"],
          },
        },
      },
      start: {
        invoke: {
          id: "startedEvent",
          src: "startedEvent",
          onDone: "active",
        },
      },
      active: {
        entry: [
          assign((context, event) => ({
            duration: DEFAULT_ACTIVE_DURATION,
          })),
          "enterActiveEvent",
        ],
        ...(timerState as any),
        on: {
          ...timerState.on,
          NEXT: { target: "break", actions: ["initializeTime"] },
        },
      },
      break: {
        entry: [
          assign((context, event) => ({
            duration:
              context.cycle !== 0 && context.cycle % 3 === 0
                ? 2 * DEFAULT_BREAK_DURATION
                : DEFAULT_BREAK_DURATION,
          })),
          "enterBreakEvent",
        ],
        ...(timerState as any),
        on: {
          ...timerState.on,
          NEXT: {
            target: "active",
            actions: ["initializeTime", "incrementCycle"],
          },
        },
      },
    },
    on: {
      RESET: {
        target: "idle",
        actions: ["resetTime", "resetEvent"],
      },
    },
  },
  {
    guards: {
      isResumable: (context, event) => context.startedTime !== 0,
      inProgress: (context, event) =>
        context.currentTime - context.startedTime < context.duration,
    },
    actions: {
      initializeTime: assign((context, event) => {
        const startedTime = now();

        return {
          startedTime,
          currentTime: startedTime,
        };
      }),
      updateCurrentTime: assign((context, event) => ({
        currentTime: now(),
      })),
      updatePausedTime: assign((context, event) => ({
        pausedTime: now(),
      })),
      resetTime: assign((context, event) => ({
        ...initialContext,
        sessionId: context.sessionId,
      })),
      resumeTime: assign((context, event) => {
        const currentTime = now();

        return {
          currentTime,
          pausedTime: 0,
          duration:
            context.duration + Math.round(currentTime - context.pausedTime),
        };
      }),
      incrementCycle: assign((context, event) => ({
        cycle: context.cycle + 1,
      })),
      pausedEvent: pauseSession,
      resumedEvent: resumeSession,
      resetEvent: resetSession,
      enterActiveEvent: enterActiveSession,
      enterBreakEvent: enterBreakSession,
    },
    services: {
      tickerService: () => (cb: (type: string) => void) => {
        const interval = setInterval(() => cb("TICK"), 100);
        return () => clearInterval(interval);
      },
      startedEvent: startSession,
    },
  }
);

export const usePomodoroMachine = (sessionId: string) => {
  return useMachine(pomodoroMachine, {
    context: {
      sessionId,
    },
    devTools: true,
  });
};
