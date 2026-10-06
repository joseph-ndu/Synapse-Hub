function display_tc() {
  exit_taskCreator.style.display = "block";
  task_creator.style.display = "flex";
}

function get_clickedTask(selected_task) {
  const task_id = selected_task.dataset.taskId;
  const task_map = task.get(selected_projectID);
  return task_map.find((taskObj) => taskObj.taskID === task_id);
}

function checked_option(event) {
  const target = event.target;
  if (target.type !== "checkbox") {
    return;
  }

  const checked_box = active_taskContent.querySelectorAll(
    "input[type='checkbox']:checked",
  );

  const check_count = checked_box.length;
  document.getElementById("checkedCount").textContent = check_count;

  if (check_count > 0) {
    document.getElementById("arrangement").style.display = "none";
    display_taskCreator.forEach((element) => (element.style.display = "none"));
    document.getElementById("checkedOpt").style.display = "flex";
  } else {
    remove_checkedOpt();
  }
}

function del_taskCreator() {
  exit_taskCreator.style.display = "none";
  task_creator.style.display = "none";
  if (mobile.matches) {
    sidebar.style.display = "none";
  }
}

function exit_taskEditor () {
  taskForm_parent.removeChild(document.getElementById("task_editor"));
}

function remove_menu() {
  if (document.getElementById("project_list")) {
    body.removeChild(document.getElementById("project_list"));
    body.removeChild(document.getElementById("menu"));
  } else if (document.getElementById("empty_listMenu")) {
    body.removeChild(document.getElementById("empty_listMenu"));
    body.removeChild(document.getElementById("menu"));
  } else if (document.getElementById("menu")) {
    body.removeChild(document.getElementById("menu"));
  } else {
    return;
  }
}

function remove_checkedOpt() {
  document.getElementById("arrangement").style.display = "flex";
  display_taskCreator.forEach((element) => (element.style.display = "flex"));
  document.getElementById("checkedOpt").style.display = "none";

  task_copy = structuredClone(task);
  appendTask_DOM(task_copy);
}

function clear_projectCreator() {
  document.querySelector('[for="selectProject"]').style.display = "block";
  document.querySelector('[for="newProject"]').style.display = "none";
  del_project.style.opacity = "1";
}

function clear_taskCreator() {
  task_inp.value = "";
  set_date.value = "";
  set_priority.value = "";
}

function update_selectedProject() {
  // updating the selected project and projectID
  task_projectName.textContent = "";
  selected_project =
    select_project.options[select_project.selectedIndex].textContent;
  selected_projectID =
    select_project.options[select_project.selectedIndex].value;
  task_projectName.textContent = selected_project;
}

function update_taskCount() {
  all_taskNum.textContent =
    active_taskContent.querySelectorAll("li").length +
    completed_taskContent.querySelectorAll("li").length;
  active_taskNum.textContent = active_taskContent.querySelectorAll("li").length;
  completed_taskNum.textContent =
    completed_taskContent.querySelectorAll("li").length;
}

