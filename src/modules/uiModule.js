import pubsub from 'pubsub.js'
import datepicker from 'js-datepicker'
import 'js-datepicker/dist/datepicker.min.css';


function modalHandling() {
  const modal = document.querySelector('.modal')

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
    
  function closeModal() {
    modal.style.display = "none";
  }
    
  function openModal() {
    modal.style.display = "block"
  }

  return { closeModal, openModal }
}

function projectInputHandlig() {
  const projectInput = document.querySelector('#project-input')

  function getProjectInputValue() {
    return projectInput.value
  }
    
  function clearProjectInputValue() {
    projectInput.value = ""
  }

  return {getProjectInputValue, clearProjectInputValue}
}

function taskFormHandling() {
  const taskForm = {
    title: document.querySelector('#title'),
    description: document.querySelector('#description'),
    dueDate: document.querySelector('#due-date'),
    checkedPriority: () => document.querySelector('input[name="priority"]:checked'),
    highPriority: document.querySelector('#high-priority'),
    lowPriority: document.querySelector('#low-priority'),
    mediumPriority: document.querySelector('#medium-priority'),
  }

  datepicker(taskForm.dueDate, {
    formatter: (input, date) => input.value = date.toLocaleDateString()
  })
  
  function getTaskFormData() {
    return { 
      title: taskForm.title.value, 
      description: taskForm.description.value,
      dueDate: taskForm.dueDate.value,
      priority: taskForm.checkedPriority().value // call it as a function to get the checked radio at the moment
    }
  }

  function clearTaskFormData() {
    taskForm.title.value = ""
    taskForm.description.value = ""
    taskForm.dueDate.value = ""
    taskForm.lowPriority.checked = true
  }

  function setEditTaskFormData(data) {
    taskForm.title.value = data.title
    taskForm.description.value = data.description
    taskForm.dueDate.value = data.dueDate

    if(data.priority === 'medium')
      taskForm.mediumPriority.checked = true
    else if(data.priority === 'high')
      taskForm.highPriority.checked = true    
  }

  return { getTaskFormData, clearTaskFormData, setEditTaskFormData }
}

function displayProjects(projects) {
  const projectsContainer = document.querySelector('#projects-container')
  projectsContainer.innerHTML = ""

  if(!projects.length) {
    projectsContainer.innerHTML = '<h4 class="my-2">there is no project to show</h4>'
    return
  }

  for(let index in projects) {
    const template = `
    <div class="my-1 project-item">
      <h4>${projects[index].title}</h4>
    </div>`

    const node = new DOMParser().parseFromString(template, "text/html")
    node.body.firstChild.addEventListener('click', function toggleSelected() {
      pubsub.publish('select/project', [projects[index]])

      const allProject = document.querySelectorAll('.project-item')
      allProject.forEach(element => {
        element.classList.remove('selected-project')
      });
    
      this.classList.add('selected-project')
    })

    projectsContainer.appendChild(node.body.firstChild)
  }
}

function selectDefualtProject() {
  const projectsContainer = document.querySelector('#projects-container')
  projectsContainer.firstChild.classList.add('selected-project')
}

function displayTasks(tasks) {
  const tasksContainer = document.querySelector('#task-container')
  tasksContainer.innerText = ""

  if(!tasks || !tasks.length) {
    tasksContainer.innerHTML = '<h4 class="my-2">there is no task to show</h4>'
    return
  }

  for(let task of tasks) {
    const template = `
      <div class="task">
        <div>
          <input class="check-task" type="checkbox">
          <label for="">${task.title}</label>
        </div>

        <div>
          <button class="edit-task-button">edit</button>
          <button class="delete-task-button">delete</button>
        </div>
      </div>`

    const node = new DOMParser().parseFromString(template, "text/html")
    const deleteTaskButton = node.body.querySelector('.delete-task-button')
    const editTaskButton = node.body.querySelector('.edit-task-button')
    const checkTask = node.body.querySelector('.check-task')
    deleteTaskButton.addEventListener('click', () => pubsub.publish('remove/task', [task]))
    editTaskButton.addEventListener('click', () => pubsub.publish('open/editTask', [task]))
    checkTask.onchange = () => pubsub.publish('toggle/taskDone', [task])
    checkTask.checked = task.done

    tasksContainer.appendChild(node.body.firstChild)
  }
}

function showProjectTitle(title) {
  const titleElelemnt = document.querySelector('.project-title')
  titleElelemnt.innerText = title
}

export {
  modalHandling,
  projectInputHandlig,
  taskFormHandling,
  displayProjects,
  displayTasks,
  showProjectTitle,
  selectDefualtProject
}