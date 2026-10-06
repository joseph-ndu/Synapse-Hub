function appendTask_DOM(task) {
  // clearing the createTask form
  clear_taskCreator();

  if (task.has(selected_projectID)) {
    // emptying the active task content parent
    active_taskContent.innerHTML = "";
    completed_taskContent.innerHTML = "";

    const taskList_active = document.createElement("ul");
    taskList_active.classList.add("active");

    const taskList_completed = document.createElement("ul");
    taskList_completed.classList.add("completed");
    active = document.querySelector(".active");

    for (const [key, value] of task) {
      if (key === selected_projectID) {
        // sorting the tasks based on the selected sort option
        const sort_selectedOption = sort.value;
        const sidebarSort_selectedOption = sidebar_sort.value;
        if (
          (sort_selectedOption || sidebarSort_selectedOption) === "priority"
        ) {
          sort.value = "priority";
          sidebar_sort.value = "priority";
          value.sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          });
        } else if (
          (sort_selectedOption || sidebarSort_selectedOption) === "date"
        ) {
          sort.value = "date";
          sidebar_sort.value = "date";
          value.sort((a, b) => new Date(b.date_mdf) - new Date(a.date_mdf));
        } else if (
          (sort_selectedOption || sidebarSort_selectedOption) === "taskDate"
        ) {
          sort.value = "taskDate";
          sidebar_sort.value = "taskDate";
          value.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        for (let i = 0; i < value.length; i++) {
          const iterated_task = value[i];
          const iterated_title = iterated_task.title;
          const iterated_taskID = iterated_task.taskID;

          // creating the elements
          const li = document.createElement("li");
          li.id = `${iterated_task.projectID}.${iterated_taskID}`;
          li.dataset.taskId = iterated_taskID;
          const label = document.createElement("label");
          label.htmlFor = iterated_taskID;
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = iterated_taskID;
          const task_output = document.createElement("output");
          task_output.textContent = iterated_title.trim();
          const priority_output = document.createElement("output");
          const date_output = document.createElement("output");
          date_output.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="var(--text)">
                <path
                  d="M291.5-411.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5Zm160 0Q440-423 440-440t11.5-28.5Q463-480 480-480t28.5 11.5Q520-457 520-440t-11.5 28.5Q497-400 480-400t-28.5-11.5Zm160 0Q600-423 600-440t11.5-28.5Q623-480 640-480t28.5 11.5Q680-457 680-440t-11.5 28.5Q657-400 640-400t-28.5-11.5ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg> <span>${formatDueDate(
              new Date(value[i].date_mdf),
              new Date(value[i].date),
            )}</span>`;
          const outputs = [priority_output, date_output];

          // appending content to their respective parents
          li.appendChild(label);
          li.appendChild(task_output);
          li.appendChild(priority_output);
          li.appendChild(date_output);
          label.appendChild(checkbox);

          // adding the classes to the label child element
          checkbox.classList.add(iterated_taskID);
          task_output.classList.add(iterated_taskID);
          priority_output.classList.add(iterated_taskID);
          date_output.classList.add(iterated_taskID);

          // style
          li.style.cursor = "default";
          outputs.forEach((element) => {
            element.style.display = "flex";
            element.style.flexDirection = "row";
            element.style.alignItems = "center";
            element.style.justifyContent = "center";
            element.style.gap = "var(--navGap)";
            element.style.whiteSpace = "nowrap";
          });
          task_output.style.overflow = "hidden";
          task_output.style.textOverflow = "ellipsis";
          task_output.style.whiteSpace = "nowrap";
          priority_output.style.justifySelf = "flex-end";
          priority_output.style.padding = "0 calc(var(--navGap) / 1.2)";
          date_output.style.justifySelf = "flex-end";
          date_output.style.borderLeft = "var(--text) solid var(--border_wdth)";
          date_output.style.padding = "0 calc(var(--navGap) / 1.2)";

          if (mobile.matches) {
            priority_output.style.display = "none";
          }

          // appending content to the outputs
          if (value[i].completed === false) {
            active_taskContent.appendChild(taskList_active);
            activeEmptyState_placement();
            taskList_active.appendChild(li);
            task_output.style.width = "73%";

            // style
            switch (value[i].priority) {
              case "high":
                priority_output.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-align-vertical-justify-start preview-icon">
                  <rect width="14" height="6" x="5" y="16" rx="2" />
                  <rect width="10" height="6" x="7" y="6" rx="2" />
                  <path d="M2 2h20" />
                </svg> <span>${
                  document.querySelector(`[value = ${value[i].priority}]`)
                    .textContent
                }</span>`;
                li.style.border =
                  "var(--highPriority) solid var(--border_wdth)";
                li.style.borderLeftWidth = "calc(var(--border_wdth) * 4)";
                checkbox.style.accentColor = "var(--highPriority)";
                priority_output.style.backgroundColor = "var(--highPriority)";
                if (task_output.querySelector("span") !== null) {
                  task_output.querySelector("span").style.color =
                    "var(--highPriority)";
                }
                break;

              case "medium":
                priority_output.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-align-vertical-justify-center preview-icon">
                  <rect width="14" height="6" x="5" y="16" rx="2" />
                  <rect width="10" height="6" x="7" y="2" rx="2" />
                  <path d="M2 12h20" />
                </svg> <span>${
                  document.querySelector(`[value = ${value[i].priority}]`)
                    .textContent
                }</span>`;
                li.style.border = "var(--primary) solid var(--border_wdth)";
                li.style.borderLeftWidth = "calc(var(--border_wdth) * 4)";
                checkbox.style.accentColor = "var(--primary)";
                priority_output.style.backgroundColor = "var(--primary)";
                if (task_output.querySelector("span") !== null) {
                  task_output.querySelector("span").style.color =
                    "var(--primary)";
                }
                break;

              case "low":
                priority_output.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-align-vertical-justify-end preview-icon">
                  <rect width="14" height="6" x="5" y="12" rx="2" />
                  <rect width="10" height="6" x="7" y="2" rx="2" />
                  <path d="M2 22h20" />
                </svg> <span>${
                  document.querySelector(`[value = ${value[i].priority}]`)
                    .textContent
                }</span>`;
                li.style.border = "var(--mutedText) solid var(--border_wdth)";
                li.style.borderLeftWidth = "calc(var(--border_wdth) * 4)";
                checkbox.style.accentColor = "var(--mutedText)";
                priority_output.style.backgroundColor = "var(--mutedText)";
                if (task_output.querySelector("span") !== null) {
                  task_output.querySelector("span").style.color =
                    "var(--mutedText)";
                }
                break;

              default:
                break;
            }

            if (mobile.matches) {
              priority_output.style.display = "none";
            }
          } else if (value[i].completed === true) {
            completed_taskContent.appendChild(taskList_completed);
            completedEmptyState_placement();
            taskList_completed.appendChild(li);
            li.removeChild(label);
            li.removeChild(priority_output);
            li.style.border = "var(--accentComplete) solid var(--border_wdth)";
            li.style.borderLeftWidth = "calc(var(--border_wdth) * 4)";
            task_output.style.width = "85%";
          }

          priority_output.style.textAlign = "center";
          priority_output.style.borderRadius = "var(--border_radius)";

          li.addEventListener("mouseover", () => {
            li.style.filter = "brightness(1.2)";
          });

          li.addEventListener("mouseleave", () => {
            li.style.filter = "none";
          });

          li.addEventListener("mousedown", () => {
            li.style.filter = "brightness(1.5)";
          });

          checkbox.addEventListener("change", () => {
            update_taskCount();
          });
        }

        active_emptyState();
        completed_emptyState();

        // update num of tasks
        update_taskCount();
      }
    }
  } else {
    active_taskContent.innerHTML = "";
    active_emptyState();
    completed_taskContent.innerHTML = "";
    completed_emptyState();
    update_taskCount();
  }
}
task_copy = structuredClone(task);
appendTask_DOM(task_copy);

