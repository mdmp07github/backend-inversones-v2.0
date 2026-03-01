import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_provincia = sequelize.define("tb_provincias", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    pvc_pvc_des: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    pvc_dpt_cod: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'tb_provincias',
    timestamps: true
})

export {
    entity_provincia
}