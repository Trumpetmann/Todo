import './task-list.css'
import React from 'react'
import PropTypes, { func, string } from 'prop-types'

import Task from '../task'

function TaskList(props) {
  const { todos, onDeleted, onEditing, checkboxClick, description, refreshTimeToDistance } = props
  const elements = todos.map((el) => {
    const { id, ...propses } = el

    return (
      <Task
        onDeleted={() => onDeleted(id)}
        onEditing={() => onEditing(id)}
        checkboxClick={() => checkboxClick(id)}
        description={description}
        refreshTimeToDistance={refreshTimeToDistance}
        propses={propses}
        key={id}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [
    {
      className: 'active',
      description: 'Active',
      done: false,
      important: false,
      id: 1,
      timeToCreate: new Date(),
    },
    {
      className: 'active',
      description: 'Edit',
      done: false,
      important: false,
      id: 2,
      timeToCreate: new Date(),
    },
    {
      className: 'active',
      description: 'Completed',
      done: true,
      important: false,
      id: 3,
      timeToCreate: new Date(),
    },
  ],
  onDeleted: () => {},
  onEditing: () => {},
  checkboxClick: () => {},
  refreshTimeToDistance: () => {},
  description: '',
}

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: func,
  onEditing: func,
  checkboxClick: func,
  refreshTimeToDistance: func,
  description: string,
}

export default TaskList
