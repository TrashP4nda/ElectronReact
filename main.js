const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // If you're using Electron >= 12
    }
  });

  if (app.isPackaged) {
    // Load the packaged HTML file when running in production
    win.loadFile(path.join(__dirname, "index.html"));
  } else {
    // Load the development server URL when running in development
    win.loadURL("http://localhost:3000");
  }
  
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
