const db = require('../models');
const moment = require('moment');

const solicitudes = db.solicitudes;
const personas = db.personas;

exports.getAll = async (req, res) =>  {
  solicitudes.findAll({
    order: [
      ['id_credito', 'DESC'],
  ],
  })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

exports.getById = async (req, res) =>  {
  solicitudes.findByPk(req.query.id)
  .then(result => res.send(result))
  .catch(error => res.send(error));
};

exports.deleteById = async (req, res) =>  {
  solicitudes.destroy({
      where: {
        id_credito: req.query.id
      }
    })
    .then(result => res.status(202).send(result))
    .catch(error => res.status(500).send(error));
};

exports.update = async (req, res) =>  {
  const personaa = await personas.findAll({where: {    
    persona_dpi: req.body.id_persona
  }});
  
  persona__= personaa[0].id_persona;

  solicitudes.update({
      credito_cuotas: req.body.credito_cuotas,
      credito_monto: req.body.credito_monto,
      credito_observaciones: req.body.credito_observaciones,
      id_persona: persona__
    }, {
      where: {
        id_credito: req.body.id_credito
      }
    })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

let persona__ = 0;
exports.create = async (req, res) =>  {

  const personaa = await personas.findAll({where: {    
    persona_dpi: req.body.dpi
  }});
  
  persona__= personaa[0].id_persona;
  
  const body = {
    id_credito: 0,
    id_persona: persona__,
    credito_observaciones: req.body.observaciones,
    credito_monto: req.body.monto,
    credito_fecha_inicio: moment().format('L'),
    credito_cuotas: req.body.cuotas
  }
  console.log(body);
  solicitudes.create(body)
  .then(result => res.send(result))
  .catch(error => res.send(error));
};