

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
            projectMainDiv.appendChild(projectAdded)
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


    return {
        renderProjectBar, 
        renderTodoList, 
        resetToDos, 
        showAddProjectForm,
        showAddToDoForm,
        hideForm,
        
    }
})();



const EventListeners = (() => {
    const initializeListeners = () => {
        addProjectBTN();
        addToDoBTN();
        exitForm();
    }

    const addProjectBTN = () => {
        const projectBTN = document.querySelector('.addProjectBTN')
        projectBTN.addEventListener('click', DisplayController.showAddProjectForm)
    }
    
    //Changes form back to hidden ONLY when the background is selected not the form div
    const exitForm = () => {
        const formBackground = document.querySelectorAll('.hidden')
        formBackground.forEach((x) => {
            x.addEventListener('click', (e) => {
                if (e.currentTarget == e.target) {
                    DisplayController.hideForm();
                }
            }, false);
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
EventListeners.initializeListeners();

// export { projectDirectory }


//  TODO LIST
//-Add - EventListeners
//-Add - Project info render
//-Add - ToDo info render
//-Add - Button functions
//-Add - To Render so it adds edit and delete buttons for both project and todos
//-Add - Ability to complete a todo (checkmark possibly)
//-Add - Ability to change color of projects background to reflect their priority
//-Add - Possibly create a visual for each project to display the days left until their due (probably wont add and just delete due date)
//-Add - ToDo create and delete form
//-Add - Project delete form