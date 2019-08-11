const Project = (name, description, dueDate, priority) => { 
    const toDos = [];

    const addToDo = (todo) => {
        toDos.push(todo);
    };

    const getToDo = (index) => {
        return toDos[index];
    };

    return {
        name, 
        description, 
        dueDate, 
        priority, 
        addToDo, 
        getToDo, 
        toDos,
    };
};

export { Project }