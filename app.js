const { app, BrowserWindow, ipcMain, Menu, session } = require('electron')
const http = require('http')
const shell = require('electron').shell

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow(
        {
            width: 1280,
            height: 720,
            frame: false,
            transparent: true,
            title: "Adidas Sneakerbot"
        });
    mainWindow.loadFile("index.html");
    mainWindow.on('closed', function () {
        session.defaultSession.clearStorageData([], function (data) {
            console.log(data);
        })
        mainWindow = null
    })

    var menu = Menu.buildFromTemplate([
        {
            label: "Menu",
            submenu: [
                {
                    label: "Dev Tools",
                    click() {
                        mainWindow.webContents.openDevTools();
                    }
                },
                {
                    label: "Adidas",
                    click() {
                        shell.openExternal("http://www.adidas.com/us/")
                    }
                },
                { type: "separator" },
                {
                    label: "Exit",
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ])
    Menu.setApplicationMenu(null)

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

exports.onClick = () => {
    console.log('clicked')
}