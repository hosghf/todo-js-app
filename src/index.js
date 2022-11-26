import './styles/cssReset.css'
import './styles/helper.css'
import './styles/style.css'
import { add as addProject, getSelectedProject, getProjects, SetSelectedProject } from './project'
import { addTaskToProject } from './tasks'
import { taskFormHandling, modalHandling, projectInputHandlig, displayProjects, displayTasks } from './uiModule'
import pubsub from 'pubsub.js'

const { openModal, closeModal } = modalHandling()
const { getTaskFormData, clearTaskFormData } = taskFormHandling()
const { getProjectInputValue, clearProjectInputValue } = projectInputHandlig()

pubsub.subscribe('select/project', function(project) {
  SetSelectedProject(project)
  displayTasks(getSelectedProject().tasks)
});

function addEventListeners() {
  const addProjectButton = document.querySelector('#addProject')
  const openAddTaskModal = document.querySelector('.openAddTaskModal')
  const addTaskButton = document.querySelector('#add-task-button')

  addProjectButton.addEventListener('click', () => {
    const title = getProjectInputValue()
    if(!title) return
    addProject(title)
    clearProjectInputValue()
    displayProjects(getProjects())
  })

  openAddTaskModal.addEventListener('click', openModal)

  addTaskButton.addEventListener('click', () => {
    const data = getTaskFormData()

    if(addTaskToProject(getSelectedProject().tasks, data)) {
      closeModal()
      clearTaskFormData()
      displayTasks(getSelectedProject().tasks)
    }
  }) 
}

addEventListeners()

displayProjects(getProjects())

displayTasks(getProjects()[0].tasks)