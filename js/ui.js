task_projectName.textContent = selected_project;

window.addEventListener("resize", () => {
  clearTimeout(resize_timer);

  resize_timer = setTimeout(() => {
    task_copy = structuredClone(task);
    appendTask_DOM(task_copy);
  }, 100);
});

body.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.closest("#newProject") && !target.closest("#addProject")) {
    newProject_hidden = true;
    newProject_inp.disabled = true;
    newProject_inp.value = "";
    clear_projectCreator();
  }

  if (
    !target.closest("#menu") &&
    !target.closest("#project_list") &&
    !target.closest("#empty_listMenu")
  ) {
    remove_menu();
  }
});

newProject_inp.addEventListener("blur", (event) => {
  if (event.currentTarget.textContent !== "") {
    newProject_hidden = true;
    newProject_inp.disabled = false;
  }
});

select_project.addEventListener("change", () => {
  update_selectedProject();
  clear_taskCreator();
  del_taskCreator();
  active_emptyState();
  completed_emptyState();
  task_copy = structuredClone(task);
  appendTask_DOM(task_copy);
});

form_one.addEventListener("submit", (event) => {
  event.preventDefault();

  switch (newProject_hidden) {
    case true:
      document.querySelector('[for="selectProject"]').style.display = "none";
      document.querySelector('[for="newProject"]').style.display = "block";
      del_project.style.opacity = "0.2";
      if (desktop.matches) {
        del_taskCreator();
      }
      newProject_inp.disabled = false;
      newProject_hidden = false;
      break;
    case false:
      del_taskCreator();
      create_newProject();
      if (!task.has(selected_projectID)) {
        task.set(selected_projectID, []);
      }
      newProject_inp.disabled = true;
      newProject_hidden = true;
      break;
  }
});

del_selectedProject.addEventListener("click", () => {
  if (selected_projectID === "p_012345") {
    return;
  } else {
    select_project.removeChild(
      document.querySelector(`[value="${selected_projectID}"]`),
    );
    task.delete(selected_projectID);
    del_taskCreator();
    update_selectedProject();
    task_copy = structuredClone(task);
    appendTask_DOM(task_copy);
  }
});

sort.addEventListener("change", () => {
  task_copy = structuredClone(task);
  appendTask_DOM(task_copy);
});

exit_taskCreator.addEventListener("click", () => {
  del_taskCreator();
  clear_taskCreator();
  if (document.getElementById("task_editor")) {
    exit_taskEditor();
  }
});

if (mobile.matches) {
  let press_timer;
  active_taskContent.addEventListener("pointerdown", (event) => {
    const selected_task = event.target.closest("li");
    if (!selected_task || event.pointerType !== "touch") return;

    press_timer = setTimeout(() => {
      show_contextMenu(selected_task, event);
    }, 550);
  });
  active_taskContent.addEventListener("pointerup", () => {
    clearTimeout(press_timer);
  });
  active_taskContent.addEventListener("pointercancel", () => {
    clearTimeout(press_timer);
  });
} else {
  active_taskContent.addEventListener("contextmenu", (event) => {
    const selected_task = event.target.closest("li");
    if (!selected_task) return;

    // prevent default browser context menu
    event.preventDefault();

    show_contextMenu(selected_task, event);
  });
}

active_taskContent.addEventListener("change", (event) => {
  checked_option(event);
});

function show_contextMenu(selected_task, event) {
  if (document.getElementById("menu") !== null) {
    remove_menu();
  } else {
    const clicked_list = get_clickedTask(selected_task);

    const menu = document.createElement("div");
    menu.id = "menu";
    const edit_opt = document.createElement("p");
    edit_opt.textContent = "Edit Task";
    edit_opt.id = "edit_opt";
    const complete_opt = document.createElement("p");
    complete_opt.textContent = "Mark as Completed";
    complete_opt.id = "complete_opt";
    const info_opt = document.createElement("p");
    info_opt.textContent = "Task Information";
    info_opt.id = "info_opt";
    const transfer_opt = document.createElement("p");
    transfer_opt.textContent = "Move to Project...";
    transfer_opt.id = "transfer_opt";
    const del_opt = document.createElement("p");
    del_opt.textContent = "Delete";
    del_opt.id = "del_opt";
    menu.appendChild(edit_opt);
    menu.appendChild(complete_opt);
    menu.appendChild(info_opt);
    menu.appendChild(transfer_opt);
    menu.appendChild(document.createElement("hr"));
    menu.appendChild(del_opt);
    // append to body
    body.appendChild(menu);

    // style
    menu.style.left = `${event.clientX}px`;
    menu.style.top = `${event.clientY}px`;

    // event listeners
    menu.addEventListener("click", (event) => {
      const target = event.target;
      if (target.matches("#edit_opt")) {
        remove_menu();
        edit_task(clicked_list);
      } else if (target.matches("#complete_opt")) {
        remove_menu();
        clicked_list.completed = true;
        task_copy = structuredClone(task);
        appendTask_DOM(task_copy);
      } else if (target.matches("#info_opt")) {
        remove_menu();
        append_taskInfo(clicked_list);
      } else if (target.matches("#transfer_opt")) {
        const clicked_element = event.target.closest("#transfer_opt");
        project_list(clicked_list, clicked_element);
      } else if (target.matches("#del_opt")) {
        remove_menu();
        del_taskII(clicked_list);
      }
    });
  }
}

disp_checkboxes.addEventListener("click", () => {
  switch (checkbox_shown) {
    case false:
      checkbox_shown = true;
      break;
    default:
      checkbox_shown = false;
      break;
  }

  if (checkbox_shown) {
    return active_taskContent
      .querySelectorAll("label")
      .forEach((element) => (element.style.display = "flex"));
  } else {
    remove_checkedOpt();
    return active_taskContent
      .querySelectorAll("label")
      .forEach((element) => (element.style.display = "none"));
  }
});

sidebar_opener.addEventListener("click", () => {
  sidebar.style.display = "block";
  exit_taskCreator.style.display = "flex";
});

sidebar_closer.addEventListener("click", () => {
  del_taskCreator();
});

desktop_sidebarController.addEventListener("click", () => {
  switch (hide_sidebar) {
    case false:
      hide_sidebar = true;
      break;
    default:
      hide_sidebar = false;
      break;
  }

  if (hide_sidebar) {
    desktop_sidebarController.style.display = "none";
    sidebar_main.style.display = "none";
    sidebar.style.width = "fit-content";
    body.style.display = "flex";
    body.style.flexDirection = "row";
    main.style.width = "100%";

    logo.addEventListener("mouseover", () => {
      if (hide_sidebar) {
        logo.style.display = "none";
        desktop_sidebarController.style.display = "block";
      }
    });

    logo.addEventListener("mouseleave", () => {
      if (hide_sidebar) {
        logo.style.display = "block";
        desktop_sidebarController.style.display = "none";
      }
    });
  } else {
    desktop_sidebarController.style.display = "block";
    logo.style.display = "block";
    sidebar_main.style.display = "flex";
    sidebar.style.width = "100%";
    body.style.display = "grid";
  }
});

sidebar_main.addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("#allTask")) {
    taskList_display(all_task);
  } else if (target.matches("#activeTask")) {
    taskList_display(active_task);
  } else if (target.matches("#completedTask")) {
    taskList_display(completed_task);
  }
});
