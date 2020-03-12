import { app, BrowserWindow } from 'electron';

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('SRC/HTML/index.html');
}

app.on('ready', createWindow);