const electron = require('electron');
const { BrowserWindow } = require('electron-acrylic-window');

const app = electron.app;
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;
// const path = require('path');
// const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const vibrancy = {
  theme: '#12345678',
  effect: 'acrylic',
  useCustomWindowRefreshMethod: true,
  disableOnBlur: true,
  debug: false,
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    // autoHideMenuBar: false,
    backgroundColor: '#2E3440',
    // frame: false,
    // opacity: 0.9,
    vibrancy,
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');

  // Emitted when the window is closed.
  mainWindow.webContents.openDevTools(); // Open the DevTools.
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
