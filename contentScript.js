document.addEventListener('copy', () => {
	navigator.clipboard.readText()
		.then(res =>  {
			chrome.runtime.sendMessage({
				message: 'copiedItem',
				payload: {copiedItem: `"${res}"`, copiedTime: performance.now()}
			});
		})
		.catch(err => console.log(err))
});