function addTaskToProject(project ,data) {
  project.push({
    title: data.title, 
    description: data.description,
    dueDate: data.dueDate
  })

  return true
}

function remove() {
  
}

function get() {
 
}

export { remove, get, addTaskToProject }