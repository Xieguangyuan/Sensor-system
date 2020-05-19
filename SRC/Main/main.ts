import * as path from 'path'
import * as ps from 'child_process'
import { format as formatUrl } from 'url'
import { app, BrowserWindow } from 'electron';
const isDevelopment = process.env.NODE_ENV !== 'production'
function createWindow() {
    let win = new BrowserWindow({
        width: 955,
        height: 600,
        minWidth: 955,
        minHeight: 600,
        autoHideMenuBar: false,
        title: "Accss - Electron Autopilot controller",
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (isDevelopment) {
        win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
    }
    else {
        win.loadURL(formatUrl({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
    }
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    ps.spawn("taskkill", ["/F", "/IM", "ACCSSVideoServer.exe"]);
})