import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task extends Component {
  state = {
    changedLabel: '',
    editing: false,
    date: new Date(),
    dateTick: '',
  }

  componentDidMount() {
    this.setState({ changedLabel: this.props.label })

    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({
      dateTick: formatDistanceToNow(this.state.date, { includeSeconds: true }),
    })
  }

  handleEditingDone = (e) => {
    if (e.keyCode === 13) {
      this.setState({
        editing: false,
      })
    }
  }

  handleEditingChange = (e) => {
    let _changedLabel = e.target.value
    this.setState({
      changedLabel: _changedLabel,
    })
  }

  onEdited = () => {
    this.setState({
      editing: true,
      changedLabel: this.props.label,
    })
  }

  render() {
    const { onDeleted, onToggleCompleted, completed, created } = this.props

    let classNames = 'task'

    if (completed) {
      classNames += ' completed'
    }

    let viewStyle = {}
    let editStyle = {}

    if (this.state.editing) {
      classNames += ' editing'
      viewStyle.display = 'none'
    } else {
      editStyle.display = 'none'
    }

    return (
      <li className={classNames}>
        <div className="view" style={viewStyle}>
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label>
            <span className="description">{this.state.changedLabel}</span>
            <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdited}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>

        <input
          type="text"
          style={editStyle}
          className="edit"
          value={this.state.changedLabel}
          autoFocus
          onChange={this.handleEditingChange}
          onKeyDown={this.handleEditingDone}
        />
      </li>
    )
  }
}
Task.defaultProps = {
  created: Date.now(),
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
}
