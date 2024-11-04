import { Context, MiddlewareFn, Scenes } from 'telegraf';
import { UserBase } from '../db/db';
import { MessagesService } from '../services/messagesService';

// Middleware для обработки callback'ов
const callbackQueryMiddleware: MiddlewareFn<Scenes.WizardContext> = async (
	ctx,
	next
) => {
	try {
		const languageCode =
			ctx.callbackQuery && 'data' in ctx.callbackQuery
				? ctx.callbackQuery.data.split('_')[1]
				: undefined;

		// Обновляем язык пользователя в базе данных
		if (languageCode && ctx.from?.id) {
			await UserBase.update(
				{ language: languageCode },
				{ where: { id: ctx.from.id } }
			);

			// Отправляем сообщение об успешном обновлении языка
			console.log(`Язык обновлен: ${languageCode}`);
			await ctx.answerCbQuery();
			// await ctx.scene.enter('emailHandler');
			await MessagesService.sendMessage(ctx, 'description');
		}
	} catch (error) {
		console.error('Error during callback handling:', error);
		console.log(
			"Произошла ошибка при обработке callback'а. Пожалуйста, попробуйте снова позже."
		);
	}

	// Вызываем следующий middleware
	return next();
};

export const menuSceneMiddleware = callbackQueryMiddleware;
