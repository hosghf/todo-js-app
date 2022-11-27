const projects = [
  {
    title: 'folan',
    tasks: [
      {
        title: "read a book haha",
        description: "this task is good for you",
        dueDate: "1/2/2022 08:22",
        priority: 'medium'
      }
    ] 
  }
]
let selectedProject = projects[0]

function add(title) {
  projects.push({
    title,
    tasks: []
  })
}

function getProjects() {
  return projects
}

function remove() {
  const index = projects.findIndex((project) => project === selectedProject)
  projects.splice(index, 1)
}

function getSelectedProject() {
  return selectedProject
}

function SetSelectedProject(project) {
  selectedProject = project
}

export { add, remove, getSelectedProject, getProjects, SetSelectedProject }