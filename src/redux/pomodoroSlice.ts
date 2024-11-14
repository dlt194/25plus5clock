import { createSlice } from "@reduxjs/toolkit";

interface PomodoroState {
  breakLength: number;
  sessionLength: number;
  timeLeft: number;
  isRunning: boolean;
  isSession: boolean;
}

const initialState: PomodoroState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500, // 25 minutes in seconds
  isRunning: false,
  isSession: true,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    incrementBreak: (state) => {
      if (state.breakLength < 60) state.breakLength += 1;
    },
    decrementBreak: (state) => {
      if (state.breakLength > 1) state.breakLength -= 1;
    },
    incrementSession: (state) => {
      if (state.sessionLength < 60) {
        state.sessionLength += 1;
        state.timeLeft = state.sessionLength * 60;
      }
    },
    decrementSession: (state) => {
      if (state.sessionLength > 1) {
        state.sessionLength -= 1;
        state.timeLeft = state.sessionLength * 60;
      }
    },
    reset: (state) => {
      state.breakLength = 5;
      state.sessionLength = 25;
      state.timeLeft = 1500;
      state.isRunning = false;
      state.isSession = true;
    },
    toggleRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    tick: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.isSession = !state.isSession;
        state.timeLeft =
          (state.isSession ? state.sessionLength : state.breakLength) * 60;
      }
    },
  },
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toggleRunning,
  tick,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
