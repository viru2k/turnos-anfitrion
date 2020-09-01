
//const { app, BrowserWindow } = require('electron')
const electron = require('electron');
const app =  electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const url = require('url')

const fs = require("fs");
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;


let win
let winpopup = null;
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenuBarVisibility(false);

  // and load the index.html of the app.
  win.loadFile('dist/turnos-anfitrion/index.html') // DEBE SER CAMBIANDO POR DIST/LAUBICACIONDEMIARCHIVO
  //win.loadURL(`file://${__dirname}/dist/index.html`)
  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {

    win = null
  })

  fullscreen()
}

function fullscreen() {
  if (win.isFullScreen()) {
    win.setFullScreen(false);
} else {
  win.setFullScreen(true);
}
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})



 ipc.on('print-to-pdf',function(event, data){
  console.log('ingreso a imprimiendo');

  win.webContents.printToPDF(pdfSettings()).then(data => {
    const pdfPath = path.join(os.tmpdir(),'./generated_pdf.pdf' );

    win.webContents.print({silent: true}, (success, errorType) => {
      if (!success){
        console.log(errorType)
      } else{
        console.log('print success');
        event.sender.send('wrote-pdf', false);
      } 
    })

    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  }) 
/* 
  win.webContents.printToPDF(pdfSettings(), function(error, data){
    console.log('metodo imprimir');
    if(error){
      console.log('error');
      return console.log(error.message);
   }
   const pdfPath = path.join(os.tmpdir(),'./generated_pdf.pdf' );
    win.webContents.print({silent: false},function (success) {
      console.log('imprimiendo');
      if (success) {
        console.log('print success');
        event.sender.send('wrote-pdf', false);
      } else {
        console.log('error al imprimir');
      }
    });
}) */
});



function pdfSettings() {
  var option = {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      
  };
return option;
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

