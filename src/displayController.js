
import { projectDirectory } from './index.js'

const DisplayController = (() => {
    const renderProjectBar = () => {
        const projectMainDiv = document.querySelector('.projects')

        projectDirectory.forEach((x) => {
            let projectAdded = document.createElement('div');
            projectAdded.innerHTML = x.name;
            projectAdded.classList.add('project-' + projectDirectory.indexOf(x)) 
            projectMainDiv.insertBefore(projectAdded, projectMainDiv.children[0])
        });
    }

    const renderTodoList = (project) => {
        const todoDiv = document.querySelector('.right-section');
        
        project.toDos.forEach((x) => {
            let todoAdded = document.createElement('div');
            todoAdded.innerHTML = x.title;
            todoAdded.classList.add('todo-' + project.toDos.indexOf(x));
        })
    }

    const resetToDos = () => {
        const todoDisplay = document.querySelector('#right-section');
        let numberOfChildren = todoDisplay.childElementCount;
        let todoLastChild = todoDisplay.lastChild;

        while (numberOfChildren > 1) {
            todoDisplay.removeChild(todoLastChild);
            todoLastChild = todoDisplay.lastChild;
        }
    }

    return { renderProjectBar, renderTodoList, resetToDos}
})();

export { DisplayController,  }