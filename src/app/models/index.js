
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);

var db = {};
const BDURL = "mysql://udnkeatbbximwzpz:AbAL1UNWW0EmT4OTDL4U@b31blivabt5mtyur2m1p-mysql.services.clever-cloud.com:3306/b31blivabt5mtyur2m1p";

const sequelize = new Sequelize(BDURL);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  console.log(modelName);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
