import 'dotenv/config';

import { DataTypes, Sequelize, Model } from 'sequelize';


const sequelize = new Sequelize(
	process.env.DB_NAME || 'custdev',
	process.env.DB_USER || 'postgres',
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'postgres',
	}
);

// Определение интерфейса для модели
interface UserAttributes {
	id: number;
	username: string;
	phone: string;
	role: string;
	language: string;
	message_id: number | null;
	last_obj: string | null;
	chat_id: number | null;
}

interface UserCreationAttributes extends UserAttributes {}

class UserBase
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public username!: string;
	public phone!: string;
	public role!: string;
	public language!: string;
	public message_id!: number | null;
	public last_obj!: string | null;
	public chat_id!: number | null;
}
UserBase.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		role: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'client',
		},
		language: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		message_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		last_obj: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		chat_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
);


export {
	sequelize,
	UserBase,

};

sequelize
	.sync()
	.then(() => {
		console.log('Model has been synchronized successfully.');
	})
	.catch(error => {
		console.error('Error synchronizing model:', error);
	});
