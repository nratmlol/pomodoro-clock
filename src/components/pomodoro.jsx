import React from "react";
import ReactCowntdownClock from "react-countdown-clock"
import "../styles.css";

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStarted: false,
      minutes: 25,
      seconds: 0
    };
    
    this.secondsRemaining = this.state.minutes * 60;
  }

  handleTimerStart(e) {
    e.preventDefault();

    if (!this.state.timerStarted) {
      this.timer = setInterval(() => {
        this.setState({ timerStarted: true });
        if (this.state.timerStarted) {
          let min = Math.floor(this.secondsRemaining / 60);
          let sec = this.secondsRemaining - min * 60;
          this.setState({ minutes: min, seconds: sec });
          this.secondsRemaining--;
        }
      }, 1000);
    }
  }

  formatTime(minutes, seconds) {
    return ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2);
  }

  handleTimerStop(e) {
    e.preventDefault();
    this.setState({ timerStarted: false });

    clearInterval(this.timer);
  }

  handleTimerReset(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.setState({ minutes: 25, seconds: 0, timerStarted: false });
    this.secondsRemaining = 25 * 60;
  }

  render() {
    return (
      <div className="container">
        <div className="timer-container">
          <div className="current-timer">
              <ReactCowntdownClock
                seconds={25 * 60}
                color="#ED7AB0"
                alpha={0.9}
                size={360}
                weight={10}
                fontSize={0}
                paused={!this.state.timerStarted ? true : false}
                onComplete={this.handleTimerReset}
               />
            <div className="time">
              {this.formatTime(this.state.minutes, this.state.seconds)}
            </div>
          </div>
          <div className="timer-controls">
            <button onClick={this.handleTimerStart.bind(this)}>Start</button>
            <button onClick={this.handleTimerStop.bind(this)}>Stop</button> 
          </div>
        </div>
      </div>
    );
  }
}
