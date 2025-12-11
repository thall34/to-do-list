import { editListItem, createProject, addProjectToContainer } from "./logic.js"

// dialog functions

function newListItemButton(project, DOMContainer) {
    const newButton = document.createElement("button");
    newButton.textContent = "New List Item";
    DOMContainer.appendChild(newButton);

    const listItemDialog = document.createElement("dialog");

    const listItemHeader = document.createElement("h2");
    listItemHeader.textContent = "New List Item:";

    const listItemForm = document.createElement("form");
    listItemForm.method = "dialog";

    const labelItemName = document.createElement("label");
    labelItemName.textContent = "Name:";
    labelItemName.for = "itemName";

    const inputItemName = document.createElement("input");
    inputItemName.type = "text";
    inputItemName.name = "itemName";
    inputItemName.id = "itemName";

    const labelItemDescription = document.createElement("label");
    labelItemDescription.textContent = "Description:";
    labelItemDescription.for = "itemDescription";

    const inputItemDescription = document.createElement("input");
    inputItemDescription.type = "text";
    inputItemDescription.name = "itemDescription";
    inputItemDescription.id = "itemDescription";

    const labelItemPriority = document.createElement("label");
    labelItemPriority.textContent = "Priority:";
    labelItemPriority.for = "itemPriority";

    const selectItemPriority = document.createElement("select");
    selectItemPriority.name = "itemPriority";
    selectItemPriority.id = "itemPriority";

    const priorityOption1 = document.createElement("option");
    priorityOption1.textContent = "--Please choose an option--";
    priorityOption1.value = "";

    const priorityOption2 = document.createElement("option");
    priorityOption2.textContent = "Low";
    priorityOption2.value = "Low";

    const priorityOption3 = document.createElement("option");
    priorityOption3.textContent = "Normal";
    priorityOption3.value = "Normal";

    const priorityOption4 = document.createElement("option");
    priorityOption4.textContent = "High";
    priorityOption4.value = "High";

    selectItemPriority.append(priorityOption1, priorityOption2, priorityOption3, priorityOption4)

    const labelItemDeadline = document.createElement("label");
    labelItemDeadline.textContent = "Deadline:";
    labelItemDeadline.for = "itemDeadline";

    const inputItemDeadline = document.createElement("input");
    inputItemDeadline.type = "date";
    inputItemDeadline.min = new Date();
    inputItemDeadline.name = "itemDeadline";
    inputItemDeadline.id = "itemDeadline";

    const submitButton = document.createElement("button")
    submitButton.textContent = "Submit";
    submitButton.type = "submit";
    submitButton.value = "confirm";

    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel";
    cancelButton.type = "submit";
    cancelButton.value = "cancel";

    listItemForm.append(labelItemName, inputItemName, labelItemDescription, inputItemDescription);
    listItemForm.append(labelItemPriority, selectItemPriority, labelItemDeadline, inputItemDeadline);
    listItemForm.append(submitButton, cancelButton);
    listItemDialog.append(listItemHeader, listItemForm);
    newButton.append(listItemDialog);

    newButton.addEventListener("click", () => {
        listItemDialog.showModal();
    });

    listItemDialog.addEventListener("close", () => {
        if (listItemDialog.returnValue === "confirm") {
            const newListItem = createListItem(inputItemName.value, inputItemDescription.value, selectItemPriority.value, inputItemDeadline.value);
            addListItemToProject(newListItem, project);
            displayListItems(project, DOMContainer);
            listItemForm.reset();
        } else {
            listItemForm.reset();
        };
    });
};

