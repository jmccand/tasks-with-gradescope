chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        (async () => {
            const token = await getAuthToken(true);

            // get task lists
            const taskListResponse = await fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            const taskListJson = await taskListResponse.json();

            // add to task list
            const taskListId = taskListJson.items[0].id;
            const taskResponse = await fetch(`https://www.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });

            const response = {
                taskLists: taskListJson.items,
                selected: 0,
            };
            
            sendResponse(response);
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
  