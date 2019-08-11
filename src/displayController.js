import { projectDirectory, projectSelected } from './index.js';
import { EventHandler } from './eventHandler.js';



const projName = document.querySelector('.proj-form-name');
const projDesc = document.querySelector('.proj-form-desc');
const projDate = document.querySelector('.proj-form-date');
const projPrio = document.querySelector('.proj-form-prio');
const todoName = document.querySelector('.todo-form-name');

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
	};
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
			todoAdded.classList.add('todo-' + project.toDos.indexOf(x), 'todos');
			todoDiv.appendChild(todoAdded);            
			editDeleteBTN(todoAdded);
		});
	};

	const resetToDos = () => {
		const todoDisplay = document.querySelector('#right-section');
		let numberOfChildren = todoDisplay.childElementCount;
		let todoLastChild = todoDisplay.lastChild;

		while ((numberOfChildren > 1)) {
			todoDisplay.removeChild(todoLastChild);
			numberOfChildren = todoDisplay.childElementCount;
			todoLastChild = todoDisplay.lastChild;
		}
	};

	const resetProjects = () => {
		const projDisplay = document.querySelector('.projects');
		let numberOfChildren = projDisplay.childElementCount;
		let projLastChild = projDisplay.lastChild;

		while ((numberOfChildren > 1)) {
			projDisplay.removeChild(projLastChild);
			numberOfChildren = projDisplay.childElementCount;
			projLastChild = projDisplay.lastChild;
		}
	};

	const showAddProjectForm = () => {
		const projectForm = document.querySelector('.add-project-form');
		projectForm.setAttribute('style', 'display: grid;');
	};
    
	const showAddToDoForm = () => {
		const todoForm = document.querySelector('.add-todo-form');
		todoForm.setAttribute('style', 'display: grid;');
	};

	const hideForm = () => {
		const form = document.querySelectorAll('.hidden');
		form.forEach((e) => {
			e.setAttribute('style', 'display: none;');
		});
	};

	const resetForms = () => {
		projName.value = '';
		projDesc.value = '';
		projDate.value = '';
		projPrio.value = 'base';

		todoName.value = '';
	};

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
	};

	const renderProjectInfo = () => {
		const dueDate = document.querySelector('.proj-dueDate');
		const priority = document.querySelector('.proj-prio');
		const description = document.querySelector('.proj-desc');

		dueDate.innerHTML = projectSelected.dueDate;
		priority.innerHTML = projectSelected.priority;
		description.innerHTML = projectSelected.description;
	};

	return {
		renderProjectBar, 
		renderTodoList,
		showAddProjectForm,
		showAddToDoForm,
		hideForm,
        
	};
})();

export { DisplayController };