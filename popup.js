function takeScreenshot() {
	console.log("func called");
	chrome.tabs.captureVisibleTab({format: "png"}, function (screenshotUrl) {
		const link = document.createElement("a");
		link.href = screenshotUrl;
		link.download = "screenshot.png";
		link.click();
	});
}

function openEditor() {
	chrome.tabs.create({
		url: chrome.runtime.getURL("editor.html")
	});
}

// Attach the evenet listener to the button
document.addEventListener("DOMContentLoaded", function() {
	const screenshotBtn = document.getElementById("screenshotBtn");
	const openEditorBtn = document.getElementById("openEditorBtn");
	console.log("inside");

	if(screenshotBtn) {
		screenshotBtn.addEventListener("click", takeScreenshot);
	} else {
		console.error("Button not found");
	}

	if(openEditorBtn) {
		openEditorBtn.addEventListener("click", openEditor);
	} else {
		console.error("Button not found");
	}
})

console.log("hello");