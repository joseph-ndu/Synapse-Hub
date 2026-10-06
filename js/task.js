function* task_idGenerator(length) {
  while (true) {
    const alpha = "t_";
    let task_id = alpha;

    for (let i = 0; i < length; i++) {
      const randomArray = new Uint32Array(1);
      crypto.getRandomValues(randomArray);
      const randomIndex = randomArray[0] % numbers.length;
      task_id += numbers[randomIndex];
    }

    yield task_id;
  }
}

task_creator.addEventListener("submit", (event) => {
  event.preventDefault();

  // form data
  const form_data = new FormData(task_creator);

  // generate task id
  const new_taskID = task_idGenerator(6).next().value;
  // date tax was created
  const current_date = new Date();
  // tax deeadline day
  const dueDate = new Date(form_data.get("setDate"));
  const setDate_max = new Date(current_date);
  setDate_max.setFullYear(current_date.getFullYear() + 5);

  if (dueDate <= current_date) {
    setDate.setCustomValidity("Task date must be in the future.");
    task_creator.reportValidity();
    return;
  }

  if (dueDate > setDate_max) {
    setDate.setCustomValidity("Task date must be less than 5 years time");
    task_creator.reportValidity();
    return;
  }

  form_data.append("date_mdf", current_date);
  form_data.append("taskID", new_taskID);
  form_data.append("projectID", selected_projectID);

  const taskObj = {
    title: form_data.get("taskInp"),
    date_mdf: format_date(form_data.get("date_mdf")),
    priority: form_data.get("setPriority"),
    date: format_date(form_data.get("setDate")),
    completed: false,
    taskID: form_data.get("taskID"),
    projectID: form_data.get("projectID"),
  };
  Object.seal(taskObj);

  task.get(taskObj.projectID).push(taskObj);

  task_copy = structuredClone(task);
  del_taskCreator();
  appendTask_DOM(task_copy);
});
