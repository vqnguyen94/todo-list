//Display for project
const makeProjectCard = (project) => {
    const projectCardContainer = document.createElement('div');
    const projectCardContent = document.createElement('div');

    //add "Add Task" at the end of every project card
    const addTaskBtn = document.createElement('div');
    const plusText = document.createElement('span');
    const addTaskText = document.createElement('span');
    
    addTaskBtn.setAttribute('class', 'add-task');
    plusText.textContent = "+";
    plusText.setAttribute('class', 'task-plus');
    addTaskText.textContent = "Add Task";
    addTaskText.setAttribute('class', 'task-text');

    addTaskBtn.appendChild(plusText);
    addTaskBtn.appendChild(addTaskText);
    
    projectCardContent.setAttribute('class', 'project-content');

    projectCardContainer.setAttribute('id', project.getTitle());
    projectCardContainer.setAttribute('class', 'project-card');
    
    projectCardContent.appendChild(makeProjectHeader(project.getTitle()));
    projectCardContent.appendChild(addTaskBtn);

    projectCardContainer.appendChild(projectCardContent);
    
    return projectCardContainer;
};

function makeProjectHeader(title){
  const projectHeader = document.createElement('div');
  const projectTitle = document.createElement('h2');
  const deleteBtn = document.createElement('div');
  
  projectTitle.setAttribute('class', 'project-title');
  deleteBtn.textContent = 'x';
  projectTitle.textContent = title;
  //Prevents space outside the 'x' from activating delete functionality
  projectHeader.addEventListener('click', event => event.stopPropagation());
  deleteBtn.setAttribute('class', 'delete-project');
  projectHeader.setAttribute('class', 'project-header');

  projectHeader.appendChild(projectTitle);
  projectHeader.appendChild(deleteBtn);

  return projectHeader;
}

//Display for when project is selected from sidebar
const makeProjectView = (project) => {
  const projectContainer = document.createElement('div');
  const projectTitle = document.createElement('h2');
  const todosContainer = document.createElement('div');

  projectTitle.textContent = project.getTitle();

  let todos = project.getTodos();
  for(let i = 0; i < todos.length; i++){
    todosContainer.appendChild(makeTodo(todos[i]));
  }

  projectContainer.appendChild(projectTitle);
  projectContainer.appendChild(todosContainer);
  return projectContainer;
}

const makeTodo = (todo) => {
    const todoContainer = document.createElement('div');
    const deleteBtn = document.createElement('button');

    todoContainer.setAttribute('class', 'todo-container');
    
    let {title, description, dueDate, priority, completed} = todo.getAllInfo();

    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.classList.add("hide-todo-content");
    
    deleteBtn.textContent = 'Delete'; 

    todoContainer.appendChild(makeTodoHeader(title, completed));
    todoContainer.appendChild(makeTodoInfo(description, dueDate, priority));
    todoContainer.appendChild(deleteBtn);

    return todoContainer;
}

function makeTodoHeader(title, completed){
  const todoHeader = document.createElement('div');
  const todoCheckbox = document.createElement('input');
  const checkboxLabel = document.createElement("label");
  const todoTitle = document.createElement('h3');

  todoHeader.setAttribute('class', 'todo-header');
  todoCheckbox.setAttribute("type", "checkbox");
  
  checkboxLabel.appendChild(todoCheckbox);
  
  todoTitle.textContent = title;

  todoHeader.addEventListener('click', showTodoContent);
  todoTitle.classList.toggle('unclickable');
  todoCheckbox.addEventListener('click', markTodoAsComplete);
  checkboxLabel.addEventListener('click', event => event.stopPropagation());

  todoHeader.appendChild(todoTitle);
  todoHeader.appendChild(checkboxLabel);

  if(completed){
    todoHeader.classList.toggle('completed');
    todoCheckbox.checked = true;
  }

  return todoHeader;
}

function makeTodoInfo(description, date, priority){
  const todoInfoContainer = document.createElement('div');
  const datePriorityContainer = document.createElement('div');
  const descriptionContainer = document.createElement('div');
  const descriptionText = document.createElement('p');
  const dateText = document.createElement('p');
  const priorityText = document.createElement('p');

  
  dateText.textContent = "Due date: " + date;
  priorityText.textContent = "Priority: " + priority;
  if(priority == "High"){
    priorityText.setAttribute('class', 'high-priority');
  }
  else{
    priorityText.setAttribute('class', 'low-priority');
  }
  datePriorityContainer.appendChild(dateText);
  datePriorityContainer.appendChild(priorityText);
  datePriorityContainer.setAttribute('class', 'date-priority');

  descriptionText.textContent = description;
  descriptionContainer.appendChild(descriptionText);

  todoInfoContainer.appendChild(datePriorityContainer);
  todoInfoContainer.appendChild(descriptionContainer);

  todoInfoContainer.setAttribute('class', 'hide-todo-content');
  return todoInfoContainer;
}

function showTodoContent(event){
  event.stopPropagation();
  let content = event.target.nextElementSibling;

  content.classList.toggle('hide-todo-content');
  content.classList.toggle('show-todo-content');
  content.nextElementSibling.classList.toggle('hide-todo-content');
  content.nextElementSibling.classList.toggle('show-todo-content'); 
}

function markTodoAsComplete(event){
  event.stopPropagation();
  event.target.parentNode.parentNode.classList.toggle('completed');
}


export {makeProjectCard, makeProjectView, makeTodo} ;
