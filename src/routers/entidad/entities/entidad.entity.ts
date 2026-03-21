import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_entidad = sequelize.define("tb_entidad", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ent_ent_cod: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false
    },
    ent_ent_nom: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: false,
        defaultValue: ""
    },
    ent_ent_des: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        unique: false,
        defaultValue: ""
    },
    ent_ent_tdv: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: false
    },
    ent_ent_pos: {
        type: DataTypes.STRING(1),
        allowNull: false,
        unique: false
    },
    ent_ent_fdr: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false
    },
    ent_ent_hdr: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: false
    },
    ent_ent_ano: {
        type: DataTypes.STRING(4),
        allowNull: false,
        unique: false
    },
    ent_ent_usu: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'tb_entidad',
    timestamps: true
})

export {
    entity_entidad
}
