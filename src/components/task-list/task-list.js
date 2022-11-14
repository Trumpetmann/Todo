import './task-list.css'
import React from 'react'
import PropTypes, { func } from 'prop-types'

import Task from '../task'

function TaskList(props) {
  const { todos, onDeleted, onEditing, editTask, checkboxClick } = props
  const elements = todos.map((el) => {
    const { id, ...propses } = el

    return (
      <Task
        onDeleted={() => onDeleted(id)}
        onEditing={() => onEditing(id)}
        editTask={editTask}
        checkboxClick={() => checkboxClick(id)}
        propses={propses}
        id={id}
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
}

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: func,
  onEditing: func,
  checkboxClick: func,
}

export default TaskList
