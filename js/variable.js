const body = document.querySelector("body");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");

const mobile = window.matchMedia("(max-width:768px)");
const desktop = window.matchMedia("(min-width:769px)");

const sidebar_opener = document.getElementById("sidebarOpener");
const sidebar_closer = document.getElementById("sidebarCloser");
const logo = document.getElementById("logo");
const sidebar_main = document.getElementById("sidebarMain");

const all_task = document.getElementById("allTask");
const active_task = document.getElementById("activeTask");
const completed_task = document.getElementById("completedTask");

const all_taskNum = document.getElementById("allTaskNum");
const active_taskNum = document.getElementById("activeTaskNum");
const completed_taskNum = document.getElementById("completedTaskNum");

const sidebar_arrangement = document.getElementById("sidebar_arrangement");

const form_one = document.getElementById("selectProject_parent");

const newProject_inp = document.getElementById("newProject");
const del_selectedProject = document.getElementById("deleteProject");

const select_project = document.getElementById("selectProject");
let selected_projectID =
  select_project.options[select_project.selectedIndex].value;
let selected_project =
  select_project.options[select_project.selectedIndex].textContent;
const add_project = document.getElementById("addProject");
const del_project = document.getElementById("deleteProject");

const sidebar_sort = document.getElementById("sidebar_sort");
const sort = document.getElementById("sort");

const task_projectName = document.getElementById("task_projectName");

const active_taskContent = document.getElementById("active_taskContent");
const completed_taskContent = document.getElementById("completed_taskContent");
const active_figure = document.querySelector(".active_empty");
const completed_figure = document.querySelector(".completed_empty");

const disp_checkboxes = document.getElementById("dispCheckboxes");

const numbers = "0123456789";
let task_id;

let task = new Map();
task.set(selected_projectID, []);

let task_copy;

const taskForm_parent = document.getElementById("taskContent");
const display_taskCreator = document.querySelectorAll(".displayBtn");
const exit_taskCreator = document.getElementById("exit_taskCreator");
const task_creator = document.getElementById("taskCreator");

const task_inp = document.getElementById("taskInp");
const set_date = document.getElementById("setDate");
const set_priority = document.getElementById("setPriority");
const create = document.getElementById("create");

let active;

let checkbox_shown = false;

const desktop_sidebarController = document.getElementById(
  "desktop_sidebarController",
);
let hide_sidebar = false;

const active_taskList = document.getElementById("activeTaskList");
const completed_taskList = document.getElementById("completedTaskList");

let resize_timer;

let newProject_hidden = true;
