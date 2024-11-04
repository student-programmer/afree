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
exports.menuSceneMiddleware = void 0;
const db_1 = require("../db/db");
const messagesService_1 = require("../services/messagesService");
// Middleware для обработки callback'ов
const callbackQueryMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const languageCode = ctx.callbackQuery && 'data' in ctx.callbackQuery
            ? ctx.callbackQuery.data.split('_')[1]
            : undefined;
        // Обновляем язык пользователя в базе данных
        if (languageCode && ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            yield db_1.UserBase.update({ language: languageCode }, { where: { id: ctx.from.id } });
            // Отправляем сообщение об успешном обновлении языка
            console.log(`Язык обновлен: ${languageCode}`);
            yield ctx.answerCbQuery();
            // await ctx.scene.enter('emailHandler');
            yield messagesService_1.MessagesService.sendMessage(ctx, 'description');
        }
    }
    catch (error) {
        console.error('Error during callback handling:', error);
        console.log("Произошла ошибка при обработке callback'а. Пожалуйста, попробуйте снова позже.");
    }
    // Вызываем следующий middleware
    return next();
});
exports.menuSceneMiddleware = callbackQueryMiddleware;