function del_task(task) {
  selectedProject_arr = task.get(selected_projectID);
  for (let i = selectedProject_arr.length - 1; i >= 0; i--) {
    const checkbox = document.getElementById(
      `${selectedProject_arr[i].taskID}`,
    );
    if (selectedProject_arr[i].completed === false && checkbox.checked) {
      selectedProject_arr.splice(i, 1);
    }
  }
  return remove_checkedOpt();
}

function del_taskII(clicked_task) {
  task.get(selected_projectID).splice(clicked_task, 1);
  task_copy = structuredClone(task);
  appendTask_DOM(task_copy);
}

function project_list(clicked_task, clicked_taskMenu) {
  // existence check
  if (document.getElementById("project_list")) {
    return body.removeChild(document.getElementById("project_list"));
  }

  if (document.getElementById("empty_listMenu")) {
    return body.removeChild(document.getElementById("empty_listMenu"));
  }

  if (task.size > 1) {
    const project_listMenu = document.createElement("form");
    project_listMenu.id = "project_list";
    const title = document.createElement("p");
    title.innerHTML = `Transfer to`;
    title.classList.add("project_listMenuTitle");
    project_listMenu.appendChild(title);

    for (const [key] of task) {
      if (key !== selected_projectID) {
        // label
        const listed_project = document.createElement("label");
        listed_project.htmlFor = `listed_project_${key}`;
        listed_project.textContent = select_project.querySelector(
          `[value="${key}"]`,
        ).textContent;
        // input
        const listed_project_input = document.createElement("input");
        listed_project_input.type = "radio";
        listed_project_input.name = "listed_project";
        listed_project_input.id = `listed_project_${key}`;
        listed_project_input.value = key;
        // appending elements to their respective parent
        listed_project.prepend(listed_project_input);
        project_listMenu.appendChild(listed_project);
      }
    }

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Done";
    project_listMenu.appendChild(submit);
    body.appendChild(project_listMenu);

    // style
    const rect = clicked_taskMenu.getBoundingClientRect();
    submit.style.justifySelf = "flex-end";
    project_listMenu.style.top = `${rect.top}px`;
    project_listMenu.style.left = `${rect.right}px`;

    submit.addEventListener("click", (event) => {
      event.preventDefault();

      const transfer_to = document.querySelector(
        "input[name='listed_project']:checked",
      ).value;
      transfer_task(clicked_task, transfer_to);
      remove_menu();
    });
  } else {
    const empty_listMenu = document.createElement("div");
    empty_listMenu.id = "empty_listMenu";
    const title = document.createElement("p");
    title.innerHTML = `Transfer to`;
    title.classList.add("project_listMenuTitle");
    const empty_listMenuText = document.createElement("p");
    empty_listMenuText.textContent = "Project list is empty";
    empty_listMenuText.id = "empty_listMenuText";

    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "Close";

    empty_listMenu.appendChild(title);
    empty_listMenu.appendChild(empty_listMenuText);
    empty_listMenu.appendChild(close);
    body.appendChild(empty_listMenu);

    // style
    const rect = clicked_taskMenu.getBoundingClientRect();
    empty_listMenu.style.top = `${rect.top}px`;
    empty_listMenu.style.left = `${rect.right}px`;
    close.style.justifySelf = "flex-end";

    // event listener
    close.addEventListener("click", () => {
      remove_menu();
    });
  }
}

