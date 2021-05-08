let googleSearchQuery = "https://www.google.com/search?q=";
let maximumElapsedTimeToGoogleInSeconds = 5
let copiedItem = ""
let copiedItemTime = ""

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if((/^http/.test(tab.url)) && changeInfo.status === 'complete') {
		chrome.tabs.executeScript(tabId, { file: './contentScript.js' });
	}
});

chrome.tabs.onCreated.addListener((tab) => {
	if (copiedItem === "" || copiedItemTime === "") {
		return
	}

	let currentTime = performance.now()
	var timeElapsed = currentTime - copiedItemTime

	// Convert to seconds
	timeElapsed = Math.round(timeElapsed / 1000)
	console.log(timeElapsed);
	console.log(copiedItem)

	if (timeElapsed <= maximumElapsedTimeToGoogleInSeconds) {		
		chrome.tabs.update({
			active: true,
			url: `${googleSearchQuery}${copiedItem}`
		});
	}
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.message === 'copiedItem') {
		copiedItem = request.payload.copiedItem
		copiedItemTime = request.payload.copiedTime
	}
})