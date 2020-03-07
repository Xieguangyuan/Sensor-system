import { app, BrowserWindow } from 'electron';
import { NetServerMain } from './SocketComu'

let Server: NetServerMain;

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('SRC/HTML/index.html');
}

app.on('ready', createWindow);

Server = new NetServerMain(10086, "192.168.137.1");