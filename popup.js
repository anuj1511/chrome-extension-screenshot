function takeScreenshot() {
    console.log("takeScreenshot called");

    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab({format: "png"}, function (screenshotUrl) {
            localStorage.setItem("screenshotUrl", screenshotUrl);
            resolve(screenshotUrl);
        });
    });
}

function openEditor() {
    chrome.tabs.create({
        url: chrome.runtime.getURL("editor.html")
    });
}

function handleClick() {
	console.log("handle click");
	takeScreenshot().then(openEditor).catch(function(error) {
		console.error("Error taking screenshot:", error);
	});
}

// Attach the evenet listener to the button
document.addEventListener("DOMContentLoaded", function() {
	const screenshotBtn = document.getElementById("screenshotBtn");
	// const openEditorBtn = document.getElementById("openEditorBtn");
	console.log("inside");

	if(screenshotBtn) {		
		screenshotBtn.addEventListener("click", handleClick);
	} else {
		console.error("Button not found");
	}

	// if(openEditorBtn) {
	// 	openEditorBtn.addEventListener("click", openEditor);
	// } else {
	// 	console.error("Button not found");
	// }
})