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
exports.events = void 0;
const messagesService_1 = require("../../services/messagesService");
const db_1 = require("../../db/db");
function events(bot) {
    bot.on('contact', (ctx) => __awaiter(this, void 0, void 0, function* () {
        // const phoneNumber = ctx.message.contact.phone_number; // Получение номера телефона из сообщения
        // Ответ с номером телефона
        yield db_1.UserBase.update({ phone: ctx.message.contact.phone_number }, { where: { id: ctx.from.id } });
        yield messagesService_1.MessagesService.sendMessage(ctx, 'download');
    }));
}
exports.events = events;
