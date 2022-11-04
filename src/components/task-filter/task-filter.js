import './task-filter.css'
import React, { Component } from 'react'
import { func } from 'prop-types'

export default class TaskFilter extends Component {
  static btnActive = (e) => {
    const filters = document.querySelector('.filters')
    const btnFilters = filters.querySelectorAll('button')

    if (e.target.className !== 'filters' && e.target.tagName === 'BUTTON') {
      btnFilters.forEach((el) => {
        el.className = ''
      })
      e.target.className = 'selected'
    }
  }

  render() {
    const { onAll, onActive, onCompleted } = this.props

    return (
      <ul role="presentation" className="filters" onClick={(e) => TaskFilter.btnActive(e)}>
        <li>
          <button type="button" className="selected" onClick={onAll}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={onActive}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={onCompleted}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.propTypes = {
  onAll: func,
  onActive: func,
  onCompleted: func,
}
TaskFilter.defaultProps = {
  onAll: () => {},
  onActive: () => {},
  onCompleted: () => {},
}
