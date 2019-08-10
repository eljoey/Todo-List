const EventListeners = (() => {
    const addProjectBTN = () => {
        const projectBTN = document.querySelector('.addProjectBTN')
        projectBTN.addEventListener('click', showAddProjectForm)
    }
})();