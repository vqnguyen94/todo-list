//most of functionality down, maybe add delete button, and add todo button on project view pages. otherwise its just styling

//or just clean up
import Todo from './todos';
import Project from './project';
import TodoList from './list';
import home from './home';
import sidebar from './sidebar';
import {makeProjectCard, makeProjectView, makeTodo} from './dom';
import './style.css';

const mainContainer = document.querySelector('#content');

mainContainer.appendChild(home());

const addProjContainer = document.querySelector('#addProjContainer');
const addProjBtn = document.querySelector('#addProj');
const todoForm = document.querySelector('#todoForm');
const projForm = document.querySelector('#projForm');
const projTitleInput = document.querySelector('#projTitle');
const projContainer = document.querySelector('#projects');
const sideBar = document.querySelector('#sidebar');

//Gets reference to last clicked project card
let selectedProject;

todoForm.addEventListener("submit", addTodo);
projForm.addEventListener("submit", addProject);

//Main data structure
let todoList = TodoList();
//Used for storage
let storedList = [];

//Get the modal
let modal = document.getElementById("myModal");
let projModal = document.getElementById("projModal");

checkForLocalStorage();
refreshSidebar();
//localStorage.clear();


//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal || event.target == projModal ) {
    modal.style.display = "none";
    projModal.style.display = "none";
  }
} 

//Display form to add project
addProjBtn.addEventListener('click', () => {
    projModal.style.display = "block";
});

function addProject(){
    //Add project data wise
    let newProject = Project(projTitleInput.value);
    todoList.addProject(newProject);
    
    //DOM
    projContainer.appendChild(makeProjectCard(newProject));
    //Add functionality to that project's "Add task" button
    projContainer.lastChild.lastChild.lastChild.addEventListener('click', displayAddTodoForm);
    //Add functionality to 'X' to remove project
    //proj container -> proj card container -> proj header
    projContainer.lastChild.firstChild.firstChild.lastChild.addEventListener('click', removeProject);
    
    projModal.style.display = "none";
    projForm.reset();
    refreshSidebar();
    updateStoredList();       
}

function removeProject(event){
    event.stopPropagation();

    //Remove data wise
    let projectTitle = event.target.previousElementSibling.textContent;
    todoList.removeProject(projectTitle);

    //DOM
    let project = event.target.parentNode.parentNode.parentNode;
    project.remove();
    refreshSidebar();
    updateStoredList();
}

//Display Add Todo form
function displayAddTodoForm(event) {
    modal.style.display = "block";
    //addtask btn -> projectCardContent -> projectCardContainer
    selectedProject = event.target.parentNode.parentNode;
}

function getTodoValues(){
    let title = document.querySelector('#todoTitle').value;
    let description = document.querySelector('#todoDescription').value;
    let dueDate = document.querySelector('#todoDueDate').value;
    let priority = getPriority();

    return ({title, description, dueDate, priority});
}

function getPriority(){
    let priority = document.querySelector('#highPriority').checked;
    return (priority == true) ? "High" : "Low";
}

function addTodo(){
    let {title, description, dueDate, priority} = getTodoValues();
    let completed = false;
    //Gets id of the parent node of the button, aka the project title
    let projectName = selectedProject.getAttribute('id');

    //Add todo data wise
    let newTodo = Todo(title, description, dueDate, priority, completed);
    todoList.addTodo(projectName, newTodo);

    //DOM
    let domTodo = makeTodo(newTodo);
    //Functionality for Todo's 'Delete' button
    domTodo.lastChild.addEventListener('click', removeTodo);

    //Functionality for Todo's checkbox
    //todoContainer->todoHeader->checkboxLabel->checkbox
    domTodo.firstChild.lastChild.lastChild.addEventListener('click', markTodoAsComplete);

    //Add the Todo before the final element (add task button) and after any previous Todos
    selectedProject.lastChild.lastChild.insertAdjacentElement('beforebegin', domTodo);
    
    modal.style.display = "none";
    todoForm.reset();
    refreshSidebar();
    updateStoredList();   
}

