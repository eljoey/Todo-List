


// import { DisplayController } from './displayController.js'




let projectDirectory = [];

const projName = document.querySelector('.proj-form-name')
const projDesc = document.querySelector('.proj-form-desc')
const projDate = document.querySelector('.proj-form-date')
const projPrio = document.querySelector('.proj-form-prio')
const todoName = document.querySelector('.todo-form-name')
const todoDesc = document.querySelector('.todo-form-desc')



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

////////////////////////////////////

const DisplayController = (() => {
    const renderProjectBar = () => {
        resetProjects();
        resetForms();

        const projectMainDiv = document.querySelector('.projects')

        projectDirectory.forEach((x) => {
            let projectAdded = document.createElement('div');
            projectAdded.innerHTML = x.name;
            projectAdded.classList.add('project-' + projectDirectory.indexOf(x))
            projectAdded.addEventListener('click', () => {
                EventHandler.showProjectTodos(projectDirectory.indexOf(x))
            }); 
            projectMainDiv.appendChild(projectAdded)
        });
    }
    const renderTodoList = (project) => {
        resetToDos();
        resetForms();

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

    const resetProjects = () => {
        const projDisplay = document.querySelector('.projects');
        let numberOfChildren = projDisplay.childElementCount;
        let projLastChild = projDisplay.lastChild;

        while ((numberOfChildren > 1)) {
            projDisplay.removeChild(projLastChild);
            numberOfChildren = projDisplay.childElementCount;
            projLastChild = projDisplay.lastChild;
        }
    }

    const showAddProjectForm = () => {
        const projectForm = document.querySelector('.add-project-form');
        projectForm.setAttribute('style', 'display: grid;')
    }
    

    const showAddToDoForm = () => {
        const todoForm = document.querySelector('.add-todo-form')
        todoForm.setAttribute('style', 'display: grid;')
    }

    const hideForm = () => {
        const form = document.querySelectorAll('.hidden');
        form.forEach((e) => {
            e.setAttribute('style', 'display: none;')
        });
    }

    const resetForms = () => {
        projName.value = '';
        projDesc.value = '';
        projDate.value = '';
        projPrio.value = 'base';

        todoName.value = '';
        todoDesc.value = '';
    }

    


    return {
        renderProjectBar, 
        renderTodoList,
        showAddProjectForm,
        showAddToDoForm,
        hideForm,
        
    }
})();

///////////////////////////////////////////////////////

const EventListeners = (() => {
    const initializeListeners = () => {
        addProjectForm();
        addToDoBTN();
        exitForm();
        projectFormBTN();
        todoFormBTN();
    }

    const addProjectForm = () => {
        const projectBTN = document.querySelector('.addProjectBTN')
        projectBTN.addEventListener('click', DisplayController.showAddProjectForm)        
    }

//Gets Projects information and sets it.  I feel like this could be better set up.
    const projectFormBTN = () => {
        const projectFormBTN = document.querySelector('.add-project-button');
        projectFormBTN.addEventListener('click', () => {
            let projNameValue = projName.value
            let projDescValue = projDesc.value
            let projDateValue = projDate.value
            let projPrioValue = projPrio.value

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
            let todoNameValue = todoName.value
            let todoDescValue = todoDesc.value

            EventHandler.addToDo(todoNameValue, todoDescValue);
        });
    }

    const addToDoBTN = () => {
        const todoBTN = document.querySelector('.addToDoBTN');
        todoBTN.addEventListener('click', DisplayController.showAddToDoForm)

    }

    return {
        exitForm,
        initializeListeners,

    }
})();

////////////////////////////////////

const EventHandler = (() => {
    let projectSelected = projectDirectory[0];

    const addProject = (name, description, dueDate, priority) => {
        let newProject = Project(name, description, dueDate, priority);
        projectDirectory.push(newProject);
        DisplayController.renderProjectBar();
        DisplayController.hideForm();
    };

    const addToDo = (name, desc) => {
        if (projectSelected === undefined) projectSelected = projectDirectory[0]
        
        let newToDo = ToDo(name, desc)
        projectSelected.addToDo(newToDo);
        DisplayController.renderTodoList(projectSelected); 
        DisplayController.hideForm();       
    }

    const showProjectTodos = (projIndex) => {
        projectSelected = projectDirectory[projIndex];

        DisplayController.renderTodoList(projectSelected);
    }
    

    

    return {
        addProject,
        addToDo,
        projectSelected,
        showProjectTodos,
        
    }
})();





//test
//////////////
EventHandler.addProject('Daily list', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list2', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list3', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list4', 'Things to do today', '', 'low');
projectDirectory[0].addToDo(ToDo(1, 2))
projectDirectory[0].addToDo(ToDo(12, 2))
projectDirectory[0].addToDo(ToDo(123, 2))
projectDirectory[0].addToDo(ToDo(1234, 2))
projectDirectory[1].addToDo(ToDo(1, 2))
projectDirectory[1].addToDo(ToDo(12, 2))
projectDirectory[1].addToDo(ToDo(123, 2))
DisplayController.renderProjectBar();
DisplayController.renderTodoList(projectDirectory[0]);
EventListeners.initializeListeners();
///////////////
// export { projectDirectory }


//  TODO LIST
//-Add - EventListeners
//-Add - Project info render
//-Add - ToDo info render
//-Add- Button functions
//-Add - To Render so it adds edit and delete buttons for both project and todos
//-Add - Ability to complete a todo (checkmark possibly)
//-Add - Ability to change color of projects background to reflect their priority
//-Add - Possibly create a visual for each project to display the days left until their due (probably wont add and just delete due date)
//-Add - ToDo create and delete form
//-Add - Project delete form



//project selction
//1. add event listener to each project added
//2. event listener uses function to set project shown and then display the list of todo's
//
//
//
//
//