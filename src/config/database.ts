import { Sequelize } from 'sequelize-typescript';
import "dotenv/config";
import User from '../models/user.model';

export const sequelize = new Sequelize({
	database: process.env.DB_NAME!,
	dialect: 'mysql',
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	dialectOptions: {
		charset: 'utf8mb4',
	},
	define: {
		charset: 'utf8mb4',
		collate: 'utf8mb4_unicode_ci',
	},
	models: [
		//path.resolve(__dirname, '/models')
		User,
	],
	logging: false,
});
