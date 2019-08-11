
import { DisplayController } from './displayController.js';
import { EventHandler } from './eventHandler.js';
import { EventListeners } from './eventlisteners.js';
import { ToDo } from './todo.js';


let projectDirectory = [];

//Default Projects
EventHandler.addProject('Daily List', 'Things to do today', 'Every Day', 'low');
EventHandler.addProject('The Odin Project', 'Learn to WebDev', '', 'high');
projectDirectory[0].addToDo(ToDo('Wake up'));
projectDirectory[0].addToDo(ToDo('Brush Teeth'));
projectDirectory[0].addToDo(ToDo('Eat Breakfast'));
projectDirectory[0].addToDo(ToDo('Do Odin Project'));
projectDirectory[1].addToDo(ToDo('Study'));
projectDirectory[1].addToDo(ToDo('Read more about JavaScript'));
projectDirectory[1].addToDo(ToDo('Finish Project'));
projectDirectory[1].addToDo(ToDo('Share Project'));

let projectSelected = projectDirectory[0];

DisplayController.renderProjectBar();
DisplayController.renderTodoList(projectDirectory[0]);
EventListeners.initializeListeners();

export { projectDirectory, projectSelected };