function append_taskInfo(clicked_list) {
  const taskInfo_disp = document.createElement("div");
  const heading = document.createElement("section");
  const header = document.createElement("h2");
  const task_info = document.createElement("section");
  const title = document.createElement("p");
  const date_mdf = document.createElement("p");
  const priority = document.createElement("p");
  const date = document.createElement("p");
  const status = document.createElement("p");

  // svg
  const exit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  exit.setAttribute("viewBox", "0 -960 960 960");
  exit.setAttribute("height", "24px");
  exit.setAttribute("width", "24px");
  exit.setAttribute("fill", "var(--text)");
  exit.setAttribute("backgroundColor", "var(--surface)");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
  );
  exit.appendChild(path);

  // text contents
  header.textContent = "Task Information";
  title.innerHTML = `Title:<span>${clicked_list.title}</span>`;
  date_mdf.innerHTML = `Date created:<span>${clicked_list.date_mdf}.</span>`;
  priority.innerHTML = `Priority:<span>${
    document.querySelector(`[value = ${clicked_list.priority}]`).textContent
  }.</span>`;
  date.innerHTML = `Task date:<span>${clicked_list.date}.</span>`;
  status.innerHTML = clicked_list.completed
    ? "Status:<span>Completed.</span>"
    : "Status:<span>Not completed.</span>";

  // appending elements to their parents
  taskInfo_disp.appendChild(heading);
  heading.appendChild(header);
  heading.append(exit);
  taskInfo_disp.appendChild(task_info);
  task_info.appendChild(title);
  task_info.appendChild(date_mdf);
  task_info.appendChild(priority);
  task_info.appendChild(date);
  task_info.appendChild(status);
  document.getElementById("taskContent").appendChild(taskInfo_disp);

  // style
  taskInfo_disp.style.position = "absolute";
  taskInfo_disp.style.top = "0";
  taskInfo_disp.style.left = "0";
  taskInfo_disp.style.display = "flex";
  taskInfo_disp.style.flexDirection = "column";
  taskInfo_disp.style.alignItems = "flex-start";
  taskInfo_disp.style.justifyContent = "flex-start";
  taskInfo_disp.style.backgroundColor = "var(--backgroundTransp)";
  taskInfo_disp.style.backdropFilter = "blur(3px)";
  taskInfo_disp.style.webkitBackdropFilter = "blur(3px)";
  taskInfo_disp.style.width = "100%";
  taskInfo_disp.style.height = "100%";
  taskInfo_disp.style.gap = "calc(var(--navGap) * 2)";
  taskInfo_disp.style.padding = "var(--navGap)";
  heading.style.display = "flex";
  heading.style.flexDirection = "row";
  heading.style.justifyContent = "space-between";
  heading.style.alignItems = "center";
  heading.style.width = "100%";
  task_info.style.display = "flex";
  task_info.style.flexDirection = "column";
  task_info.style.alignItems = "flex-start";
  task_info.style.justifyContent = "flex-start";
  task_info.style.gap = "var(--navGap)";
  task_info.style.color = "var(--mutedText)";
  task_info.style.fontSize = "var(--fontsize5)";

  // style - individual elements
  taskInfo_disp.querySelector("h2").style.fontSize = "var(--fontSize3)";
  task_info
    .querySelectorAll("span")
    .forEach((element) => (element.style.color = "var(--text)"));
  task_info
    .querySelectorAll("span")
    .forEach((element) => (element.style.marginLeft = "var(--navGap)"));

  exit.addEventListener("click", () => {
    document.getElementById("taskContent").removeChild(taskInfo_disp);
  });
}

function taskList_display(element) {
  switch (element) {
    case all_task:
      all_task.style.backgroundColor = "var(--primary)";
      active_task.style.backgroundColor = "var(--surface)";
      completed_task.style.backgroundColor = "var(--surface)";
      active_taskList.style.display = "flex";
      completed_taskList.style.display = "flex";
      active_taskContent.style.minHeight = "var(--taskContent_width)";
      completed_taskContent.style.minHeight = "var(--taskContent_width)";
      break;
    case active_task:
      all_task.style.backgroundColor = "var(--surface)";
      active_task.style.backgroundColor = "var(--primary)";
      completed_task.style.backgroundColor = "var(--surface)";
      active_taskList.style.display = "flex";
      completed_taskList.style.display = "none";
      active_taskContent.style.minHeight = "60vh";
      completed_taskContent.style.minHeight = "var(--taskContent_width)";
      break;
    case completed_task:
      all_task.style.backgroundColor = "var(--surface)";
      active_task.style.backgroundColor = "var(--surface)";
      completed_task.style.backgroundColor = "var(--primary)";
      active_taskList.style.display = "none";
      completed_taskList.style.display = "flex";
      active_taskContent.style.minHeight = "var(--taskContent_width)";
      completed_taskContent.style.minHeight = "60vh";
      break;
  }
}
taskList_display(all_task);
