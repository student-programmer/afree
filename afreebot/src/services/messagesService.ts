// Импортируем необходимые модули
import * as fs from 'fs';
// import { CustomContext } from '../types/telegram';
import path from 'path';
import { UserBase } from '../db/db';
import { Context, Markup } from 'telegraf';

// Определяем тип для объекта сообщений

type Button = {
	text: string;
	callback: string;
	url?: string;
};

// Определяем тип для объекта контента сообщения
type Message = {
	text: string;
	photo?: string; // Путь к фотографии
	file?: string;
	buttons?: Button[][];
};



// Определяем тип для объекта сообщений
type Messages = { [key: string]: Message };

export class MessagesService {
	private static messages: { [lang: string]: Messages } = {};

	public static loadMessages(lang: string): Messages {
		if (!this.messages[lang]) {
			const filePath = path.join(__dirname, `../languages/${lang}.json`);
			const data = fs.readFileSync(filePath, 'utf-8');
			this.messages[lang] = JSON.parse(data);
		}

		return this.messages[lang];
	}

	public static async backMessage(ctx: Context) {
		try {
			const user = (await UserBase.findOne({
				where: {
					id: ctx.from?.id,
				},
			})) as {
				id: number;
				username: string;
				password: string;
				email: string;
				isAuth: boolean;
				points: number;
				role: string;
				language: string;
				message_id: number;
				last_obj: string;
				chat_id: number;
			} | null;
			if (user !== null && ctx.chat) {
				await ctx.telegram.copyMessage(
					ctx.chat?.id,
					ctx.chat?.id,
					user.message_id - 1
				);
			} else {
				console.log('error');
			}
		} catch (error) {
			console.log(error);
		}
	}
	public static async hiddenMessage(ctx: Context, key: string) {
		try {
			const user = (await UserBase.findOne({
				where: {
					id: ctx.from?.id,
				},
			})) as {
				id: number;
				username: string;
				password: string;
				email: string;
				isAuth: boolean;
				points: number;
				role: string;
				language: string;
				message_id: number;
				last_obj: string;
				chat_id: number;
			} | null;

			if (user && user.message_id && ctx.callbackQuery?.message) {
				await ctx.telegram.deleteMessage(
					ctx.chat?.id || 0,
					ctx.callbackQuery?.message?.message_id
				);
				console.log('Hidden message deleted successfully.');
				await UserBase.update(
					{ last_obj: key }, // Новое значение
					{
						where: {
							id: ctx.from?.id, // Условие для выбора записей
						},
					}
				);
			} else {
				console.log('User or message not found.');
			}
		} catch (error) {
			console.error('Error deleting last message:', error);
			ctx.reply(
				'An error occurred while deleting the last message. Please try again later.'
			);
		}
	}

	public static async deleteLastMessage(ctx: Context) {
		try {
			const user = (await UserBase.findOne({
				where: {
					id: ctx.from?.id,
				},
			})) as {
				id: number;
				username: string;
				password: string;
				email: string;
				isAuth: boolean;
				points: number;
				role: string;
				language: string;
				message_id: number;
				last_obj: string;
				chat_id: number;
			} | null;

			if (user && user.message_id && ctx.callbackQuery?.message) {
				await ctx.telegram.deleteMessage(
					ctx.chat?.id || 0,
					ctx.callbackQuery?.message?.message_id
				);
				console.log('Last message deleted successfully.');
				await UserBase.update(
					{ message_id: ctx.callbackQuery?.message?.message_id }, // Новое значение
					{
						where: {
							id: ctx.from?.id, // Условие для выбора записей
						},
					}
				);
			} else {
				console.log('User or message not found.');
			}
		} catch (error) {
			console.error('Error deleting last message:', error);
			ctx.reply(
				'An error occurred while deleting the last message. Please try again later.'
			);
		}
	}

