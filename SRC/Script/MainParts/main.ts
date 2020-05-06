import { app, BrowserWindow } from 'electron';

function createWindow() {
    let win = new BrowserWindow({
        width: 955,
        height: 600,
        minWidth: 955,
        minHeight: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('UIParts/index.html');
}

app.on('ready', createWindow);