function transfer_task(clicked_task, transfer_to) {
  task.get(selected_projectID).splice(clicked_task, 1);
  task.get(transfer_to).unshift(clicked_task);

  task_copy = structuredClone(task);
  appendTask_DOM(task_copy);
}

function edit_task(clicked_task) {
  exit_taskCreator.style.display = "block";

  const task_editor = document.createElement("form");
  task_editor.id = "task_editor";

  const title_editor = document.createElement("label");
  title_editor.htmlFor = "title_editor";
  const titleEditor_inp = document.createElement("input");
  titleEditor_inp.type = "text";
  titleEditor_inp.id = "title_editor";

  const taskDate_editor = document.createElement("label");
  taskDate_editor.htmlFor = "taskDate_editor";
  const dateEditor_inp = document.createElement("input");
  dateEditor_inp.type = "datetime-local";
  dateEditor_inp.id = "taskDate_editor";

  const priority_editor = document.createElement("select");
  priority_editor.id = "priority_editor";
  const priority_high = document.createElement("option");
  priority_high.value = "high";
  priority_high.textContent = "High";
  const priority_medium = document.createElement("option");
  priority_medium.value = "medium";
  priority_medium.textContent = "Medium";
  const priority_low = document.createElement("option");
  priority_low.value = "low";
  priority_low.textContent = "Low";

  const buttons = document.createElement("div");
  buttons.id = "editor_buttons";

  const remove_editor = document.createElement("button");
  remove_editor.type = "button";
  remove_editor.id = "remove_editor";
  remove_editor.textContent = "Cancel";

  const edit_task = document.createElement("button");
  edit_task.type = "submit";
  edit_task.id = "edit_task";
  edit_task.textContent = "Done";

  // append the element to their respective parents
  taskForm_parent.appendChild(task_editor);
  task_editor.appendChild(title_editor);
  task_editor.appendChild(taskDate_editor);
  task_editor.appendChild(priority_editor);
  task_editor.appendChild(buttons);
  buttons.appendChild(remove_editor);
  buttons.appendChild(edit_task);
  title_editor.appendChild(titleEditor_inp);
  taskDate_editor.appendChild(dateEditor_inp);
  priority_editor.appendChild(priority_high);
  priority_editor.appendChild(priority_medium);
  priority_editor.appendChild(priority_low);

  const full_date = new Date(clicked_task.date);
  const yr = full_date.getFullYear();
  const mon = String(full_date.getMonth() + 1).padStart(2, "0");
  const day = String(full_date.getDay()).padStart(2, "0");
  const hr = String(full_date.getHours()).padStart(2, "0");
  const min = String(full_date.getMinutes()).padStart(2, "0");

  // inserting task values
  document.getElementById("title_editor").value += `${clicked_task.title}`;
  document.getElementById("taskDate_editor").value =
    `${yr}-${mon}-${day}T${hr}:${min}`;
  document.getElementById("priority_editor").value = `${clicked_task.priority}`;

  remove_editor.addEventListener("click", () => {
    exit_taskEditor();
    exit_taskCreator.style.display = "none";
  });
  task_editor.addEventListener("submit", (event) => {
    event.preventDefault();

    clicked_task.title = document.getElementById("title_editor").value;
    clicked_task.date = format_date(
      document.getElementById("taskDate_editor").value,
    );
    clicked_task.priority = document.getElementById("priority_editor").value;

    taskDate_editor.addEventListener("change", () => {
      document.getElementById("taskDate_editor").setCustomValidity("");
    });

    // validating date input
    const current_date = new Date();
    const dueDate = new Date(document.getElementById("taskDate_editor").value);
    const setDate_max = new Date(current_date);
    setDate_max.setFullYear(current_date.getFullYear() + 5);

    if (dueDate <= current_date) {
      document
        .getElementById("taskDate_editor")
        .setCustomValidity("Task date must be in the future.");
      task_editor.reportValidity();
      return;
    }

    if (dueDate > setDate_max) {
      document
        .getElementById("taskDate_editor")
        .setCustomValidity("Task date must be less than 5 years time");
      task_editor.reportValidity();
      return;
    }

    exit_taskEditor();

    exit_taskCreator.style.display = "none";

    task_copy = structuredClone(task);
    appendTask_DOM(task_copy);
  });
}

