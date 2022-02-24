const todoList = document.querySelector('#todo-list')
const loading = document.querySelector('.loading')
const message = document.querySelector('.message')
const url = 'http://localhost:3000/api/todos'

// add todo frpm promt input
document.querySelector('#addTodo').addEventListener('click', () => {
  const todo = prompt('Enter Your Todo')
  if (todo === '') alert('Empty Todo')

  const newTodo = { todo: todo, done: false }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  })
  getTodos()
})

function trash() {
  const trashs = document.querySelectorAll('#todo-list>li>.icon')

  trashs.forEach((trash, i) => {
    trash.addEventListener('click', (e) => {
      const perantElement = trash.parentNode
      let key = perantElement.getAttribute('key')
      const request = {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      fetch(`${url}/${key}`, request).then(() => {
        getTodos()
      })
    })
  })
}

function getLis() {
  const checkbox = document.querySelectorAll('#todo-list>li>label>input')
  checkbox.forEach((div, i) => {
    div.addEventListener('click', (e) => {
      const checkbox = e.target
      const done = checkbox.checked
      const perantElement = checkbox.parentNode
      const grandPerantElement = perantElement.parentNode
      done
        ? (perantElement.style.textDecoration = 'line-through')
        : (perantElement.style.textDecoration = 'none')
      let key = grandPerantElement.getAttribute('key')
      updateTodo = !done ? { id: key, done: false } : { id: key, done: true }
      const request = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodo),
      }
      fetch(`${url}/${key}`, request)
        .then(() => {
          getTodos()
        })
        .catch((err) => console.error(err))
    })
  })
}

getTodos()
function getTodos() {
  loading.style.display = 'block'

  fetch(url)
    .then((res) => res.json())
    .then((todos) => {
      todoList.innerHTML = ''
      if (todos.length === 0) {
        todoList.innerHTML = "<div class='message'>No Todo found Add some</div>"
        return
      }
      todos.map((t) => {
        const { _id, todo, done } = t

        !done
          ? (htmlTemp = `
      <li key='${_id}'>
          <label class='todo-name' >
          <input type="checkbox" name="" id="" class='todo-check'"> ${todo}
          </label>
         <div class='icon'> <img src="./img/trash.svg" alt="" srcset=""></div>
      </li>
      `)
          : (htmlTemp = `
      <li key='${_id}'>

      <label class='todo-name'style=' text-decoration: line-through' >
      <input type="checkbox" name="" id="" class='todo-check'" checked> ${todo}
      </label>
      <div class='icon'> <img src="./img/trash.svg" alt="" srcset=""></div>
      </li>
      `)

        todoList.innerHTML += htmlTemp
      })

      getLis()
      trash()
    })
    .catch((err) => console.log(err))
}

function Todo(url, method, data) {}
