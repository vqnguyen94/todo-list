//Project object containing todos
const Project = (title) => {
    const todos = [];

    function getTitle() {
        return title;
    }

    function addTodo(todo){
        todos.push(todo);
    }

    function removeTodo(todoTitle){
        for(let i = 0; i < todos.length; i++){
            if(todos[i].getTitle() === todoTitle){
                todos.splice(i, 1);
                break;
            }
        }
    }

    function toggleTodoStatus(todoTitle){
        for(let i = 0; i < todos.length; i++){
            if(todos[i].getTitle() === todoTitle){
                todos[i].toggleStatus();
                break;
            }
        }
    }

    function getTodos(){
        return todos;
    }

    function length(){
        return todos.length;
    }

    return { 
        getTitle,
        addTodo,
        removeTodo,
        toggleTodoStatus,
        getTodos,
        length
    };
};

export default Project;