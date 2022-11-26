import pubsub from 'pubsub.js'

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

  return {closeModal, openModal}
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
    priority: () => document.querySelector('input[name="priority"]:checked')
  }
  
  function getTaskFormData() {
    return { 
      title: taskForm.title.value, 
      description: taskForm.description.value,
      dueDate: taskForm.dueDate.value,
      priority: taskForm.priority().value // call it as a function to get the checked radio at the moment
    }
  }

  function clearTaskFormData() {
    taskForm.title.value = ""
    taskForm.description.value = ""
    taskForm.dueDate.value = ""
  }

  return { getTaskFormData, clearTaskFormData }
}

function displayProjects(projects) {
  const projectsContainer = document.querySelector('#projects-container')
  projectsContainer.innerHTML = ""
    
  for(let project of projects) {
    const projectDivContainer = document.createElement('div')
    projectDivContainer.classList.add('d-flex', 'justify-content-between', 'my-1')
    projectDivContainer.addEventListener('click', () => {
      pubsub.publish('select/project', [project]);
    })
        
    const title = document.createElement('h4')
    title.innerText = project.title
    
    // create button section
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('d-flex')
    const removeButton = document.createElement('button')
    removeButton.innerText = 'remove'
    const editButton = document.createElement('button')
    editButton.innerText = 'edit'
     // end create button section
    
    buttonContainer.appendChild(removeButton)
    buttonContainer.appendChild(editButton)
    
    projectDivContainer.appendChild(title)
    projectDivContainer.appendChild(buttonContainer)
     
    projectsContainer.appendChild(projectDivContainer)
  }
}

function displayTasks(tasks) {
  const tasksContainer = document.querySelector('#task-container')
  tasksContainer.innerText = ""
    
  for(let task of tasks) {
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    
    // creating checkbox
    const checkboxWraper = document.createElement('div')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    const label = document.createElement('label')
    label.innerText = task.title
    
    checkboxWraper.appendChild(checkbox)
    checkboxWraper.appendChild(label)
    // end of creating checkbox
    
    // creating button sections
    const buttonWrapper = document.createElement('div')
    const editButton = document.createElement('button')
    editButton.innerText = 'edit'
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    
    buttonWrapper.appendChild(editButton)
    buttonWrapper.appendChild(deleteButton)
    // end of creating button section
    
    taskDiv.appendChild(checkboxWraper)
    taskDiv.appendChild(buttonWrapper)
    tasksContainer.appendChild(taskDiv)
  }
}


export {
  modalHandling,
  projectInputHandlig,
  taskFormHandling,
  displayProjects,
  displayTasks
}