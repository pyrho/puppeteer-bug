chrome.runtime.onConnect.addListener(port => {
    setInterval(() => console.log('PORT CONNECTED!'), 1000);
});
