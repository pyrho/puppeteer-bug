console.log('Script loaded');
const port = chrome.runtime.connect({ name: 'testport' })
console.log('Port created');
