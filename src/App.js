import React, { Component } from 'react';
import './App.css';
import {getStyleForTodo, capitalize, pluralize} from './helpers'

const FILTERS = ['all', 'active', 'completed']

class App extends Component {
  constructor() {
    super()
    this.state = {
      newTodoInput: '',
      todos: [],
      filter: 'all'
    }
  }

  onNewTodoChange = (e) => {
    this.setState({
      newTodoInput: e.target.value
    })
  }

  onNewTodoKeyDown = e => {
    if (e.which === 13) {
      const todos = this.state.todos
      todos.push({
        id: todos.length,
        description: this.state.newTodoInput,
        done: false
      })
      this.setState({
        newTodoInput: '',
        todos
      })
    }
  }

  onTodoCheck = (e, id) => {
    const checked = e.target.checked
    const todos = this.state.todos
    const todo = todos.find(todo => todo.id === id)
    todo.done = checked
    this.setState({
      todos
    })
  }

  onFilterClick = filter => {
    this.setState({
      filter
    })
  }

  onClearCompletedClick = () => {
    const todos = this.state.todos.filter(todo => !todo.done)
    this.setState({
      todos
    })
  }

  render() {
    //console.log(this.state.todos)
    const doneCount = this.state.todos.filter(todo => todo.done).length
    const notDoneCount = this.state.todos.length - doneCount
    const visibleTodos = this.state.todos.filter(todo => {
      switch (this.state.filter) {
        case 'active': return !todo.done
        case 'completed': return todo.done
      default:
        return true
      }
    })

    return (
      <div className='app'>
        <h1>todos</h1>
        <input
          className='new-todo'
          onChange={e => this.onNewTodoChange(e)}
          placeholder='What needs to be done?'
          value={this.state.newTodoInput}
          onKeyDown={e => this.onNewTodoKeyDown(e)}
        />
        {visibleTodos.map(todo => <div className='todo' key={todo.id}>
          <input
            type='checkbox'
            checked={todo.done}
            onChange={e => this.onTodoCheck(e, todo.id)}
          />
          <span style={getStyleForTodo(todo)}>
            {todo.description}
          </span>
        </div>)}
        <div className='bottom'>
          <div style={{textAlign: 'left'}}>
            {notDoneCount} {pluralize(notDoneCount, 'item')} left
          </div>
          <div className='filters'>
            {FILTERS.map(filter =>
              <button
                key={filter}
                className={filter === this.state.filter ? 'active' : ''}
                onClick={e => this.onFilterClick(filter)}>{capitalize(filter)}</button>
            )}
          </div>
          <div style={{textAlign: 'right'}}>
            <button onClick={e => this.onClearCompletedClick()}>
              Clear completed ({doneCount})
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
