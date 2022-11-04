/* eslint-disable no-plusplus */
import './todo-app.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class TodoApp extends Component {
  numId = 1

  state = {
    filter: 'All',

    todoData: [
      {
        className: 'active',
        description: 'Completed task',
        done: false,
        important: false,
        id: this.numId++,
        timeToCreate: new Date(),
        timeToDistance: 'less than 5 seconds',
        isEditing: false,
      },
      {
        className: 'active',
        description: 'Editing task',
        done: false,
        important: false,
        id: this.numId++,
        timeToCreate: new Date(),
        timeToDistance: 'less than 5 seconds',
        isEditing: false,
      },
      {
        className: 'active',
        description: 'Active task',
        done: false,
        important: false,
        id: this.numId++,
        timeToCreate: new Date(),
        timeToDistance: 'less than 5 seconds',
        isEditing: false,
      },
    ],
  }

  createTodoItem = (description) => ({
    className: 'active',
    description,
    done: false,
    important: false,
    id: this.numId++,
    timeToCreate: new Date(),
    timeToDistance: 'less than 5 seconds',
    isEditing: false,
  })

  clearCompleted = () => {
    const { todoData } = this.state
    const newArr = todoData.filter((item) => !item.done)
    this.setState(() => ({
      todoData: newArr,
    }))
  }

  refreshTimeToDistance = () => {
    this.setState(() => {
      const { todoData } = this.state
      const newArr = todoData.map((el) => el)
      newArr.forEach((item) => {
        item.timeToDistance = formatDistanceToNow(item.timeToCreate, {
          includeSeconds: true,
        })
      })

      return {
        todoData: newArr,
      }
    })
  }

  doneCount = () => {
    const { todoData } = this.state
    return todoData.filter((el) => !el.done).length
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => ({
      todoData: [...todoData.slice(), newItem],
    }))
  }

  onEditing = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'isEditing'),
    }))
  }

  toggleProperty = (arr, id, propName) => {
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  checkboxClick = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'done'),
    }))
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  onFilter = (filter) => {
    this.setState(() => ({
      filter,
    }))
  }

  todoFilter = (filter) => {
    const { todoData } = this.state
    let result

    if (filter === 'All') result = todoData
    if (filter === 'Active') result = todoData.filter((item) => !item.done)
    if (filter === 'Completed') result = todoData.filter((item) => item.done)

    return result
  }

  render() {
    const { filter } = this.state

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.todoFilter(filter)}
            onDeleted={this.deleteTask}
            checkboxClick={this.checkboxClick}
            onEditing={this.onEditing}
            refreshTimeToDistance={this.refreshTimeToDistance}
            changeDescription={this.changeDescription}
          />
          <Footer
            onActive={() => this.onFilter('Active')}
            onCompleted={() => this.onFilter('Completed')}
            onAll={() => this.onFilter('All')}
            clearCompleted={this.clearCompleted}
            doneCount={this.doneCount}
          />
        </section>
      </section>
    )
  }
}
