const { app, BrowserWindow } = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {nodeIntegration: true},
        width: 800,
        height: 600,
        fullscreen: true
    });

    win.loadFile('./front_end/index.html');

    win.webContents.openDevTools();

    const python = require('child_process').spawn('python', ['./back_end/main.py']);
    python.stdout.on('data', data => {
        // print message in terminal console
        console.log('data: ', data.toString('utf8'));

        // Forward message to web app
        win.webContents.send('asynchronous-message', data);
    });

    // Emitted when the window is closed.
    win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
