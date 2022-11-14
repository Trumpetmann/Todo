import './new-task-form.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    description: '',
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const { description } = this.state
      const { addItem } = this.props

      if (description) addItem(description)
      this.setState({
        description: '',
      })
    }
  }

  render() {
    const { description } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          onKeyDown={this.onSubmit}
          value={description}
        />
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
}
