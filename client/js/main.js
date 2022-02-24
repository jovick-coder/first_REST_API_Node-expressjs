const todoList = document.querySelector('#todo-list')
const loading = document.querySelector('.loading')
const message = document.querySelector('.message')
const url = 'http://localhost:3000/api/todos'

todoItems = []

function trash() {
  const trashs = document.querySelectorAll('#todo-list>li>.icon')

  trashs.forEach((trash, i) => {
    trash.addEventListener('click', (e) => {
      const perantElement = trash.parentNode
      let key = perantElement.getAttribute('key')
      Todo(`${url}/${key}`, 'DELETE')
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
      updateTodo = !done ? { done: false } : { done: true }
      Todo(`${url}/${key}`, 'PUT', updateTodo)
    })
  })
}

getTodos()
function getTodos() {
  loading.style.display = 'block'

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      todoList.innerHTML = ''
      if (data.length === 0) {
        todoList.innerHTML = "<div class='message'>No Todo found Add some</div>"
        return
      }
      todoItems = { ...data }
      data.map((i) => {
        const { id, todo, done } = i

        !done
          ? (htmlTemp = `
<li key='${id}'>
    <label class='todo-name' >
    <input type="checkbox" name="" id="" class='todo-check'"> ${todo}
    </label>
   <div class='icon'> <img src="./img/trash.svg" alt="" srcset=""></div>
</li>
`)
          : (htmlTemp = `
<li key='${id}'>

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
}

async function Todo(url, method, data) {
  const request = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  const test = await fetch(url, request)
  getTodos()
  return test
}
// add todo frpm promt input
document.querySelector('#addTodo').addEventListener('click', () => {
  const todo = prompt('Enter Your Todo')
  if (todo === '') alert('Empty Todo')

  const newTodo = { todo: todo }

  Todo(url, 'POST', newTodo)
})
