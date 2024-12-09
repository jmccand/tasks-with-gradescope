chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        (async () => {
            const token = await getAuthToken(true);
            const response = await fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            console.log("response", response);

            const json = await response.json();
            console.log("response", json);
            sendResponse(json);
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
  