const {app, BrowserWindow, Menu}  = require('electron');

exports.generateDate = () => { return new Date()};

exports.formatDate = () => {
  let current_datetime = new Date();
  return (current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds());
};

let window;
exports.createWindow = () => {
  window  = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
}