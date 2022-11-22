/* eslint-disable  jsx-a11y/no-autofocus */
import './new-task-form.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    description: '',
    minCount: '',
    secCount: '',
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      minCount: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      secCount: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (('onSubmit', e.key === 'Enter')) {
      const { description, minCount, secCount } = this.state
      const { addItem } = this.props

      if (description) addItem(description, minCount, secCount)
      this.setState({
        description: '',
        minCount: '',
        secCount: '',
      })
    }
  }

  render() {
    const { description, minCount, secCount } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            onKeyUp={this.onSubmit}
            value={description}
          />
          <input
            className="new-todo-form__timer"
            value={minCount}
            onChange={this.onMinChange}
            onKeyUp={this.onSubmit}
            placeholder="Min"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            value={secCount}
            onChange={this.onSecChange}
            onKeyUp={this.onSubmit}
            placeholder="Sec"
            autoFocus
          />
        </form>
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
