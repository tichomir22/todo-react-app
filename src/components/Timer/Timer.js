import React, { Component } from 'react'
import './Timer.css'
import PropTypes from 'prop-types'

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'pause',
    }
    this.printTime = (time) => {
      if (time < 1) return '00:00'
      let min = Math.floor(time / 60)
      let sec = time - 60 * min
      if (min < 10) min = `0${min}`
      if (sec < 10) sec = `0${sec}`
      return `${min}:${sec}`
    }

    this.startTimer = () => {
      this.setState({
        status: 'play',
      })
    }
    this.pauseTimer = () => {
      this.setState({
        status: 'pause',
      })
    }
  }

  componentDidMount() {
    this.setState({
      status: 'pause',
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.state
    const { tick } = this.props
    if (status !== prevState.status) {
      if (status === 'play') {
        this.tik = setInterval(() => tick(), 1000)
      }
      if (status === 'pause') {
        clearInterval(this.tik)
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.tik)
  }

  render() {
    const { timer } = this.props
    const { status } = this.state
    const cls = status === 'pause' ? 'icon icon-play' : 'icon icon-pause'
    const timerClickHandler = status === 'pause' ? this.startTimer : this.pauseTimer

    return (
      <span className="description">
        <button type="button" className={cls} aria-label="play" onClick={timerClickHandler} />
        {this.printTime(timer)}
      </span>
    )
  }
}

Timer.defaultProps = {
  tick: () => {},
}
Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  tick: PropTypes.func,
}