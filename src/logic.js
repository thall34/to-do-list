// project object container to send out to UI module
const allProjects = [];

// adds all projects array to local storage

function updateProjectsToLocalStorage(key, item) {
    let data = JSON.parse(localStorage.getItem(key));
    data = item;
    let string = JSON.stringify(data);
    localStorage.setItem(key, string);
    console.log("stored");
};

// retrieves all projects array from local storage 
function retrieveProjectsFromLocalStorage(key) {
    const string = localStorage.getItem(key);
    const retrievedItem = JSON.parse(string);
    console.log("retrieved")
    return retrievedItem;
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
function addListItemToProject(item, project) {
    project.array.push(item);
    updateProjectsToLocalStorage("projects", allProjects);
};

// searches for the ID of a list item object and removes only that item from a project
function removeListItemFromProject(item, project) {
    const index = project.array.findIndex(element => element.id === item.id);
    project.array.splice(index, 1);
    updateProjectsToLocalStorage("projects", allProjects);
};

// takes new parameters and re-assigns them to the existing list item object, ID and completed properties remain the same
function editListItem(item, name, description, priority, deadline) {
    item.name = name;
    item.description = description;
    item.priority = priority;
    item.deadline = deadline;
    updateProjectsToLocalStorage("projects", allProjects);
};

// changes the list item's boolean value for completed from false to true and vice versa
function editItemCompleted(item) {
    item.completed = !item.completed;
    updateProjectsToLocalStorage("projects", allProjects);
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
    updateProjectsToLocalStorage("projects", allProjects);
};

// remove the created project object from a project container
function removeProjectFromContainer(project, container) {
    const index = container.findIndex(element => element.id === project.id);
    container.splice(index, 1);
    updateProjectsToLocalStorage("projects", allProjects);
};

// iterates through the project container and sets all project active properties to false
function deactivateAllProjects(container) {
    container.forEach((project) => {
        project.active = false;
    });
};

// changes a project's active property to true
function activateProject(project) {
    project.active = true;
    updateProjectsToLocalStorage("projects", allProjects);
};

// iterates through the project container and returns the index value of the currently active project
function getActiveProjectIndex(container) {
    const index = container.findIndex(project => project.active === true);
    return index;
};

// default values, delete everything below secondary list once working
const defaultList = createProject("Default");
defaultList.active = true;
addProjectToContainer(defaultList, allProjects);

// const secondaryList = createProject("Secondary");
// addProjectToContainer(secondaryList, allProjects);

// const item1 = createListItem("item1", "description", "Normal", "today");
// const item2 = createListItem("item2", "another description", "Low", "tomorrow");
// addListItemToProject(item1, defaultList);
// addListItemToProject(item2, defaultList);

// const item3 = createListItem("item3", "description", "High", "today");
// const item4 = createListItem("item4", "another description", "Normal", "tomorrow");
// addListItemToProject(item3, secondaryList);
// addListItemToProject(item4, secondaryList);

// const initialProjects = JSON.stringify(allProjects);
// localStorage.setItem("projects", initialProjects);

export { createListItem, addListItemToProject, removeListItemFromProject, editListItem, editItemCompleted, createProject, addProjectToContainer, removeProjectFromContainer, deactivateAllProjects, activateProject, getActiveProjectIndex, retrieveProjectsFromLocalStorage, allProjects }