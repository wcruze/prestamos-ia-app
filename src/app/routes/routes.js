var express = require("express");
var app = express.Router();

const personas = require("../controllers/personas.controllers");
const solicitudes = require("../controllers/solicitudes.controller");

app.get("/persona",personas.getUser);
app.get("/personaid",personas.gebyId);
app.get("/personas",personas.getAll);
app.post("/persona",personas.create);

app.post("/solicitud", solicitudes.create);
app.put("/solicitud", solicitudes.update);
app.get("/solicitudes",solicitudes.getAll);
app.get("/solicitud", solicitudes.getById);
app.delete("/solicitud", solicitudes.deleteById);

module.exports = app;
