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

exports.gebyId = async (req, res) =>  {
  personas.findByPk(req.query.id)
  .then(result => res.send(result))
  .catch(error => res.send(error));
};

exports.delete = async (req, res) =>  {
  personas.destroy({
      where: {
        id_persona: req.body.id
      }
    })
    .then(result => res.status(202).send("Eliminado"))
    .catch(error => res.status(500).send(error));
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