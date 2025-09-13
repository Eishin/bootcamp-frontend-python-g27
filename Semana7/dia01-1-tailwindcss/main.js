const taskInput = document.querySelector('.task__input')
const taskButtonClear = document.querySelector('.task__clear')
const taskList = document.querySelector('.task__list')
const checkbox = document.querySelector('.task__finished')

let tasks = [
  {
    id: 'tarea-1',
    title: 'Estudiar Javascript',
    completed: true
  },
  {
    id: 'tarea-2',
    title: 'Salir al receso',
    completed: true
  },
  {
    id: 'tarea-3',
    title: 'Resolver el reto de la semana',
    completed: false
  }
]

function renderTasks(tasks = []) {
  // console.log('Renderizando tasks...', tasks)

  let list = ''

  tasks.forEach(task => {
    console.log(task)
    list = list + `
      <li  class="flex justify-center items-center gap-4 py-1">
        <input 
          class="task__finished" 
          type="checkbox" 
          data-id=${task.id}
          ${task.completed ? 'checked' : ''}  
        />
        <div class="w-full" ${task.completed ? 'style="text-decoration: line-through; color: gray;"' : ''}>
          ${task.title}
        </div>
        <div class="flex gap-2">
          <button
            class="task-item__edit border border-green-700 font-medium text-sm px-2 py-1 text-green-700 rounded-lg hover:bg-green-700 hover:text-white duration-300"
          >
            ✏
          </button>
          <button
            class="task-item__remove border border-red-700 font-medium text-sm px-2 py-1 text-red-700 rounded-lg hover:bg-red-700 hover:text-white duration-300"
            data-id="${task.id}"
            data-nombre="holaquetal"
          >
            ❌
          </button>
        </div>
      </li>
    `
  })
  

  taskList.innerHTML = list
}

// 01 - Al presionar enter en la caja de texto debemos agregar una nueva tarea a lista(arreglo tasks)
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // lógica para agregar una nueva tarea
    console.log(event.key) // El nombre de la tecla presionada

    // const value = event.target.value
    const { value } = event.target

    const newTask = {
      id: crypto.randomUUID(),
      title: value,
      completed: false
    }

    tasks.push(newTask)

    renderTasks(tasks)

    taskInput.value = ''

    console.log(tasks)
  }
})

taskList.addEventListener('click', (event) => {
  const { target } = event

  console.log(target.dataset)
  
  if(
    target.tagName === 'BUTTON' && 
    target.classList.contains('task-item__remove')
  ) {
    const { id } = target.dataset // Id que queremos eliminar

    console.log('Eliminando tarea...', id)

    tasks = tasks.filter(task => task.id !== id)

    renderTasks(tasks)
  }
  if(
    target.tagName === 'INPUT' && 
    target.classList.contains('task__finished')
  ) {
    console.log('Tarea completada')
    const { id } = target.dataset // Id que queremos eliminar

    const taskselectedindex = tasks.findIndex(task => {
      return task.id === id
    
    })
    tasks[taskselectedindex] = {
      ...tasks[taskselectedindex],
      completed: !tasks[taskselectedindex].completed

    }
    renderTasks(tasks)
    console.log(tasks)
  }
})

taskButtonClear.addEventListener('click',() =>{
    const incompletetasks = tasks.filter(task => !task.completed)
    tasks = incompletetasks
    renderTasks(tasks)
}) 

renderTasks(tasks)  