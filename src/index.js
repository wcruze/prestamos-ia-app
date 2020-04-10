
const {app, BrowserWindow, Menu}  = require('electron');
const requestIp = require("request-ip");
const url  = require('url');
const path = require('path');
helmet = require("helmet");

require('electron-reload')(__dirname,{
    electron: path.join(__dirname, '../node_modules','.bin','electron')
});


// CONFIGURACION DE LA VENTANA DE WINDOWS
let mainWindow; 

app.on('ready', () => {
   mainWindow =  new BrowserWindow({
        width: 1000,
        height:680,
        webPreferences: {
                nodeIntegration: true
            }
   });
   mainWindow.loadURL(url.format({
       pathname: path.join(__dirname,'views/creditos.html'),
       protocol: 'file',
       slashes: true
   }))

   const mainMenu = Menu.buildFromTemplate(templateMenu);
   Menu.setApplicationMenu(mainMenu);
})


const templateMenu = [];

templateMenu.push({
    label: 'DevTools',
    submenu: [{
        label: 'Show/Hide Dev Tools',
        click(itm, focusedWindow){
            focusedWindow.toggleDevTools();
        }
    },{
        role: 'reload'
    }]
});


// INSTANCIA QUE SINCRONIZA MYSQL CON LA APP
const db = require("./app/models");
db.sequelize.sync();



// CONFIGURACION DE EXPRESS PARA EL CONTROL DE RUTAS URL INTERNAS
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes/routes")
const app_ = express();
const port = 3001;

app_.use(bodyParser.json({
    limit: "50mb"
  }));

app_.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  }));
    
app_.use(helmet());
app_.use(requestIp.mw());
app_.use(routes);
app_.listen(port,() => console.log(`escuchando en el puerto ${port}`));