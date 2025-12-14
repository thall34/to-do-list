import { newListItemButton, editListItemButton, newProjectButton } from "./dialog.js"
import { removeListItemFromProject, editItemCompleted, removeProjectFromContainer, deactivateAllProjects, activateProject, getActiveProjectIndex, retrieveProjectsFromLocalStorage } from "./logic.js";

// UI elements

// displays all projects currently in a project container and appends them to a DOM container
function displayAllProjects(projectContainer, DOMContainer) {
    DOMContainer.innerHTML = "";
    projectContainer.forEach((project) => {
        const projectButton = document.createElement("button");
        projectButton.textContent = `${project.name}`;
        if (project.active === true) {
            projectButton.className = "active";
        } else {
            projectButton.className = "project";
        };
        
        projectButton.addEventListener("click", () => {
            deactivateAllProjects(projectContainer);
            activateProject(project, projectContainer);
            displayAllProjects(projectContainer, DOMContainer);
            displayListItems(project, DOMContainer.nextElementSibling, projectContainer);
        });

        // if statement so that the default list can't be deleted
        // all other projects have a delete button that removes the associated project from the project container
        if (project.name === "Default") {
            ;
        } else {
            const projectDelete = document.createElement("button");
            projectDelete.textContent = "x";
            projectDelete.addEventListener("click", () => {
                // stops the delete button from activating the project buttons event listener
                event.stopPropagation();

                // gets index for the current project, then activates the previous project in the container array
                let index = projectContainer.findIndex((element) => element.id === project.id)
                deactivateAllProjects(projectContainer);
                activateProject(projectContainer[index - 1], projectContainer);

                // deletes the associated project from the container array and then re-displays the project list and list items for the active project
                removeProjectFromContainer(project, projectContainer);
                displayAllProjects(projectContainer, DOMContainer);
                displayListItems(projectContainer[getActiveProjectIndex(projectContainer)], DOMContainer.nextElementSibling, projectContainer)
            });

            projectButton.appendChild(projectDelete);
        };

        DOMContainer.appendChild(projectButton);
    });
    
    newProjectButton(projectContainer, DOMContainer);
};

// displays all list items for selected project and appends them to a DOM container
function displayListItems(project, DOMContainer, projectContainer) {
    DOMContainer.innerHTML = "";

    project.array.forEach((item) => {
        let clicked = false;

        const itemDiv = document.createElement("div");
        itemDiv.className = `${item.priority}`;

        // creates name div with an event listener that shows and hides the description and deadline divs
        const itemName = document.createElement("div");
        itemName.textContent = `Name: ${item.name}`;
        itemName.addEventListener("click", () => {
            if (clicked === false) {
                itemDescription.style.display = "block";
                itemDeadline.style.display = "block";
                clicked = true;
            } else if (clicked === true) {
                itemDescription.style.display = "none";
                itemDeadline.style.display = "none";
                clicked = false;
            };
        });

        const itemPriority = document.createElement("div");
        itemPriority.textContent = `Priority: ${item.priority}`

        // creates a checkbox that toggles the items class for CSS styling when completed or not
        const itemComplete = document.createElement("div");
        itemComplete.className = "itemComplete";

        const itemCompleteText = document.createElement("div");
        itemCompleteText.textContent = "Completed?"

        const itemCompleteInput = document.createElement("input");
        itemCompleteInput.type = "checkbox";
        itemCompleteInput.addEventListener("change", () => {
            if (itemCompleteInput.checked) {
                editItemCompleted(item, projectContainer);
                itemName.classList.add("complete");
                itemPriority.classList.add("complete");
                itemDescription.classList.add("complete");
                itemDeadline.classList.add("complete");
            } else {
                editItemCompleted(item, projectContainer);
                itemName.className = "";
                itemPriority.className = "";
                itemDescription.className = "";
                itemDeadline.className = "";
            };
        });

        itemComplete.append(itemCompleteText, itemCompleteInput)

        // button with event listener that removes the associated item from the project
        const itemDelete = document.createElement("button");
        itemDelete.textContent = "x";
        itemDelete.addEventListener("click", () => {
            removeListItemFromProject(item, project, projectContainer);
            displayListItems(project, DOMContainer, projectContainer);
        });

        const itemDescription = document.createElement("div");
        itemDescription.textContent = `Description: ${item.description}`;
        itemDescription.style.display = "none"

        const itemDeadline = document.createElement("div");
        itemDeadline.textContent = `Deadline: ${item.deadline}`;
        itemDeadline.style.display = "none";

        itemDiv.append(itemName, itemPriority, itemComplete, itemDelete);
        editListItemButton(item, project, itemDiv, projectContainer)
        itemDiv.append(itemDescription, itemDeadline)
        DOMContainer.appendChild(itemDiv);
    });

    newListItemButton(project, DOMContainer, projectContainer);
};

function displayInterface(DOMContainer) {
    let storage = retrieveProjectsFromLocalStorage("projects");
    const header = document.createElement("div");
    header.id = "header";
    DOMContainer.appendChild(header);
    displayAllProjects(storage, header)

    const listBody = document.createElement("div");
    listBody.id = "list";
    DOMContainer.appendChild(listBody);
    displayListItems(storage[getActiveProjectIndex(storage)], listBody, storage);
};

export { displayInterface, displayAllProjects, displayListItems }