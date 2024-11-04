import { Context, Markup } from 'telegraf';
import { UserBase } from '../db/db';
import { MessagesService } from '../services/messagesService';

export class MenuController {
	static async showLanguageMenu(ctx: Context): Promise<void> {
		// await MessagesService.sendMessage(ctx, 'greeting');
		ctx.reply(
			'Поделится вашим номером телефона, чтобы управлять учётной записью с помощью бота',
			Markup.keyboard([
				Markup.button.contactRequest('Поделиться номером телефона'), // Кнопка для отправки контакта
			])
				.oneTime()
				.resize() // Клавиатура будет отображаться один раз и автоматически скрываться после нажатия
		);
	}

	static async setLanguage(ctx: Context): Promise<void> {
		try {
			if (!ctx.callbackQuery) {
				throw new Error('CallbackQuery is not defined.');
			}

			const languageCode =
				ctx.callbackQuery && 'data' in ctx.callbackQuery
					? ctx.callbackQuery.data.split('_')[1]
					: undefined;

			if (languageCode) {
				// Обновляем язык пользователя в базе данных
				await UserBase.update(
					{ language: languageCode },
					{ where: { id: ctx.from?.id } }
				);

				// Обновляем язык в объекте контекста
				if (ctx.from) {
					ctx.from.language_code = languageCode;
				}
			} else {
				// Если data отсутствует в callbackQuery, обработка не может быть выполнена
				throw new Error('Missing data property in callbackQuery.');
			}
		} catch (error) {
			console.error('Error during setLanguage:', error);
			console.log(
				'Произошла ошибка при обновлении языка. Пожалуйста, попробуйте снова позже.'
			);
		}
	}
}
