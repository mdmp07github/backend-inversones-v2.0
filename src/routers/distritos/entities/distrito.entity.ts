import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_distrito = sequelize.define("tb_distritos", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    dis_dis_des: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false
    },
    dis_pvc_cod: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'tb_distritos',
    timestamps: true
})

export {
    entity_distrito
}