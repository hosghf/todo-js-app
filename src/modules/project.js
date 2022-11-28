const projects =JSON.parse(localStorage.getItem("projects")) || []

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