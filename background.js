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
		return;
	}

	let currentTime = new Date().getTime();
	var timeElapsedInSeconds = Math.round((currentTime - copiedItemTime) / 1000);

	if (timeElapsedInSeconds <= maximumElapsedTimeToGoogleInSeconds) {
		console.log("redirecting to new page")		
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