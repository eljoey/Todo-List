import { EventHandler } from './eventHandler.js'
import { DisplayController } from './displayController.js'

const projName = document.querySelector('.proj-form-name')
const projDesc = document.querySelector('.proj-form-desc')
const projDate = document.querySelector('.proj-form-date')
const projPrio = document.querySelector('.proj-form-prio')
const todoName = document.querySelector('.todo-form-name')

const EventListeners = (() => {
    const initializeListeners = () => {
        addProjectForm();
        addToDoBTN();
        exitForm();
        projectFormBTN();
        todoFormBTN();
    }

    const addProjectForm = () => {
        const projectBTN = document.querySelector('.addProjectBTN');
        projectBTN.addEventListener('click', DisplayController.showAddProjectForm);
    }

    //Gets Projects information and sets it.  I feel like this could be better set up.
    const projectFormBTN = () => {
        
        const projectFormBTN = document.querySelector('.add-project-button');
        projectFormBTN.addEventListener('click', () => {
            if (projName.value === '') return;     

            let projNameValue = projName.value;
            let projDescValue = projDesc.value;
            let projDateValue = projDate.value;
            let projPrioValue = projPrio.value;       

            EventHandler.addProject(projNameValue, projDescValue, projDateValue, projPrioValue);
        });        
    }
    
    //Changes form back to hidden ONLY when the background is selected not the form div
    const exitForm = () => {
        const formBackground = document.querySelectorAll('.hidden');
        formBackground.forEach((x) => {
            x.addEventListener('click', (e) => {
                if (e.currentTarget == e.target) {
                    DisplayController.hideForm();
                }
            }, false);
        });        
    }

    //Gets ToDo form info and adds it to the currently selected project
    const todoFormBTN = () => {

        const todoBTN = document.querySelector('.add-todo-button');
        todoBTN.addEventListener('click', () => {
            if (todoName.value === '') return;

            let todoNameValue = todoName.value;

            EventHandler.addToDo(todoNameValue);
        });
    }

    const addToDoBTN = () => {
        const todoBTN = document.querySelector('.addToDoBTN');
        todoBTN.addEventListener('click', DisplayController.showAddToDoForm);
    }

    return {
        exitForm,
        initializeListeners,

    }
})();

export { EventListeners }