/* eslint-disable  react/sort-comp */
import './task-filter.css'
import React, { Component } from 'react'
import { func } from 'prop-types'

export default class TaskFilter extends Component {
  state = {
    allClassName: 'selected',
    activeClassName: '',
    completedClassName: '',
  }

  btnActive = (e) => {
    this.setState(() => {
      // const btnFilters = document.querySelectorAll('button')
      // const btnFilters = [...this.state]
      /*
        if (e.target.className !== 'filters' && e.target.tagName === 'BUTTON') {
          btnFilters.forEach((el) => {
            console.log(el)
            el.className = ''
          })
        }
        */
      switch (e.target.textContent) {
        case 'All':
          return {
            allClassName: 'selected',
            activeClassName: '',
            completedClassName: '',
          }
        case 'Active':
          return {
            allClassName: '',
            activeClassName: 'selected',
            completedClassName: '',
          }
        case 'Completed':
          return {
            allClassName: '',
            activeClassName: '',
            completedClassName: 'selected',
          }
        default:
          return {
            allClassName: 'selected',
            activeClassName: '',
            completedClassName: '',
          }
      }
    })
  }

  render() {
    const { onAll, onActive, onCompleted } = this.props
    const { allClassName, activeClassName, completedClassName } = this.state

    return (
      <ul role="presentation" className="filters" onClick={(e) => this.btnActive(e)}>
        <li>
          <button type="button" className={allClassName} onClick={onAll}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={onActive} className={activeClassName}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={onCompleted} className={completedClassName}>
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