function editListItemButton(item, project, DOMContainer) {
    const newButton = document.createElement("button");
    newButton.textContent = "Edit";
    DOMContainer.appendChild(newButton);

    const listItemDialog = document.createElement("dialog");

    const listItemHeader = document.createElement("h2");
    listItemHeader.textContent = "New List Item:";

    const listItemForm = document.createElement("form");
    listItemForm.method = "dialog";

    const labelItemName = document.createElement("label");
    labelItemName.textContent = "Name:";
    labelItemName.for = "itemName";

    const inputItemName = document.createElement("input");
    inputItemName.type = "text";
    inputItemName.name = "itemName";
    inputItemName.id = "itemName";

    const labelItemDescription = document.createElement("label");
    labelItemDescription.textContent = "Description:";
    labelItemDescription.for = "itemDescription";

    const inputItemDescription = document.createElement("input");
    inputItemDescription.type = "text";
    inputItemDescription.name = "itemDescription";
    inputItemDescription.id = "itemDescription";

    const labelItemPriority = document.createElement("label");
    labelItemPriority.textContent = "Priority:";
    labelItemPriority.for = "itemPriority";

    const selectItemPriority = document.createElement("select");
    selectItemPriority.name = "itemPriority";
    selectItemPriority.id = "itemPriority";

    const priorityOption1 = document.createElement("option");
    priorityOption1.textContent = "--Please choose an option--";
    priorityOption1.value = "";

    const priorityOption2 = document.createElement("option");
    priorityOption2.textContent = "Low";
    priorityOption2.value = "Low";

    const priorityOption3 = document.createElement("option");
    priorityOption3.textContent = "Normal";
    priorityOption3.value = "Normal";

    const priorityOption4 = document.createElement("option");
    priorityOption4.textContent = "High";
    priorityOption4.value = "High";

    selectItemPriority.append(priorityOption1, priorityOption2, priorityOption3, priorityOption4)

    const labelItemDeadline = document.createElement("label");
    labelItemDeadline.textContent = "Deadline:";
    labelItemDeadline.for = "itemDeadline";

    const inputItemDeadline = document.createElement("input");
    inputItemDeadline.type = "date";
    inputItemDeadline.min = new Date();
    inputItemDeadline.name = "itemDeadline";
    inputItemDeadline.id = "itemDeadline";

    const submitButton = document.createElement("button")
    submitButton.textContent = "Submit";
    submitButton.type = "submit";
    submitButton.value = "confirm";

    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel";
    cancelButton.type = "submit";
    cancelButton.value = "cancel";

    listItemForm.append(labelItemName, inputItemName, labelItemDescription, inputItemDescription);
    listItemForm.append(labelItemPriority, selectItemPriority, labelItemDeadline, inputItemDeadline);
    listItemForm.append(submitButton, cancelButton);
    listItemDialog.append(listItemHeader, listItemForm);
    newButton.append(listItemDialog);

    newButton.addEventListener("click", () => {
        listItemDialog.showModal();
    });

    listItemDialog.addEventListener("close", () => {
        if (listItemDialog.returnValue === "confirm") {
            editListItem(item, inputItemName.value, inputItemDescription.value, selectItemPriority.value, inputItemDeadline.value);
            displayListItems(project, DOMContainer.parentElement);
            listItemForm.reset();
        } else {
            listItemForm.reset();
        };
    });
};

function newProjectButton(projectContainer, DOMContainer) {
    const newButton = document.createElement("button");
    newButton.textContent = "New Project";
    DOMContainer.appendChild(newButton);

    const projectDialog = document.createElement("dialog");

    const projectHeader = document.createElement("h2");
    projectHeader.textContent = "New Project:"

    const projectForm = document.createElement("form");
    projectForm.method = "dialog";

    const labelProjectName = document.createElement("label");
    labelProjectName.textContent = "Name:"
    labelProjectName.for = "projectName";

    const inputProjectName = document.createElement("input");
    inputProjectName.type = "text";
    inputProjectName.name = "projectName";
    inputProjectName.id = "projectName";

    const submitButton = document.createElement("button")
    submitButton.textContent = "Submit";
    submitButton.type = "submit";
    submitButton.value = "confirm";

    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel";
    cancelButton.type = "submit";
    cancelButton.value = "cancel";

    projectForm.append(labelProjectName, inputProjectName, submitButton, cancelButton);
    projectDialog.append(projectHeader, projectForm);
    newButton.append(projectDialog);

    newButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    projectDialog.addEventListener("close", () => {
        if (projectDialog.returnValue === "confirm") {
            const newProject = createProject(inputProjectName.value);
            addProjectToContainer(newProject, projectContainer);
            displayAllProjects(projectContainer, DOMContainer);
            projectForm.reset();
        } else {
            projectForm.reset();
        };
    });
};

export { newListItemButton, editListItemButton, newProjectButton };