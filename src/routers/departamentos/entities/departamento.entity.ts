import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_departamento = sequelize.define("tb_departamentos", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    dpt_dpt_des: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'tb_departamentos',
    timestamps: true
})

export {
    entity_departamento
}