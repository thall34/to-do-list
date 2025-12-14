// project object container set with one default list
const defaultList = createProject("Default");
defaultList.active = true;
const allProjects = [defaultList];

// adds all projects array to local storage
function updateProjectsToLocalStorage(key, item) {
    let data = retrieveProjectsFromLocalStorage(key);
    data = item;
    let string = JSON.stringify(data);
    localStorage.setItem(key, string);
};

// retrieves all projects array from local storage 
function retrieveProjectsFromLocalStorage(key) {
    const string = localStorage.getItem(key);

    // checks if the returned string from local storage is null or undefined and resets it to the default list if it is
    if (string == null) {
        const newString = JSON.stringify([defaultList]);
        localStorage.setItem(key, newString);
        return [defaultList];
    };

    const retrievedItem = JSON.parse(string);

    // checks if the retrieved item isn't an object and resets it to default if it isn't
    if (typeof retrievedItem !== "object") {
        const newString = JSON.stringify([defaultList]);
        localStorage.setItem(key, newString);
        return [defaultList];
    } else {
        return retrievedItem;
    };
};

// factory to create list item objects
function createListItem(name, description, priority, deadline) {
    const completed = false;
    const id = crypto.randomUUID();
    return {
        name,
        description, 
        priority,
        deadline,
        completed,
        id
    };
};

// push the created list item object to a project
function addListItemToProject(item, project, projectContainer) {
    project.array.push(item);
    updateProjectsToLocalStorage("projects", projectContainer);
};

// searches for the ID of a list item object and removes only that item from a project
function removeListItemFromProject(item, project, projectContainer) {
    const index = project.array.findIndex(element => element.id === item.id);
    project.array.splice(index, 1);
    updateProjectsToLocalStorage("projects", projectContainer);
};

// takes new parameters and re-assigns them to the existing list item object, ID and completed properties remain the same
function editListItem(item, name, description, priority, deadline, projectContainer) {
    item.name = name;
    item.description = description;
    item.priority = priority;
    item.deadline = deadline;
    updateProjectsToLocalStorage("projects", projectContainer);
};

// changes the list item's boolean value for completed from false to true and vice versa
function editItemCompleted(item, projectContainer) {
    item.completed = !item.completed;
    updateProjectsToLocalStorage("projects", projectContainer);
};

// factory to create new project object
function createProject(name) {
    const array = []
    const active = false;
    const id = crypto.randomUUID();
    return { 
        name: name,
        array: array,
        active: active,
        id: id 
    };
};

// push the created project object to a project container
function addProjectToContainer(project, container) {
    container.push(project);
    updateProjectsToLocalStorage("projects", container);
};

// remove the created project object from a project container
function removeProjectFromContainer(project, container) {
    const index = container.findIndex(element => element.id === project.id);
    container.splice(index, 1);
    updateProjectsToLocalStorage("projects", container);
};

// iterates through the project container and sets all project active properties to false
function deactivateAllProjects(container) {
    container.forEach((project) => {
        project.active = false;
    });
};

// changes a project's active property to true
function activateProject(project, projectContainer) {
    project.active = true;
    updateProjectsToLocalStorage("projects", projectContainer);
};

// iterates through the project container and returns the index value of the currently active project
function getActiveProjectIndex(container) {
    const index = container.findIndex(project => project.active === true);
    return index;
};

export { createListItem, addListItemToProject, removeListItemFromProject, editListItem, editItemCompleted, createProject, addProjectToContainer, removeProjectFromContainer, deactivateAllProjects, activateProject, getActiveProjectIndex, updateProjectsToLocalStorage, retrieveProjectsFromLocalStorage, allProjects }