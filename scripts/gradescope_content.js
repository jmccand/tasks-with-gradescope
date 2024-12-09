const header = document.querySelector("tr[role='row']");
const rows = document.querySelectorAll("tr.odd[role='row'], tr.even[role='row']");
if (header && rows) {
    // edit widths of existing headers
    for (const child of header.childNodes) {
        child.style.width = "auto";
    }
    // add a new header
    const tasksHeader = document.createElement("th");
    tasksHeader.textContent = "Add to Tasks";
    // add attributes to header
    tasksHeader.setAttribute("role", "columnheader");
    tasksHeader.setAttribute("scope", "col");
    tasksHeader.setAttribute("rowspan", "1");
    tasksHeader.setAttribute("colspan", "1");
    tasksHeader.setAttribute("aria-label", "Add to tasks column header");
    tasksHeader.setAttribute("aria-sort", "none");
    tasksHeader.style.width = "auto";
    tasksHeader.style.textAlign = "right";
    // add to DOM
    header.appendChild(tasksHeader);

    for (const row of rows) {
        // create td to hold add to tasks button
        const addToTasksTd = document.createElement("td");
        // center button in flex
        addToTasksTd.style.verticalAlign = "middle";
        addToTasksTd.style.textAlign = "right";
        // create button to add to tasks
        const addToTasksButton = document.createElement("button");
        addToTasksButton.textContent = "Add to Tasks";
        // style button
        addToTasksButton.style.border = "1px solid #2d2d2d"
        addToTasksButton.style.borderRadius = "200px";
        addToTasksButton.style.padding = "5px 10px";
        // add to DOM
        addToTasksButton.addEventListener("click", function() {
            (async () => {
                const response = await chrome.runtime.sendMessage({type: "addTask", task: row});
                console.log("response", response);
            })();
        }
        );
        addToTasksTd.appendChild(addToTasksButton);
        row.appendChild(addToTasksTd);
    }
}