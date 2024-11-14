"use client";
import React, { useEffect, useRef } from "react";
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
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

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
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play the beep sound when the timer reaches zero
  useEffect(() => {
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.play();
    }
  }, [timeLeft]);

  // Stop and rewind the beep sound on reset
  const handleReset = () => {
    dispatch(reset());
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => dispatch(tick()), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, dispatch]);

  return (
    <Card id="pomodoro-clock" className="text-center p-4 w-[60%]">
      <CardTitle>
        <h1>Pomodoro Clock</h1>
      </CardTitle>
      <CardContent>
        <div
          id="controls"
          className="flex space-between m-auto text-center justify-center pb-0 mb-0"
        >
          <div id="break-controls" className="p-10">
            <h2 id="break-label">Break Length</h2>
            <Button
              id="break-decrement"
              onClick={() => dispatch(decrementBreak())}
              className="p-2 m-2"
            >
              -
            </Button>
            <span id="break-length">{breakLength}</span>
            <Button
              id="break-increment"
              onClick={() => dispatch(incrementBreak())}
              className="p-2 m-2"
            >
              +
            </Button>
          </div>
          <div id="session-controls" className="p-10">
            <h2 id="session-label">Session Length</h2>
            <Button
              id="session-decrement"
              onClick={() => dispatch(decrementSession())}
              className="p-2 m-2"
            >
              -
            </Button>
            <span id="session-length">{sessionLength}</span>
            <Button
              id="session-increment"
              onClick={() => dispatch(incrementSession())}
              className="p-2 m-2"
            >
              +
            </Button>
          </div>
        </div>
        <div className="border-dashed border-4 border-green w-[25%] mt-0 pt-0 m-auto mb-20 p-10 justify-center align-middle text-center">
          <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
        <Button
          className="p-2 m-2"
          id="start_stop"
          onClick={() => dispatch(toggleRunning())}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button className="p-2 m-2" id="reset" onClick={handleReset}>
          Reset
        </Button>
        <audio id="beep" ref={audioRef} src="/beep.mp3"></audio>
      </CardContent>
    </Card>
  );
}