function removeTodo(event){
    //Remove data wise
    //delete btn -> todoContainer -> todoHeader -> todoTitle -> text
    let todoTitle = event.target.parentNode.firstChild.firstChild.textContent; 
    //del btn -> todoContainer -> projectCardContent -> projectCardContainer's id, which is the project title
    let projectName = event.target.parentNode.parentNode.parentNode.getAttribute('id');
    todoList.removeTodo(projectName, todoTitle);

    //DOM
    let todo = event.target.parentNode;
    todo.remove();
    refreshSidebar();
    updateStoredList();
}

//Checkbox functionality to toggle "Completed" value
function markTodoAsComplete(event){
    event.stopPropagation();
    //checkbox->checkboxlabel->todoHeader->todoContainer->projCardContent->projectCardcontainer id
    let projectTitle = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
    //checkbox->checkboxlabel->todoTitle
    let todoTitle = event.target.parentNode.previousElementSibling.textContent;
    todoList.toggleTodoStatus(projectTitle,todoTitle);  

    updateStoredList(); 
}


function checkForLocalStorage(){
    if (typeof(Storage) !== "undefined") {
      //If data previously existed, then populate the library
      if (localStorage.todoList) {
        restoreFromStorage();
      }
      //Set for the first time 
      else {
        projTitleInput.value = "Example Project";
        addProject();
        localStorage.setItem('todoList', JSON.stringify(storedList));
      }
    } 
    else {
      console.log("Sorry, your browser does not support web storage...");
    }
}


function updateStoredList() {      
    storedList.length = 0;
    //Array of projects
    let tempProjects = todoList.getProjects();
    
    //Go through each project
    for(let i = 0; i < tempProjects.length; i++){
        //Temp object
        let myObject = {};
        //Add project title to object
        myObject.title = tempProjects[i].getTitle();
        //Make array in temp object to store todos
        myObject.todos = [];
        //Array of todos corresponding to current project
        let tempTodos = tempProjects[i].getTodos();
        
        //For each todo
        for(let j = 0; j < tempTodos.length; j++){
            let tempTodo = {};
            //Get components of the todo
            let {title, description, dueDate, priority, completed} = tempTodos[j].getAllInfo();
            //Copy into temp todo
            tempTodo.todoTitle = title;
            tempTodo.description = description;
            tempTodo.dueDate = dueDate;
            tempTodo.priority = priority;
            tempTodo.completed = completed;
            //Add that todo to the todos array of current project object
            myObject.todos.push(tempTodo);
        }
        //Add the object that contains project title and corresponding todos to the overall array
        storedList.push(myObject);
    }
    localStorage.setItem('todoList', JSON.stringify(storedList));
}

function restoreFromStorage(){
    storedList = JSON.parse(localStorage.getItem('todoList'));

    for(let i = 0; i < storedList.length; i++){
        //Add project from stored list to todoList
        let newProject = Project(storedList[i].title);
        todoList.addProject(newProject);
        //DOM
        addProjectFromStorage(newProject);
        
        //Extract todos from the current project
        for(let j = 0; j < storedList[i].todos.length; j++){
            //Todos array
            let todo = storedList[i].todos[j];
            let title, description, dueDate, priority, completed;
            
            title = todo.todoTitle;
            description = todo.description;
            dueDate = todo.dueDate;
            priority = todo.priority;
            completed = todo.completed;
            let newTodo = Todo(title, description, dueDate, priority, completed);
            
            //Add todo from stored list to todoList
            todoList.addTodo(storedList[i].title, newTodo);
            //DOM
            addTodoFromStorage(newTodo,storedList[i].title);
        }
    }
}

function addProjectFromStorage(project){
    //DOM
    projContainer.appendChild(makeProjectCard(project));
    //"Add Task" button functionality
    projContainer.lastChild.lastChild.lastChild.addEventListener('click', displayAddTodoForm);
    //'X' functionality
    projContainer.lastChild.firstChild.firstChild.lastChild.addEventListener('click', removeProject);
}

