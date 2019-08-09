import { projectDirectory } from './index.js'

const DisplayController = (() => {
    const renderProjectBar = () => {
        const projectMainDiv = document.querySelector('.projects')

        projectDirectory.forEach(x, () => {
            let projectAdded = document.createElement('div');
            projectAdded.innerHTML = x.name;
            projectAdded.classList.add('project-' + projectDirectory.indexOf(x)) 
        })
    }
})();

export { DisplayController }