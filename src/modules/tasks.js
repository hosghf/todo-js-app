function addTaskToProject(tasks ,data) {
  if(!data.title) return false

  tasks.push({
    title: data.title, 
    description: data.description,
    dueDate: data.dueDate,
    priority: data.priority,
    done: false
  })

  return true
}

function update(tasks, oldTask, newData) {
  let task = tasks.find(task => oldTask === task)

  if(task) {
    task.title = newData.title
    task.description = newData.description
    task.dueDate = newData.dueDate
    task.priority = newData.priority,
    task.done = newData.done
  }
}

function remove(project, data) {
  let index = project.tasks.findIndex(task => task === data)
  project.tasks.splice(index, 1)
}

function toggleTaskDone(task) {
  task.done = !task.done
}

export { remove, addTaskToProject, update, toggleTaskDone }