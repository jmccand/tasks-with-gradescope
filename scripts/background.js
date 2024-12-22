chrome.action.onClicked.addListener(function() {
    chrome.tabs.create({url: 'nuxt-app/dist/index.html'});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        (async () => {
            const token = await getAuthToken(true);

            if (request.type === "getTaskLists") {
                const taskListResponse = await fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const taskListJson = await taskListResponse.json();
                sendResponse({
                    taskLists: taskListJson.items,
                    selected: 0, // default to first list
                });
                return;
            } else if (request.type === "addTask") {
                // add to task list
                const {
                    taskListId,
                    ...apiRequest
                 } = request;
                const taskResponse = await fetch(`https://www.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(apiRequest),
                });

                const response = {
                    success: taskResponse.ok,
                    status: taskResponse.status,
                    statusText: taskResponse.statusText,
                };
                
                sendResponse(response);
            }
        })();
        return true;
    }
);

function getAuthToken(interactive) {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive }, (token) => {
        if (chrome.runtime.lastError || !token) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(token);
        }
      });
    });
  }
  