module.exports = function(sequelize, DataTypes) {
	const personas = sequelize.define('personas', {
		id_persona: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		persona_primer_nombre: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		persona_segundo_nombre: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		persona_primer_apellido: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		persona_segundo_apellido: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		persona_fecha_nacimiento: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		persona_dpi: {
			type: DataTypes.STRING(13),
			allowNull: false
		},
		persona_trabaja: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		persona_casado: {
			type: DataTypes.CHAR(1),
			allowNull: false
		},
		persona_empresa_trabaja: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		persona_ingresos: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		persona_email: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		persona_direccion_residencia: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		persona_telefono: {
			type: DataTypes.STRING(8),
			allowNull: true
		}
	},
	{
		tableName: 'tb_personas',
        freezeTableName: true,
        timestamps: false
	});
	return personas;
};
