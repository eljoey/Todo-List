


// import { DisplayController } from './displayController.js'




let projectDirectory = [];

const projName = document.querySelector('.proj-form-name')
const projDesc = document.querySelector('.proj-form-desc')
const projDate = document.querySelector('.proj-form-date')
const projPrio = document.querySelector('.proj-form-prio')
const todoName = document.querySelector('.todo-form-name')
const todoDesc = document.querySelector('.todo-form-desc')



const ToDo = (title) => {
    return {title};
};

const Project = (name, description, dueDate, priority) => { 
    const toDos = [];

    const addToDo = (todo) => {
        toDos.push(todo);
    };

    const getToDo = (index) => {
        return toDos[index];
    };
    
    const getIndex = (obj) => {
        return projectDirectory.indexOf(obj);
    }

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

////////////////////////////////////

const DisplayController = (() => {
    const renderProjectBar = () => {
        const projectMainDiv = document.querySelector('.projects');
        resetProjects();
        resetForms();
        
        //renders each project and gives appropriate classes to style based off prio
        projectDirectory.forEach((x) => {
            let projectAdded = document.createElement('div');
            projectAdded.innerHTML = x.name;
            projectAdded.classList.add('project-' + projectDirectory.indexOf(x));
            projectAdded.classList.add('prio-' + x.priority);
            projectAdded.addEventListener('click', () => {
                EventHandler.showProjectTodos(projectDirectory.indexOf(x));
            }); 
            projectMainDiv.appendChild(projectAdded);
        });
    }
    const renderTodoList = (project) => {
        const projectHeader = document.querySelector('.proj-header');

        renderProjectInfo();
        resetToDos();
        resetForms();
        editDeleteBTN(projectHeader);

        const todoDiv = document.querySelector('#right-section');
        
        project.toDos.forEach((x) => {
            let todoAdded = document.createElement('div');
            todoAdded.innerHTML = x.title;
            todoAdded.classList.add('todo-' + project.toDos.indexOf(x));
            todoDiv.appendChild(todoAdded);            
            editDeleteBTN(todoAdded);
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
        projectForm.setAttribute('style', 'display: grid;');
    }
    
    const showAddToDoForm = () => {
        const todoForm = document.querySelector('.add-todo-form');
        todoForm.setAttribute('style', 'display: grid;');
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
    }

    //Adds Edit and Delete icons to selected element
    const editDeleteBTN = (element) => {
        
        //Prevents default 'Daily List' from getting delete buttons.  I dont want it to ever get deleted;
        if (element.innerHTML == 'Daily List') return;

        const trashBTN = document.createElement('i');
        trashBTN.classList.add('fas', 'fa-trash-alt');
        trashBTN.addEventListener('click', () => {
            EventHandler.removeItem(element);
        });
        
        element.appendChild(trashBTN);
    }

    const renderProjectInfo = () => {
        const dueDate = document.querySelector('.proj-dueDate')
        const priority = document.querySelector('.proj-prio')
        const description = document.querySelector('.proj-desc')

        dueDate.innerHTML = projectSelected.dueDate
        priority.innerHTML = projectSelected.priority
        description.innerHTML = projectSelected.description
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
        const projectBTN = document.querySelector('.addProjectBTN');
        projectBTN.addEventListener('click', DisplayController.showAddProjectForm);
    }

    //Gets Projects information and sets it.  I feel like this could be better set up.
    const projectFormBTN = () => {
        
        const projectFormBTN = document.querySelector('.add-project-button');
        projectFormBTN.addEventListener('click', () => {
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

////////////////////////////////////

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
        projectSelected = projectDirectory[projIndex];        
        
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





//test
//////////////
EventHandler.addProject('Daily List', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list2', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list3', 'Things to do today', '', 'low');
EventHandler.addProject('Daily list4', 'Things to do today', '', 'low');
projectDirectory[0].addToDo(ToDo(1))
projectDirectory[0].addToDo(ToDo(12))
projectDirectory[0].addToDo(ToDo(123))
projectDirectory[0].addToDo(ToDo(1234))
projectDirectory[1].addToDo(ToDo(1))
projectDirectory[1].addToDo(ToDo(12))
projectDirectory[1].addToDo(ToDo(123))
let projectSelected = projectDirectory[0]
DisplayController.renderProjectBar();
DisplayController.renderTodoList(projectDirectory[0]);
EventListeners.initializeListeners();

///////////////
// export { projectDirectory }


//  TODO LIST
//-Add - Project info render
//-Add - Ability to complete a todo (checkmark possibly)
//-Add - Ability to change color of projects background to reflect their priority



