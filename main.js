var ElectronMain = require("electron");

function createWindow() {
    var win = new ElectronMain.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile('SRC/HTML/index.html');
}
ElectronMain.app.on('ready', createWindow);