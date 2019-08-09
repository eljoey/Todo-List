

// import { DisplayController } from './displayController.js'



let projectDirectory = [];



const ToDo = (title, description) => {
    return {title, description};
};

const Project = (name, description, dueDate, priority) => { 
    const toDos = [];

    const addToDo = (todo) => {
        toDos.push(todo);
    };

    const getToDo = (index) => {
        return toDos[index];
    };

    return {name, description, dueDate, priority, addToDo, getToDo, toDos};

};

const addProject = (name, description, dueDate, priority) => {
    let newProject = Project(name, description, dueDate, priority);
    projectDirectory.push(newProject);
};



const DisplayController = (() => {
    const renderProjectBar = () => {
        const projectMainDiv = document.querySelector('.projects')

        projectDirectory.forEach((x) => {
            let projectAdded = document.createElement('div');
            projectAdded.innerHTML = x.name;
            projectAdded.classList.add('project-' + projectDirectory.indexOf(x)) 
            projectMainDiv.insertBefore(projectAdded, projectMainDiv.children[0])
        })
    }
    const renderTodoList = (project) => {
        resetToDos();
        const todoDiv = document.querySelector('#right-section');
        
        project.toDos.forEach((x) => {
            let todoAdded = document.createElement('div');
            todoAdded.innerHTML = x.title;
            todoAdded.classList.add('todo-' + project.toDos.indexOf(x));
            todoDiv.appendChild(todoAdded);
        });
    }

    const resetToDos = () => {
        const todoDisplay = document.querySelector('#right-section');
        let numberOfChildren = todoDisplay.childElementCount;
        let todoLastChild = todoDisplay.lastChild;

        while ((numberOfChildren > 1)) {
            todoDisplay.removeChild(todoLastChild);
            numberOfChildren = todoDisplay.childElementCount;
            todoLastChild = todoDisplay.lastChild;
        }
    }


    return {renderProjectBar, renderTodoList, resetToDos}
})();


//test
addProject('Daily list', 'Things to do today', '', 'low');
addProject('Daily list2', 'Things to do today', '', 'low');
addProject('Daily list3', 'Things to do today', '', 'low');
addProject('Daily list4', 'Things to do today', '', 'low');
projectDirectory[0].addToDo(ToDo(1, 2))
projectDirectory[0].addToDo(ToDo(12, 2))
projectDirectory[0].addToDo(ToDo(123, 2))
projectDirectory[0].addToDo(ToDo(1234, 2))
projectDirectory[1].addToDo(ToDo(1, 2))
projectDirectory[1].addToDo(ToDo(12, 2))
projectDirectory[1].addToDo(ToDo(123, 2))
DisplayController.renderProjectBar();
DisplayController.renderTodoList(projectDirectory[0]);

// export { projectDirectory }
