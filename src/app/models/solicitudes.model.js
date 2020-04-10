module.exports = function (sequelize, DataTypes) {
  const solicitudes = sequelize.define(
    "solicitudes",
    {
      id_credito: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      id_persona: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: "tb_personas",
          key: "id_persona",
        },
      },
      credito_observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      credito_monto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      credito_fecha_inicio: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      credito_cuotas: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      tableName: "tb_solicitudes",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return solicitudes;
};
