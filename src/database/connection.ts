import { Sequelize } from "sequelize";
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
        port: parseInt(process.env.POSTGRES_PORT),
        dialectOptions: {
            ssl: (String(process.env.POSTGRES_SSL).toLowerCase() === 'true')
        }
    }
)

export {
    sequelize
}