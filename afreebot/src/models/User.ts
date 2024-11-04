// Интерфейс, представляющий структуру пользователя
export interface User {
	id: number; // Уникальный идентификатор пользователя
	username: string; // Имя пользователя
	password: string; // Количество очков пользователя
	email: string;
	isAuth:boolean;
	points:number;
	//referrerId?: number; // Идентификатор пригласившего пользователя (необязательно)
	role: UserRole; // Роль пользователя (владелец, админ, модератор, клиент)
	language: string; // Язык, на котором взаимодействует пользователь с ботом
	message_id?: number;
	last_obj?: string;
	chat_id: number;
}

// Перечисление ролей пользователя
export enum UserRole {
	OWNER = 'owner',
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	CLIENT = 'client',
}
