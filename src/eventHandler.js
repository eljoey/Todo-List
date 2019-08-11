import { projectDirectory, projectSelected } from './index.js'
import { DisplayController } from './displayController.js'
import { ToDo } from './todo.js'
import { Project } from './project.js'



const EventHandler = (() => {
    const addProject = (name, description, dueDate, priority) => {
        let newProject = Project(name, description, dueDate, priority);
        projectDirectory.push(newProject);
        DisplayController.renderProjectBar();
        DisplayController.hideForm();
    };

    const addToDo = (name, desc) => {
        if (projectSelected === undefined) projectSelected = projectDirectory[0];
        
        let newToDo = ToDo(name, desc);
        projectSelected.addToDo(newToDo);
        DisplayController.renderTodoList(projectSelected); 
        DisplayController.hideForm();     
    }

    const showProjectTodos = (projIndex) => {
        let projectSelected = projectDirectory[projIndex];        
        
    //Sets name of selected project to header    
        const projectHeader = document.querySelector('.proj-header');
        
        if (projectSelected.name === undefined) {            
            projectHeader.innerHTML = projectDirectory[0].name;
        } else {
            projectHeader.innerHTML = projectSelected.name;
        } 

        DisplayController.renderTodoList(projectSelected);
    }

    const removeItem = (element) => {        
        if(element.className == 'proj-header') {
            projectDirectory = projectDirectory.filter( i => {
                return i.name !== projectSelected.name;
            })
            showProjectTodos(0);
            DisplayController.renderProjectBar();
        } else {
            let index = element.className.slice(-1);
            projectSelected.toDos.splice(index, 1);
            DisplayController.renderTodoList(projectSelected);
        }        
    }

    return {
        addProject,
        addToDo,
        showProjectTodos,
        removeItem
    }
})();

export { EventHandler }