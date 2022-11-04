import './task.css'
import React, { Component } from 'react'
import PropTypes, { func } from 'prop-types'

export default class Task extends Component {
  editionEnterPress = (e) => {
    const { onEditing } = this.props
    const { propses } = this.props

    if (e.key === 'Enter') onEditing(propses.id)
  }

  render() {
    const { propses, checkboxClick, onEditing, onDeleted, intervalRefreshTime, refreshTimeToDistance } = this.props

    setInterval(refreshTimeToDistance, intervalRefreshTime)

    if (propses.isEditing) propses.className = 'editing'
    if (propses.done) propses.className = 'completed'
    if (!propses.done && propses.className !== 'editing') propses.className = 'active'

    const input =
      propses.className === 'editing' ? (
        <input
          type="text"
          className="edit"
          defaultValue={propses.description}
          onKeyPress={(e) => this.editionEnterPress(e)}
        />
      ) : null
    return (
      <li className={propses.className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={checkboxClick} checked={propses.done} />
          <label htmlFor="input">
            <span className="description">{propses.description}</span>
            <span className="created">{propses.timeToDistance}</span>
          </label>
          <button type="button" aria-label="Edit" id="first-name" className="icon icon-edit" onClick={onEditing} />
          <button
            type="button"
            aria-label="Destroy"
            id="first-name"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        {input}
      </li>
    )
  }
}

Task.defaultProps = {
  intervalRefreshTime: 5000,
  propses: {},
  onEditing: () => {},
  refreshTimeToDistance: () => {},
  checkboxClick: () => {},
  onDeleted: () => {},
}

Task.propTypes = {
  intervalRefreshTime: PropTypes.number,
  onEditing: func,
  propses: PropTypes.instanceOf(Object),
  refreshTimeToDistance: func,
  checkboxClick: func,
  onDeleted: func,
}
