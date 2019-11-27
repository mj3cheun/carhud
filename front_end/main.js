// In renderer process (web page).
const { ipcRenderer } = electron;
const ReactDOM = require('react-dom');
const React = require('react');
const Root = require('./components/root.jsx');

ipcRenderer.on('asynchronous-message', (event, arg) => {
    console.log(JSON.parse(arg)); // prints message recieved
});

ReactDOM.render(<Root/>, document.getElementById('root-container'));