	public static async sendMessage(
		ctx: Context,
		key: string
	) {
		try {
			const user = (await UserBase.findOne({
				where: {
					id: ctx.from?.id,
				},
			})) as {
				id: number;
				username: string;
				password: string;
				email: string;
				isAuth: boolean;
				points: number;
				role: string;
				language: string;
				message_id: number;
				last_obj: string;
				chat_id: number;
			} | null;

			if (user !== null) {
				const lang = user.language;
				const messages = this.loadMessages(lang);
				const message = messages[key];

				if (message) {
					// Определяем, есть ли у сообщения фотография
					const hasPhoto = message.photo !== '';
					const hasFile = message.file !== '';

					if (
						hasPhoto &&
						message.buttons &&
						message.buttons.length > 0 &&
						message.photo
					) {
						const photoPath = path.join(__dirname, message.photo);

						if (message.buttons && message.buttons.length > 0) {
							const rows: Button[][] = message.buttons;
							if (
								Array.isArray(rows) &&
								rows.every(row => Array.isArray(row))
							) {
								const sentMessage = await ctx.replyWithPhoto(
									{ source: fs.createReadStream(photoPath) || '' },
									{
										protect_content: true,
										caption: message.text,
										parse_mode: 'HTML',
										...Markup.inlineKeyboard(
											rows.map(row =>
												row.map(button => {
													if (button.url) {
														return Markup.button.url(button.text, button.url);
													} else {
														return Markup.button.callback(
															button.text,
															button.callback
														);
													}
												})
											)
										),
									}
								);
								if (sentMessage.message_id) {
									await UserBase.update(
										{ message_id: sentMessage.message_id },
										{
											where: {
												id: ctx.from?.id,
											},
										}
									);
								}
							} else {
								console.error('rows должен быть массивом массивов');
							}
						}
					} else if (hasPhoto && message.photo) {
						const photoPath = path.join(__dirname, message.photo);
						const sentMessage = await ctx.replyWithPhoto(
							{ source: fs.createReadStream(photoPath) || '' },
							{
								protect_content: true,
								caption: message.text,
								parse_mode: 'HTML',
							}
						);
						if (sentMessage.message_id) {
							await UserBase.update(
								{ message_id: sentMessage.message_id },
								{
									where: {
										id: ctx.from?.id,
									},
								}
							);
						}
					} else if (hasFile && message.file) {
						const pdfFilePath = path.join(__dirname, message.file);

						const fileName = path.basename(pdfFilePath);

						// Отправляем файл
						const sentMessage = await ctx.replyWithDocument(
							{
								source: fs.createReadStream(pdfFilePath) || '',
								filename: fileName,
							},
							{
								protect_content: true,
								caption: message.text,
								parse_mode: 'HTML',
							}
						);
						if (sentMessage.message_id) {
							await UserBase.update(
								{ message_id: sentMessage.message_id },
								{
									where: {
										id: ctx.from?.id,
									},
								}
							);
						}
					} else {
						// Отправляем текст и кнопки, если они есть
						if (message.buttons && message.buttons.length > 0) {
							const rows: Button[][] = message.buttons;
							if (
								Array.isArray(rows) &&
								rows.every(row => Array.isArray(row))
							) {
								const sentMessage = await ctx.reply(message.text, {
									protect_content: true,
									parse_mode: 'HTML',
									...Markup.inlineKeyboard(
										rows.map(row =>
											row.map(button => {
												if (button.url) {
													return Markup.button.url(button.text, button.url);
												} else {
													return Markup.button.callback(
														button.text,
														button.callback
													);
												}
											})
										)
									),
								});

								if (sentMessage.message_id) {
									await UserBase.update(
										{ message_id: sentMessage.message_id },
										{
											where: {
												id: ctx.from?.id,
											},
										}
									);
								}
							} else {
								console.error('rows должен быть массивом массивов');
							}
						} else {
							// Отправляем только текст, если нет кнопок
							const sentMessage = await ctx.replyWithHTML(message.text, {
								protect_content: true,
							});
							await UserBase.update(
								{ message_id: ctx.callbackQuery?.message?.message_id },
								{
									where: {
										id: ctx.from?.id,
									},
								}
							);

							if (sentMessage.message_id) {
								await UserBase.update(
									{ message_id: sentMessage.message_id },
									{
										where: {
											id: ctx.from?.id,
										},
									}
								);
							}
						}
					}
				} else {
					console.error(`Key not found: ${key}`);
				}
			} else {
				console.error('User not found.');
			}
		} catch (error) {
			console.error('Error fetching user language:', error);
			console.log('An error occurred. Please try again later.');
		}
	}
}
