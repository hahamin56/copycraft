const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('ignore-gpu-blocklist');

process.on('uncaughtException', e => { dialog.showErrorBox('MULTICRAFT: ошибка', String(e && e.stack || e)); });

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 720, minWidth: 800, minHeight: 500,
    title: 'MULTICRAFT', backgroundColor: '#000000', show: true,
    autoHideMenuBar: true,
    webPreferences: { backgroundThrottling: false }
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'index.html')).catch(e => dialog.showErrorBox('Не удалось загрузить игру', String(e)));
  win.webContents.on('console-message', (e, level, msg) => { if (level >= 2) console.log('[game]', msg); });
  win.webContents.on('render-process-gone', (e, d) => dialog.showErrorBox('Игра упала', JSON.stringify(d)));
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') win.setFullScreen(!win.isFullScreen());
  });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
