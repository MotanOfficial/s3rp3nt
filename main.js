const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

log.transports.file.level = 'info';
log.transports.file.file = `${app.getPath('userData')}/logs/auto-update.log`;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

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

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    log.info('Update available.');
    log.info(info);
  });

  autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.');
    log.info(info);
  });

  autoUpdater.on('error', (err) => {
    log.error('Error in auto-updater.');
    log.error(err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
    logMessage += ' - Downloaded ' + progressObj.percent + '%';
    logMessage += ' (' + progressObj.transferred + '/' + progressObj.total + ')';
    log.info(logMessage);
  });

  autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded');
    log.info(info);
    autoUpdater.quitAndInstall();
  });
}

app.whenReady().then(() => {
  createWindow();

  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'http://localhost' // This should be your actual server URL
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