function formatDueDate(now, dueDate) {
  const sameYear = now.getFullYear() === dueDate.getFullYear();
  const sameMonth = now.getMonth() === dueDate.getMonth();
  const sameDay = now.getDate() === dueDate.getDate();

  if (sameYear && sameMonth && sameDay) {
    return dueDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (sameYear) {
    return dueDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "2-digit",
    });
  }

  return dueDate.getFullYear();
}

const setDate = document.getElementById("setDate");
setDate.addEventListener("input", () => {
  // clearing custom error
  setDate.setCustomValidity("");
});

function active_emptyState() {
  if (active_taskContent.innerHTML === "") {
    const empty_state = active_figure.cloneNode(true);
    empty_state.id = "active_empty";
    active_taskContent.innerHTML = "";
    active_taskContent.appendChild(empty_state);
    activeEmptyState_placement();
  } else {
    return;
  }
}

function completed_emptyState() {
  if (completed_taskContent.innerHTML === "") {
    const empty_state = completed_figure.cloneNode(true);
    empty_state.id = "completed_empty";
    completed_taskContent.innerHTML = "";
    completed_taskContent.appendChild(empty_state);
    completedEmptyState_placement();
  } else {
    return;
  }
}

function activeEmptyState_placement() {
  if (document.querySelector(".active")) {
    active_taskContent.style.justifyContent = "flex-start";
  } else {
    active_taskContent.style.justifyContent = "center";
  }
}

function completedEmptyState_placement() {
  if (document.querySelector(".completed")) {
    completed_taskContent.style.justifyContent = "flex-start";
  } else {
    completed_taskContent.style.justifyContent = "center";
  }
}

function format_date(raw_date) {
  const date = new Date(raw_date);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
