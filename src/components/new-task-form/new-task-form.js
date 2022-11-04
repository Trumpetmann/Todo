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

  enterPress = (e) => {
    if (e.key === 'Enter') this.onSubmit(e)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { description } = this.state
    const { addItem } = this.props

    if (description) addItem(description)
    this.setState({
      description: '',
    })
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
          onKeyPress={this.enterPress}
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
