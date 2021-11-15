//Single Todo object
const Todo = (title, description, dueDate, priority, completed) => {    
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getStatus = () => completed;
    const getAllInfo = () => ({title, description, dueDate, priority, completed});

    //For future modifications that allow for changing todos
    const setTitle = newTitle => title = newTitle;
    const setDescription = newDescription => description = newDescription;
    const setDueDate = newDueDate => dueDate = newDueDate;
    const setPriority = newPriority => priority = newPriority;
    
    function toggleStatus(){
        completed = completed == false ? true : false;
    }

    return { 
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getStatus,
        getAllInfo,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        toggleStatus
    };
};

export default Todo;