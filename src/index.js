import './styles/cssReset.css'
import './styles/helper.css'
import './styles/style.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import pubsub from 'pubsub.js'
import { addTaskToProject, remove as removeTask, update as updateTask, toggleTaskDone } from './modules/tasks'
import { add as addProject, remove as removeProject, getSelectedProject, getProjects, SetSelectedProject } from './modules/project'
import { taskFormHandling,
        modalHandling, 
        projectInputHandlig, 
        displayProjects, 
        displayTasks, 
        showProjectTitle,
        selectDefualtProject,
        setAddTaskDisabled, 
        setAddTaskActive, 
        selectLastProjectUi } from './modules/uiModule'

const { openModal, closeModal } = modalHandling()
const { getTaskFormData, clearTaskFormData, setEditTaskFormData } = taskFormHandling()
const { getProjectInputValue, clearProjectInputValue } = projectInputHandlig()
let isEditTask = false
let selectedTaskToEdit = {}

pubsub.subscribe('select/project', selectProject)
pubsub.subscribe('remove/task', removeTaskHandler)
pubsub.subscribe('open/editTask', editTaskFormHndler)
pubsub.subscribe('toggle/taskDone', (task) => {toggleTaskDone(task); storeProjects()})

function addEventListeners() {
  const addProjectButton = document.querySelector('#addProject')
  const openAddTaskModal = document.querySelector('.openAddTaskModal')
  const addTaskButton = document.querySelector('#add-task-button')
  const deleteProject = document.querySelector('.delete-project')
  const closeModalButton = document.querySelector('.close')

  addProjectButton.addEventListener('click', addProjectHandler)

  openAddTaskModal.addEventListener('click', () => {
    clearTaskFormData()
    openModal()
  })

  addTaskButton.addEventListener('click', addEditTaskHanler)

  deleteProject.addEventListener('click', removeProjectHandler)

  closeModalButton.addEventListener('click', closeModal)
}

function selectProject(project) {
  SetSelectedProject(project)
  displayTasks(getSelectedProject().tasks)
  showProjectTitle(getSelectedProject().title)
  setAddTaskActive()
}

function removeProjectHandler() {
  removeProject()
  displayProjects(getProjects())

  if(!getProjects().length) {
    SetSelectedProject(null)
    displayTasks(null)
    showProjectTitle('ther is no project')
    storeProjects()
    setAddTaskDisabled()
    return
  }

  SetSelectedProject(getProjects()[0])
  showProjectTitle(getSelectedProject().title)
  displayTasks(getSelectedProject().tasks)
  storeProjects()
}

function removeTaskHandler(task) {
  removeTask(getSelectedProject(), task)
  displayTasks(getSelectedProject().tasks)
  storeProjects()
}

function addProjectHandler() {
  const projectTitle = getProjectInputValue()
  if(!projectTitle) return
  addProject(projectTitle)
  clearProjectInputValue()
  displayProjects(getProjects())
  SetSelectedProject(getProjects()[getProjects().length - 1])
  displayTasks(getSelectedProject())
  selectLastProjectUi()
  setAddTaskActive()
  storeProjects()
}

function addEditTaskHanler() {
  const data = getTaskFormData()

  if(isEditTask) {
    updateTask(getSelectedProject().tasks, selectedTaskToEdit, data)
    isEditTask = false
    selectedTaskToEdit = {}
  } else if (addTaskToProject(getSelectedProject().tasks, data)) {}

  closeModal()
  displayTasks(getSelectedProject().tasks)
  storeProjects()
}

function editTaskFormHndler(task) {
  isEditTask = true
  selectedTaskToEdit = task
  setEditTaskFormData(task)
  openModal()
}

function storeProjects() {
  localStorage.setItem('projects',JSON.stringify(getProjects()))
}

function initializeApp() {
  addEventListeners()
  if(getProjects().length) {
    displayProjects(getProjects()) 
    displayTasks(getProjects()[0].tasks)
    showProjectTitle(getProjects()[0].title)
    selectDefualtProject()
  } else {
    setAddTaskDisabled()
  }
}

initializeApp()