function createTodoForm(){
    const todoForm = document.createElement('form');

    const todoTitle = document.createElement("INPUT");
    const todoDescription = document.createElement("INPUT");
    const todoDueDate = document.createElement("INPUT");
    const todoPriorityHigh = document.createElement("INPUT");
    const todoPriorityLow = document.createElement("INPUT");
    const submitTodo = document.createElement('button');
    const highLabel = document.createElement("LABEL");
    const lowLabel = document.createElement("LABEL");

    todoForm.setAttribute('id', 'todoForm');
    todoForm.action = "javascript:void(0)"; 

    todoTitle.setAttribute("type", "text");
    todoDescription.setAttribute("type", "text");
    
    todoDueDate.setAttribute("type", "date");
    todoPriorityHigh.setAttribute("type", "radio");
    todoPriorityLow.setAttribute("type", "radio");

    todoTitle.required = true;
    todoDescription.required = true;
    todoDueDate.required = true;
    todoPriorityHigh.required = true;
    todoPriorityLow.required = true;

    highLabel.htmlFor = "highPriority";
    lowLabel.htmlFor = "lowPriority";

    todoTitle.setAttribute("id", "todoTitle");
    todoDescription.setAttribute("id", "todoDescription");
    todoDueDate.setAttribute("id", "todoDueDate");
    todoPriorityHigh.setAttribute("id", "highPriority");
    todoPriorityLow.setAttribute("id", "lowPriority");

    todoPriorityHigh.name = "priority";
    todoPriorityLow.name = "priority"

    highLabel.appendChild(todoPriorityHigh);
    lowLabel.appendChild(todoPriorityLow);

    const highText = document.createTextNode("High");
    highLabel.appendChild(highText);

    const lowText = document.createTextNode("Low");
    lowLabel.appendChild(lowText);

    todoTitle.placeholder = "Title"; 
    todoDescription.placeholder = "Description"; 
    todoDueDate.placeholder = "Due Date"; 
    
    submitTodo.setAttribute('id', 'submitTodo');
    submitTodo.setAttribute("type", "submit");
    submitTodo.textContent = "Submit";

    //Uncomment for testing----------
    // todoTitle.value = "Testing";
    // todoDescription.value = "Test Project";
    // todoDueDate.value = "2021-10-16";
    // todoPriorityHigh.checked = true;
    //-------------------------------
    
    todoForm.appendChild(todoTitle);
    todoForm.appendChild(todoDescription);
    todoForm.appendChild(todoDueDate);
    todoForm.appendChild(highLabel);
    todoForm.appendChild(lowLabel);
    todoForm.appendChild(submitTodo);

    
    return todoForm;
}


function createProjForm(){
    const projForm = document.createElement('form');
    const title = document.createElement("INPUT");
    const submitProj = document.createElement('button');

    projForm.setAttribute('id', 'projForm');
    projForm.action = "javascript:void(0)"; 

    title.setAttribute("type", "text");
    title.required = true;
    title.setAttribute("id", "projTitle");
    title.placeholder = "Title"; 
    
    submitProj.setAttribute('id', 'submitProj');
    submitProj.setAttribute("type", "submit");
    submitProj.textContent = "Submit";

    title.placeholder = "Type project name here..";

    //Uncomment for testing----------
    // title.value = "Test Project";
    //-------------------------------
    
    projForm.appendChild(title);
    projForm.appendChild(submitProj);

    return projForm;
}

export {createTodoForm, createProjForm} ;