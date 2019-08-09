

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

    return {name, description, dueDate, priority, addToDo, getToDo};

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

    return {renderProjectBar}
})();


//default project
addProject('Daily list', 'Things to do today', '', 'low');
addProject('Daily list2', 'Things to do today', '', 'low');
addProject('Daily list3', 'Things to do today', '', 'low');
addProject('Daily list4', 'Things to do today', '', 'low');
DisplayController.renderProjectBar();

// export { projectDirectory }

// //y.insertBefore(x, y.children[1])