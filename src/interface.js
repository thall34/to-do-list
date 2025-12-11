import { newListItemButton, editListItemButton, newProjectButton } from "./dialog.js"
import { removeListItemFromProject, editItemCompleted, removeProjectFromContainer, deactivateAllProjects, activateProject, getActiveProjectIndex, allProjects, updateProjectsToLocalStorage, retrieveProjectsFromLocalStorage } from "./logic.js"

// UI elements

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
                event.stopPropagation();
                removeProjectFromContainer(project, projectContainer);
                displayAllProjects(projectContainer, DOMContainer);
                // updateProjectsToLocalStorage("projects", projectContainer);
            });

            projectButton.appendChild(projectDelete);
        };

        DOMContainer.appendChild(projectButton);
    });
    
    newProjectButton(projectContainer, DOMContainer);
};

// displays all list items for selected project and appends them to a DOM container
function displayListItems(project, DOMContainer) {
    DOMContainer.innerHTML = "";

    project.array.forEach((item) => {
        let clicked = false;

        const itemDiv = document.createElement("div");
        itemDiv.className = `${item.priority}`;

        // creates name div with an event listener that shows and hides the description and deadline divs
        const itemName = document.createElement("div");
        itemName.textContent = `${item.name}`;
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
        itemPriority.textContent = `${item.priority}`

        // creates a checkbox that toggles the items class for CSS styling when completed or not
        const itemComplete = document.createElement("div");
        itemComplete.className = "itemComplete";

        const itemCompleteText = document.createElement("div");
        itemCompleteText.textContent = "Completed?"

        const itemCompleteInput = document.createElement("input");
        itemCompleteInput.type = "checkbox";
        itemCompleteInput.addEventListener("change", () => {
            if (itemCompleteInput.checked) {
                editItemCompleted(item);
                itemDiv.classList.add("complete");
            } else {
                editItemCompleted(item);
                itemDiv.className = `${item.priority}`;
            };
        });

        itemComplete.append(itemCompleteText, itemCompleteInput)

        // button with event listener that removes the associated item from the project
        const itemDelete = document.createElement("button");
        itemDelete.textContent = "x";
        itemDelete.addEventListener("click", () => {
            removeListItemFromProject(item, project);
            displayListItems(project, DOMContainer);
        });

        const itemDescription = document.createElement("div");
        itemDescription.textContent = `${item.description}`;
        itemDescription.style.display = "none"

        const itemDeadline = document.createElement("div");
        itemDeadline.textContent = `${item.deadline}`;
        itemDeadline.style.display = "none";

        itemDiv.append(itemName, itemPriority, itemComplete, itemDelete);
        editListItemButton(item, project, itemDiv)
        itemDiv.append(itemDescription, itemDeadline)
        DOMContainer.appendChild(itemDiv);
    });
    newListItemButton(project, DOMContainer);
};

function displayInterface(DOMContainer) {
    const header = document.createElement("div");
    header.id = "header";
    DOMContainer.appendChild(header);
    displayAllProjects(allProjects, header)

    const listBody = document.createElement("div");
    listBody.id = "list";
    DOMContainer.appendChild(listBody);
    displayListItems(allProjects[getActiveProjectIndex(allProjects)], listBody);
};

export { displayInterface, displayAllProjects, displayListItems }