function addTodoFromStorage(todo, projectTitle){
    let domTodo = makeTodo(todo);

    //'remove functionality' to the 'delete button'
    domTodo.lastChild.addEventListener('click', removeTodo);

    //add functionality to checkbox
    //todoContainer->todoHeader->checkboxLabel->checkbox
    domTodo.firstChild.lastChild.lastChild.addEventListener('click', markTodoAsComplete);

    //add the todo before the final element (add task button) and after previous todos
    document.getElementById(projectTitle).lastChild.lastChild.insertAdjacentElement('beforebegin', domTodo);
}

//Functionality for "Home" in sidebar
function displayAllProjects(){ 
    refreshProjectsDisplay();
    projContainer.style.display = "grid"; 
    addProjContainer.style.display = "flex"; 
    let projectContainer = document.getElementById('selectedProjContainer');
    projectContainer.style.display = "none";  
}

function refreshProjectsDisplay(){
    removeExistingElements(projContainer);  
    addProjectsToDisplay();
}

//Similar to 'restoreFromStorage' but without adding to todoList
function addProjectsToDisplay(){
    storedList = JSON.parse(localStorage.getItem('todoList'));

    for(let i = 0; i < storedList.length; i++){
        let newProject = Project(storedList[i].title);
        addProjectFromStorage(newProject);
        
        for(let j = 0; j < storedList[i].todos.length; j++){
            let todo = storedList[i].todos[j];
            let title, description, dueDate, priority, completed;
    
            title = todo.todoTitle;
            description = todo.description;
            dueDate = todo.dueDate;
            priority = todo.priority;
            completed = todo.completed;
            let newTodo = Todo(title, description, dueDate, priority, completed);

            addTodoFromStorage(newTodo, storedList[i].title);
        }
    }
}

//Functionality to focus on a project selected from sidebar
function displaySelectedProject(event){
    event.stopPropagation();
    
    //Remove any previously displayed projects 
    let projectContainer = document.getElementById('selectedProjContainer');
    removeExistingElements(projectContainer);
    
    //DOM
    let project = todoList.getProject(event.target.textContent);
    projectContainer.appendChild(makeProjectView(project));

    //Attach delete button functionality
    let deleteBtns = projectContainer.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', projectViewRemoveTodo);
    });
    //Attach checkbox toggle functionality
    let checkboxes = projectContainer.querySelectorAll('input');
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', projectViewMarkTodoAsComplete);
    });
    projContainer.style.display = "none"; 
    addProjContainer.style.display = "none"; 
    projectContainer.style.display = "block"; 
}

function removeExistingElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Uses current state of todoList to refresh sidebar
function refreshSidebar(){
    removeExistingElements(sideBar);
    sideBar.appendChild(sidebar(todoList.getProjects()));
    let sidebarLinks = document.querySelectorAll('.project-links');

    sidebarLinks.forEach((link) => {
        link.addEventListener('click', displaySelectedProject);
    });

    let homeLink = document.querySelector('#home');
    homeLink.addEventListener("click", displayAllProjects);
}


function projectViewRemoveTodo(event){
    //remove data wise
    //delete btn -> todoContainer -> todoHeader -> todoTitle -> text
    let todoTitle = event.target.parentNode.firstChild.firstChild.textContent;

    let projectName = event.target.parentNode.parentNode.previousElementSibling.textContent;
    todoList.removeTodo(projectName, todoTitle);

    let todo = event.target.parentNode;
    todo.remove();
    refreshSidebar();
    updateStoredList();
}

function projectViewMarkTodoAsComplete(event){
    event.stopPropagation();
    // // //toggle data wise
    // // //checkbox->checkboxlabel->todoHeader->todoContainer->projCardContent->projectCardcontainer id
    let projectTitle = event.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.textContent;

    // // //checkbox->checkboxlabel->todoTitle
    let todoTitle = event.target.parentNode.previousElementSibling.textContent;
    todoList.toggleTodoStatus(projectTitle,todoTitle);  

    updateStoredList(); 
}