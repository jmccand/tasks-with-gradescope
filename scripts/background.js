chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.identity.getAuthToken({interactive: true}, function(token) {
            console.log(token);
        });      
        sendResponse({response: token});
    }
);