function* project_idGenerator(length) {
  while (true) {
    const alpha = "p_";
    let project_id = alpha;

    for (let i = 0; i < length; i++) {
      const randomArray = new Uint32Array(1);
      crypto.getRandomValues(randomArray);
      const randomIndex = randomArray[0] % numbers.length;
      project_id += numbers[randomIndex];
    }
    // return generated project id
    yield project_id;
  }
}

function create_newProject() {
  let created_option = document.createElement("option");
  created_option.textContent += newProject_inp.value;
  const new_projectID = project_idGenerator(6).next().value;
  created_option.value = new_projectID;
  // adding the new project to the DOM
  select_project.append(created_option);
  // clearing the newProject input field
  clear_projectCreator();
  newProject_inp.value = "";
  select_project.value = created_option.value;
  update_selectedProject();
  // re-render task
  appendTask_DOM(task);
}
