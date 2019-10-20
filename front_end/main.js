// In renderer process (web page).
const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-message', (event, arg) => {
    console.log(JSON.parse(arg)); // prints message recieved
})
