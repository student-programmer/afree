"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const telegraf_1 = require("telegraf");
const db_1 = require("../db/db");
class MenuController {
    static showLanguageMenu(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // await MessagesService.sendMessage(ctx, 'greeting');
            ctx.reply('Поделится вашим номером телефона, чтобы управлять учётной записью с помощью бота', telegraf_1.Markup.keyboard([
                telegraf_1.Markup.button.contactRequest('Поделиться номером телефона'), // Кнопка для отправки контакта
            ])
                .oneTime()
                .resize() // Клавиатура будет отображаться один раз и автоматически скрываться после нажатия
            );
        });
    }
    static setLanguage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!ctx.callbackQuery) {
                    throw new Error('CallbackQuery is not defined.');
                }
                const languageCode = ctx.callbackQuery && 'data' in ctx.callbackQuery
                    ? ctx.callbackQuery.data.split('_')[1]
                    : undefined;
                if (languageCode) {
                    // Обновляем язык пользователя в базе данных
                    yield db_1.UserBase.update({ language: languageCode }, { where: { id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id } });
                    // Обновляем язык в объекте контекста
                    if (ctx.from) {
                        ctx.from.language_code = languageCode;
                    }
                }
                else {
                    // Если data отсутствует в callbackQuery, обработка не может быть выполнена
                    throw new Error('Missing data property in callbackQuery.');
                }
            }
            catch (error) {
                console.error('Error during setLanguage:', error);
                console.log('Произошла ошибка при обновлении языка. Пожалуйста, попробуйте снова позже.');
            }
        });
    }
}
exports.MenuController = MenuController;
