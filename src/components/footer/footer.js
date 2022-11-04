import './footer.css'
import PropTypes from 'prop-types'
import React from 'react'

import TaskFilter from '../task-filter'

function Footer({ onActive, onAll, onCompleted, clearCompleted, doneCount }) {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount()} items left</span>
      <TaskFilter onActive={onActive} onAll={onAll} onCompleted={onCompleted} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onActive: () => {},
  onAll: () => {},
  onCompleted: () => {},
  clearCompleted: () => {},
  doneCount: () => 0,
}

Footer.propTypes = {
  onActive: PropTypes.func,
  onAll: PropTypes.func,
  onCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
  doneCount: PropTypes.func,
}

export default Footer
