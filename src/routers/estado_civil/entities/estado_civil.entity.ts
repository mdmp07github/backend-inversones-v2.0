import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_estado_civil = sequelize.define("tb_estado_civil", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    esc_esc_des: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'tb_estado_civil',
    timestamps: true
})

export {
    entity_estado_civil
}