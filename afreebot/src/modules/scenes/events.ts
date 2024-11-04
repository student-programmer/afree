import { Telegraf, Context, Scenes } from 'telegraf';
import { MessagesService } from '../../services/messagesService';
import { UserBase } from '../../db/db';

export function events(bot: Telegraf<Scenes.WizardContext>) {
	bot.on('contact', async ctx => {
		// const phoneNumber = ctx.message.contact.phone_number; // Получение номера телефона из сообщения
		// Ответ с номером телефона
		await UserBase.update(
			{ phone: ctx.message.contact.phone_number },
			{ where: { id: ctx.from.id } }
		);
		await MessagesService.sendMessage(ctx, 'download');
	});
}
