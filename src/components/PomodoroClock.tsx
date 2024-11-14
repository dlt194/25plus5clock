"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toggleRunning,
  tick,
} from "../redux/pomodoroSlice";
import { RootState } from "../redux/store";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export default function PomodoroClock() {
  const dispatch = useDispatch();
  const { breakLength, sessionLength, timeLeft, isRunning, isSession } =
    useSelector((state: RootState) => state.pomodoro);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => dispatch(tick()), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);

  return (
    <div id="pomodoro-clock" className="text-center p-4">
      <h1>Pomodoro Clock</h1>
      <div id="break-controls">
        <h2 id="break-label">Break Length</h2>
        <button id="break-decrement" onClick={() => dispatch(decrementBreak())}>
          -
        </button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={() => dispatch(incrementBreak())}>
          +
        </button>
      </div>
      <div id="session-controls">
        <h2 id="session-label">Session Length</h2>
        <button
          id="session-decrement"
          onClick={() => dispatch(decrementSession())}
        >
          -
        </button>
        <span id="session-length">{sessionLength}</span>
        <button
          id="session-increment"
          onClick={() => dispatch(incrementSession())}
        >
          +
        </button>
      </div>
      <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={() => dispatch(toggleRunning())}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={() => dispatch(reset())}>
        Reset
      </button>
      <audio id="beep" src="/beep.mp3"></audio>
    </div>
  );
}
