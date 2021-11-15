export default function sidebar(projects){
    const mainContainer = document.createElement('div');
    const sidebarList = document.createElement('div');
    const home = document.createElement('h2');
    
    home.setAttribute('id', 'home');
    home.textContent = "Home";
    sidebarList.appendChild(home);

    //Creates element in sidebar that displays a project and its Todos
    for(let i = 0; i < projects.length; i++){
        let currentProjectContainer = document.createElement('div');
        let currentProjectTitle = document.createElement('h2');
        let text = document.createTextNode(projects[i].getTitle());
        currentProjectTitle.appendChild(text);
        currentProjectTitle.setAttribute('class', 'project-links');
        currentProjectContainer.appendChild(currentProjectTitle);

        let todosList = document.createElement('ul');
        let todos = projects[i].getTodos();
        for(let j = 0; j < todos.length; j++){
            let currentTodo = document.createElement('li');
            currentTodo.textContent = todos[j].getTitle();
            todosList.appendChild(currentTodo);
        }
        currentProjectContainer.appendChild(todosList);
        sidebarList.appendChild(currentProjectContainer);
    }
    
    mainContainer.appendChild(sidebarList);
    
    return mainContainer;
}


