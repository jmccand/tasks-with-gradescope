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
                // get task details from row
                const dueDateString = row.querySelector("time.submissionTimeChart--dueDate")?.textContent;
                const dueDate = dueDateString ? convertToDate(dueDateString) : null;
                const taskDetails = {
                    title: row.querySelector("th").textContent,
                    status: "needsAction",
                    due: dueDate?.toISOString(),
                };
                const response = await chrome.runtime.sendMessage(taskDetails);
                console.log(response);

                // display banner to change task list
                const banner = document.createElement("div");
                banner.style.position = "fixed";
                banner.style.bottom = "20px";
                banner.style.left = "50%";
                banner.style.transform = "translateX(-50%)";
                banner.style.padding = "10px";
                banner.style.backgroundColor = "#f0f0f0";
                banner.style.border = "1px solid #2d2d2d";
                banner.style.borderRadius = "5px";
                banner.style.zIndex = "1000";
                banner.textContent = `Task added to ${response.taskLists[response.selected].title}.`;
                document.body.appendChild(banner);
                setTimeout(() => {
                    banner.remove();
                }, 3000);
            })();
        }
        );
        addToTasksTd.appendChild(addToTasksButton);
        row.appendChild(addToTasksTd);
    }
}

function convertToDate(dateString) {
    // Extract the month, day, time, and period (AM/PM) from a string
    const regex = /(\w{3}) (\d{1,2}) at (\d{1,2}:\d{2})(AM|PM)/;
    const match = dateString.match(regex);
  
    if (!match) {
      throw new Error("Invalid date format");
    }
  
    const [_, month, day, time, period] = match;
  
    // Construct a Date string with the current year
    const currentYear = new Date().getFullYear();
    const dateStr = `${month} ${day} ${currentYear} ${time} ${period}`;
  
    // Parse the date string into a Date object
    return new Date(dateStr);
  }