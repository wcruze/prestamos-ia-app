const db = require('../models');
const personas = db.personas;


exports.getAll = async (req, res) =>  {
  personas.findAll()
  .then(result => res.send(result))
  .catch(error => res.send(error));
};

exports.getUser = async (req, res) =>  {
  personas.findAll({where: {    
    persona_dpi: req.query.dpi
  }})
  .then(result => res.send(result))
  .catch(error => res.send(error));
};

exports.delete = async (req, res) =>  {
  personas.destroy({
      where: {
        id_persona: req.body.id
      }
    })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

exports.update = async (req, res) =>  {
  personas.update({
      persona_dpi: req.body.dpi
    }, {
      where: {
        id_persona: req.body.id
      }
    })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

exports.create = async (req, res) =>  {
  personas.create(req.body)
  .then(result => res.send(result))
  .catch(error => res.send(error));
}