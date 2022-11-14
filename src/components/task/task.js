import './task.css'
import React, { Component } from 'react'
import PropTypes, { func } from 'prop-types'

export default class Task extends Component {
  state = {
    newDescription: '',
  }

  editDescription = (description) => {
    this.setState(() => ({
      newDescription: description,
    }))
  }

  editionEnterPress = (e) => {
    const { editTask, id } = this.props
    const { newDescription } = this.state

    if (e.key === 'Enter') editTask(id, newDescription)
  }

  render() {
    const { propses, checkboxClick, onEditing, onDeleted } = this.props

    if (propses.isEditing) propses.className = 'editing'
    if (propses.done) propses.className = 'completed'
    if (!propses.done && propses.className !== 'editing') propses.className = 'active'

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
