/* eslint-disable class-methods-use-this */
import './task.css'
import React, { Component } from 'react'
import PropTypes, { func } from 'prop-types'

export default class Task extends Component {
  state = {
    newDescription: '',
  }

  // interval = ''

  componentDidUpdate(prevProps) {
    const { propses, updateTimer } = this.props
    if (propses.timer !== prevProps.propses.timer) {
      if (propses.timer) this.interval = setInterval(updateTimer, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  editionEnterPress = (e) => {
    const { editTask, id } = this.props
    const { newDescription } = this.state

    if (e.key === 'Enter') editTask(id, newDescription)
  }

  clearInterval = () => {
    const { offTimer } = this.props
    clearInterval(this.interval)
    offTimer()
  }

  editDescription(description) {
    this.setState(() => ({
      newDescription: description,
    }))
  }

  render() {
    const { propses, checkboxClick, onEditing, onDeleted, onTimer } = this.props

    if (propses.isEditing) propses.className = 'editing'
    if (propses.done) propses.className = 'completed'
    if (!propses.done && propses.className !== 'editing') propses.className = 'active'

    const timer = (
      <span>
        {propses.minCount === '' ? 0 : propses.minCount}:{propses.secCount === '' ? 0 : propses.secCount}
      </span>
    )

    const input =
      propses.className === 'editing' ? (
        <input
          type="text"
          className="edit"
          defaultValue={propses.description}
          onChange={(e) => this.editDescription(e.target.value)}
          onKeyUp={(e) => this.editionEnterPress(e)}
        />
      ) : null
    return (
      <li className={propses.className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={checkboxClick} checked={propses.done} />
          <label htmlFor="input">
            <span className="description">{propses.description}</span>
            <div className="timer-container">
              <button type="button" aria-label="Play" className="icon icon-play" onClick={onTimer} />
              <button type="button" aria-label="Pause" className="icon icon-pause" onClick={this.clearInterval} />
              <span className="timer">{timer}</span>
            </div>
            <span className="created">{propses.timeToDistance}</span>
          </label>
          <button type="button" aria-label="Edit" className="icon icon-edit" onClick={onEditing} />
          <button type="button" aria-label="Destroy" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {input}
      </li>
    )
  }
}

Task.defaultProps = {
  propses: {},
  onEditing: () => {},
  // refreshTimeToDistance: () => {},
  checkboxClick: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  onEditing: func,
  propses: PropTypes.instanceOf(Object),
  // refreshTimeToDistance: func,
  checkboxClick: func,
  onDeleted: func,
}
