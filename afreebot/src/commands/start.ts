import { Context } from 'telegraf';
import { MenuController } from '../modules/menuController';
import { UserBase, sequelize } from '../db/db';
import { UserRole } from '../models/User';
import { MessagesService } from '../services/messagesService';

export async function startCommand(ctx: Context): Promise<void> {
	function isBotOwner(userId: number | undefined): boolean {
		// Здесь вы можете сравнить userId с ID владельца вашего бота
		const ownerUserId = 1053404914; // Замените этот ID на фактический ID владельца
		return userId === ownerUserId;
	}
	try {
		await sequelize.authenticate(); // Проверка подключения к базе данных
		await UserBase.sync(); // Создание таблицы, если её нет
		console.log('User table has been created or already exists.');

		const keyboard = {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Переход на сайт ',
							web_app: { url: process.env.WEB_APP || '' },
						},
					],
				],
				resize_keyboard: true,
				one_time_keyboard: true,
			},
		};
		ctx.reply('/', keyboard);

		// Проверка, существует ли пользователь в базе данных
		const [userInstance, created] = await UserBase.findOrCreate({
			where: { id: ctx.from?.id },
			defaults: {
				id: ctx.from?.id || 0,
				username: ctx.from?.username || '',
				phone: '',
				role: isBotOwner(ctx.from?.id) ? UserRole.OWNER : UserRole.CLIENT,
				language: ctx.from?.language_code || 'en',
				message_id: ctx.callbackQuery?.message?.message_id || 0,
				last_obj: '',
				chat_id: ctx.chat?.id,
			},
		});
		if (userInstance instanceof UserBase) {
			// userInstance теперь имеет тип User
			if (created) {
				MenuController.showLanguageMenu(ctx);
				console.log('New user created:', userInstance);
			} else {
				MenuController.showLanguageMenu(ctx);
				console.log('User already exists:', userInstance);
			}

			console.log('Привет! Вы успешно зарегистрированы.');
		} else {
			console.error('Ошибка: userInstance не является экземпляром User.');
			ctx.reply('Произошла ошибка. Пожалуйста, попробуйте снова позже.');
		}
		console.log('Бот запущен');
	} catch (e) {
		console.error('Произошла ошибка при запуске бота', e);
	}
}
