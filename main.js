const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Check for updates and notify
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info);
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (error) => {
    console.error('Update error:', error);
  });
}

app.whenReady().then(() => {
  createWindow();

  // Optionally, specify the feed URL for the autoUpdater
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'MotanOfficial',
    repo: 's3rp3nt',
    token: process.env.GH_TOKEN
  });
});

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
