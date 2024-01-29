function takeScreenshot() {
    console.log("takeScreenshot called");

    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab({format: "png"}, function (screenshotUrl) {
            // Get the URL of the current tab
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const pageUrl = tabs[0].url;

                // Store both screenshotUrl and pageUrl in localStorage
                localStorage.setItem("screenshotUrl", screenshotUrl);
                localStorage.setItem("pageUrl", pageUrl);

                resolve(screenshotUrl);
            });
        });
    });
}

function openEditor() {
    chrome.tabs.create({
        url: chrome.runtime.getURL("editor/editor.html")
    });
}

function handleClick() {
    console.log("handle click");
    takeScreenshot().then(openEditor).catch(function(error) {
        console.error("Error taking screenshot:", error);
    });
}

// Attach the event listener to the button
document.addEventListener("DOMContentLoaded", function() {
    const screenshotBtn = document.getElementById("screenshotBtn");
    console.log("inside");

    if(screenshotBtn) {        
        screenshotBtn.addEventListener("click", handleClick);
    } else {
        console.error("Button not found");
    }
});
