const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "TODO-LIST";
const TODOS_STORAGE_PREFIX = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
todos.forEach((todo) => {
  renderTodo(todo);
});

//Complete todos
list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  saveTodos();
});

// Delete todos
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;

  parent.remove();

  todos = todos.filter((t) => t.id !== todoId);

  saveTodos();
});

// Add Todos

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoName = todoInput.value;
  if (todoInput.value === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  todoInput.value = "";
});

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todo.name;
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;
  list.appendChild(templateClone);
}
// Save Todos
function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_PREFIX, JSON.stringify(todos));
}
// Load Todos
function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_PREFIX);
  return JSON.parse(todosString) || [];
}
