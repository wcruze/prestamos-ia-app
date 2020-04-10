var express = require("express");
var app = express.Router();

const personas = require("../controllers/personas.controllers");
const solicitudes = require("../controllers/solicitudes.controller");

app.get("/persona",personas.getUser);
app.get("/personas",personas.getAll);
app.post("/persona",personas.create);
app.post("/solicitud", solicitudes.create);
app.get("/solicitudes",solicitudes.getAll);
module.exports = app;
