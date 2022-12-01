/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
import './app.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class App extends Component {
  numId = 1

  createTodoItem = (description, min = 0, sec = 0) => ({
    description,
    done: false,
    important: false,
    id: this.numId++,
    timeToCreate: new Date(),
    timeToDistance: 'less than 5 seconds',
    isEditing: false,
    minCount: min,
    secCount: sec,
  })

  state = {
    filter: 'All',

    todoData: [
      this.createTodoItem('Completed task', 1, 0),
      this.createTodoItem('Editing task', 1, 30),
      this.createTodoItem('Active task', 2, 0),
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

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }))
    this.refreshTimeToDistance()
  }

  onEditing = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData]
      return {
        todoData: this.toggleProperty(id, 'isEditing', newArr),
      }
    })
  }

  toggleProperty = (id, propName, arr) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  checkboxClick = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData]
      return {
        todoData: this.toggleProperty(id, 'done', newArr),
      }
    })
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
