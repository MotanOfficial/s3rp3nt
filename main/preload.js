const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel, callback) => {
      ipcRenderer.on(channel, (event, ...args) => callback(event, ...args));
    },
    invoke: (channel, data) => {
      return ipcRenderer.invoke(channel, data);
    }
  },
});
