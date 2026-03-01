import { DataTypes, literal } from "sequelize";
import { sequelize } from "../../../database/connection";

const entity_tipo_vela = sequelize.define("tb_tipo_vela", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    tdv_tdv_cod: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    tdv_tdv_des: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    tdv_tdv_sbl: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: false
    },
    tdv_tdv_col: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: false
    },
    tdv_tdv_prd: {
        type: DataTypes.STRING(2),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'tb_tipo_vela',
    timestamps: true
})

export {
    entity_tipo_vela
}
