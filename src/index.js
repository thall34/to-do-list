import "./styles.css";

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
};

// searches for the ID of a list item object and removes only that item from a project
function removeListItemFromProject(item, project) {
    const index = project.array.findIndex(element => element.id === item.id);
    project.array.splice(index, 1);
};

// takes new parameters and re-assigns them to the existing list item object, ID and completed properties remain the same
function editListItem(item, name, description, priority, deadline) {
    item.name = name;
    item.description = description;
    item.priority = priority;
    item.deadline = deadline;
};

// changes the list item's boolean value for completed from false to true and vice versa
function editItemCompleted(item) {
    item.completed = !item.completed;
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
};

// remove the created project object from a project container
function removeProjectFromContainer(project, container) {
    const index = container.findIndex(element => element.id === project.id);
    container.splice(index, 1);
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
};

// iterates through the project container and returns the index value of the currently active project
function getActiveProjectIndex(container) {
    const index = container.findIndex(project => project.active === true);
    return index;
}

// project object container to send out to UI module
const allProjects = [];

// default testing values, delete once finished
const defaultList = createProject("Default");
defaultList.active = true;
addProjectToContainer(defaultList, allProjects);

const secondaryList = createProject("Secondary");
addProjectToContainer(secondaryList, allProjects);

const item1 = createListItem("item1", "description", "normal", "today");
const item2 = createListItem("item2", "another description", "low", "tomorrow");
addListItemToProject(item1, defaultList);
addListItemToProject(item2, defaultList);

const item3 = createListItem("item3", "description", "high", "today");
const item4 = createListItem("item4", "another description", "default", "nromal", "tomorrow");
addListItemToProject(item3, secondaryList);
addListItemToProject(item4, secondaryList);

// UI elements

// container element from HTML
const container = document.getElementById("container");

// creates a display div for the entire to do list
const display = document.createElement("div");
display.id = "display";
container.appendChild(display);

// creates a header div for all  project buttons
const header = document.createElement("div");
header.id = "header";
display.appendChild(header);

// displays all projects currently in a project container and appends them to a DOM container
function displayAllProjects(projectContainer, DOMContainer) {
    DOMContainer.innerHTML = "";

    projectContainer.forEach((project) => {
        const projectButton = document.createElement("button");
        projectButton.className = "project";
        projectButton.textContent = `${project.name}`;
        projectButton.addEventListener("click", () => {
            deactivateAllProjects(projectContainer);
            activateProject(project);
            displayListItems(project, DOMContainer.nextElementSibling);
        });

        // if statement so that the default list can't be deleted
        // all other projects have a delete button that removes the associated project from the project container
        if (project.name === "Default") {
            ;
        } else {
            const projectDelete = document.createElement("button");
            projectDelete.textContent = "x";
            projectDelete.addEventListener("click", () => {
                removeProjectFromContainer(project, projectContainer);
                displayAllProjects(projectContainer, DOMContainer);
            });

            projectButton.appendChild(projectDelete);
        };

        DOMContainer.appendChild(projectButton);
    });
};

displayAllProjects(allProjects, header)

// div container to display list item objects
const listBody = document.createElement("div");
listBody.id = "list";
display.appendChild(listBody);

// displays all list items for selected project and appends them to a DOM container
function displayListItems(project, DOMContainer) {
    DOMContainer.innerHTML = "";

    project.array.forEach((item) => {
        let clicked = false;

        const itemDiv = document.createElement("div");
        itemDiv.className = `${item.priority}`;

        // creates name div with an event listener that shows and hides the additional details div
        const itemName = document.createElement("div");
        itemName.textContent = `${item.name}`;
        itemName.addEventListener("click", () => {
            if (clicked === false) {
                additionalDetails.style.display = "block";
                clicked = true;
            } else if (clicked === true) {
                additionalDetails.style.display = "none";
                clicked = false;
            };
        });

        const itemPriority = document.createElement("div");
        itemPriority.textContent = `${item.priority}`

        // creates a checkbox that toggles the items class for CSS styling when completed or not
        const itemComplete = document.createElement("input");
        itemComplete.type = "checkbox";
        itemComplete.addEventListener("change", () => {
            if (itemComplete.checked) {
                editItemCompleted(item);
                itemDiv.classList.add("complete");
            } else {
                editItemCompleted(item);
                itemDiv.className = `${item.priority}`;
            };
        });

        // button with event listener that removes the associated item from the project
        const itemDelete = document.createElement("button");
        itemDelete.textContent = "x";
        itemDelete.addEventListener("click", () => {
            removeListItemFromProject(item, project);
            displayListItems(project, DOMContainer);
        });

        // additional details div that starts hidden
        const additionalDetails = document.createElement("div");
        additionalDetails.style.display = "none";

        const itemDescription = document.createElement("div");
        itemDescription.textContent = `${item.description}`;
        const itemDeadline = document.createElement("div");
        itemDeadline.textContent = `${item.deadline}`;

        additionalDetails.append(itemDescription, itemDeadline);

        itemDiv.append(itemName, itemPriority, itemComplete, itemDelete, additionalDetails);
        DOMContainer.appendChild(itemDiv);
    });
};

displayListItems(allProjects[getActiveProjectIndex(allProjects)], listBody);

// dialogs

// new list item
const openNewListItem = document.getElementById("openNewListItem");

const newListItemDialog = document.getElementById("newListItemDialog");
const newListItemForm = document.getElementById("newListItemForm")
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");

openNewListItem.addEventListener("click", () => {
    newListItemDialog.showModal();
});

newListItemDialog.addEventListener("close", () => {
    if (newListItemDialog.returnValue === "confirm") {
        const newListItem = createListItem(nameInput.value, descriptionInput.value, priorityInput.value, deadlineInput.value);
        addListItemToProject(newListItem, allProjects[getActiveProjectIndex(allProjects)]);
        displayListItems(allProjects[getActiveProjectIndex(allProjects)], listBody);
        newListItemForm.reset();
    } else {
        newListItemForm.reset();
    };
});

// new project
const openNewProject = document.getElementById("openNewProject");

const newProjectDialog = document.getElementById("newProjectDialog");
const newProjectForm = document.getElementById("newProjectForm");
const nameInput2 = document.getElementById("name2");

openNewProject.addEventListener("click", () => {
    newProjectDialog.showModal();
});

newProjectDialog.addEventListener("close", () => {
    if (newProjectDialog.returnValue === "confirm") {
        const newProject = createProject(nameInput2.value);
        addProjectToContainer(newProject, allProjects);
        displayAllProjects(allProjects, header);
        newProjectForm.reset();
    } else {
        newProjectForm.reset();
    };
});

// need to find a way to have the buttons in the correct div and stay when switching display modes