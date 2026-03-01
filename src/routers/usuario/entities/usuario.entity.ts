import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_usuario = sequelize.define("tb_usuario", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    usu_usu_urn: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false
    },
    usu_usu_ura: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false
    },
    usu_usu_eml: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    usu_usu_pwd: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    usu_usu_tdd: {
        type: DataTypes.STRING(1),
        defaultValue: ""
    },
    usu_usu_ndd: {
        type: DataTypes.STRING(15),
        unique: false,
        defaultValue: ""
    },
    usu_usu_sex: {
        type: DataTypes.STRING(1),
        defaultValue: "0"
    },
    usu_usu_tel: {
        type: DataTypes.STRING(12),
        defaultValue: ""
    },
    usu_usu_fnc: {
        type: DataTypes.STRING(10),
        defaultValue: ""
    },
    usu_cod_esc: {
        type: DataTypes.STRING,
        defaultValue: "0"
    },
    usu_cod_dpt: {
        type: DataTypes.STRING,
        defaultValue: "0"
    },
    usu_cod_pvc: {
        type: DataTypes.STRING,
        defaultValue: "0"
    },
    usu_cod_dis: {
        type: DataTypes.STRING,
        defaultValue: "0"
    },
    usu_usu_dir: {
        type: DataTypes.STRING(150),
        defaultValue: ""
    },
    usu_usu_aut: {
        type: DataTypes.STRING(1),
        defaultValue: "S"
    },
    usu_usu_act: {
        type: DataTypes.STRING(1),
        defaultValue: "S"
    },
    usu_usu_cof: {
        type: DataTypes.STRING(1),
        defaultValue: "S"
    },
    usu_usu_tdu: {
        type: DataTypes.STRING(1),
        defaultValue: "V"
    },
    usu_usu_cod: {
        type: DataTypes.STRING(21),
        defaultValue: ""
    },
    usu_usu_pln: {
        type: DataTypes.STRING(1),
        defaultValue: "F"
    }
}, {
    tableName: 'tb_usuario',
    timestamps: true
})

export {
    entity_usuario
}