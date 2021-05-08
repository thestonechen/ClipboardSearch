document.addEventListener('copy', () => {
	navigator.clipboard.readText()
		.then(res =>  {
			chrome.runtime.sendMessage({
				message: 'copiedItem',
				payload: {copiedItem: `"${res}"`, copiedTime: new Date().getTime()}
			});
		})
		.catch(err => console.log(err))
});