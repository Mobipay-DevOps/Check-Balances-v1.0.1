const electron = require('electron')
const { app, BrowserWindow, globalShortcut  } = require('electron')
const { Notification } = require('electron')
const isOnline = require('is-online');
const fs = require('fs');

function showNotification () {
    const notification = {
      title: 'Finance: Check Balances',
      body: 'Internet connection is required, Please connect'
    }
    isOnline().then(online => {
      if(online){
        console.log("We have internet");
      }else{
        new Notification(notification).show()
        console.log("No internet connection");
    }
  });
  
  }

function createWindow () {

    const win = new BrowserWindow({
      width: 1000,
      height: 800,
      icon: __dirname + '/icon.ico', // sets window icon
      webPreferences: {
        nodeIntegration: true,
       // devTools: false
      }
    })
  
    win.loadFile('src/index.html')
  }

  app.whenReady().then(() => {
    showNotification ()
  
  })

  app.on('ready', () => {
     createWindow()
     })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
    // globalShortcut.register('Control+Shift+I', () => {
    //   //this will get call for Control+Shift+I.
    //    return false;
      
    //   })
  })