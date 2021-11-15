//Main list containing projects
const TodoList = () => {
    const projects = [];

    const addProject = project => projects.push(project);

    function removeProject(projectTitle){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getTitle() === projectTitle){
                projects.splice(i, 1);
                break;
            }
        }
    }

    function removeTodo(projectTitle, todoTitle){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getTitle() === projectTitle){
                projects[i].removeTodo(todoTitle);
                break;
            }
        }
    }

    function addTodo(projectTitle, todo){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getTitle() === projectTitle){
                projects[i].addTodo(todo);
                break;
            }
        }
    }

    function toggleTodoStatus(projectTitle, todoTitle){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getTitle() === projectTitle){
                projects[i].toggleTodoStatus(todoTitle);
                break;
            }
        }
    }

    function getProject(projectTitle){
        for(let i = 0; i < projects.length; i++){
            if(projects[i].getTitle() === projectTitle){
                return projects[i];
            }
        }
    }

    const getProjects = () => projects;

    function length(){
        return projects.length;
    }

    return { 
        addProject,
        removeProject,
        toggleTodoStatus,
        getProject,
        getProjects,
        removeTodo,
        addTodo,
        length
    };
};

export default TodoList;