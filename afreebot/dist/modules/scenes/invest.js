"use strict";
// import { Telegraf, Context, Scenes } from 'telegraf';
// import { MessagesService } from '../../services/messagesService';
// import fs from 'fs';
// import fetch from 'node-fetch';
// import { MyWizardContext } from '../..';
// import { updateUrls } from '../../db/db';
// export function invest(bot: Telegraf<Scenes.WizardContext>) {
// 	bot.action('invest', async ctx => {
// 		await MessagesService.sendMessage(ctx, 'invest');
// 		await ctx.answerCbQuery();
// 	});
// 	bot.action('investscreen', async ctx => {
// 		await ctx.scene.enter('investHandler');
// 		await ctx.answerCbQuery();
// 	});
// }
// export const investHandler: Scenes.WizardScene<MyWizardContext> =
// 	new Scenes.WizardScene(
// 		'investHandler',
// 		async ctx => {
// 			await MessagesService.sendMessage(ctx, 'getpoint');
// 			return ctx.wizard.next();
// 		},
// 		async ctx => {
// 			if (ctx.message && 'text' in ctx.message && ctx.from) {
// 				const userUrls = ctx.message.text;
// 				await updateUrls(ctx.from.id, 'invest', userUrls, true);
// 				await MessagesService.sendMessage(ctx, 'thanks');
// 				await MessagesService.sendMessage(ctx, 'invest');
// 				return ctx.scene.leave();
// 			} else {
// 				console.error(
// 					'Ошибка: отсутствует текстовое сообщение или свойство from в контексте.'
// 				);
// 				return ctx.scene.leave();
// 			}
// 		}
// 	);
