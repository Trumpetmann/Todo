/* eslint-disable no-plusplus */
/* eslint-disable react/sort-comp */
import './app.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends Component {
  numId = 1

  createTodoItem = (description) => ({
    description,
    done: false,
    important: false,
    id: this.numId++,
    timeToCreate: new Date(),
    timeToDistance: 'less than 5 seconds',
    isEditing: false,
  })

  state = {
    filter: 'All',

    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((item) => !item.done),
    }))
  }

  refreshTimeToDistance = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((item) => {
        item.timeToDistance = formatDistanceToNow(item.timeToCreate, {
          includeSeconds: true,
        })
        return item
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
      todoData: [...todoData, newItem],
    }))
    this.refreshTimeToDistance()
  }

  onEditing = (id) => {
    this.setState(() => ({
      todoData: this.toggleProperty(id, 'isEditing'),
    }))
  }

  toggleProperty = (id, propName) => {
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
  }

  checkboxClick = (id) => {
    this.setState(() => ({
      todoData: this.toggleProperty(id, 'done'),
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
    this.refreshTimeToDistance()
  }

  editTask = (id, newDescription) => {
    this.setState(
      ({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const newItem = { ...todoData[idx], description: newDescription }
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        return {
          todoData: newArray,
        }
      },
      () => this.onEditing(id)
    )
  }

  onFilter = (filter) => {
    this.setState(() => ({
      filter,
    }))
  }

  todoFilter = (filter) => {
    const { todoData } = this.state

    let result

    switch (filter) {
      case 'All':
        result = todoData
        break
      case 'Active':
        result = todoData.filter((item) => !item.done)
        break
      case 'Completed':
        result = todoData.filter((item) => item.done)
        break
      default:
        result = todoData
        break
    }

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
            editTask={this.editTask}
            // refreshTimeToDistance={this.refreshTimeToDistance}
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
