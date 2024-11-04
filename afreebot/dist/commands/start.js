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
exports.startCommand = void 0;
const menuController_1 = require("../modules/menuController");
const db_1 = require("../db/db");
const User_1 = require("../models/User");
function startCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        function isBotOwner(userId) {
            // Здесь вы можете сравнить userId с ID владельца вашего бота
            const ownerUserId = 1053404914; // Замените этот ID на фактический ID владельца
            return userId === ownerUserId;
        }
        try {
            yield db_1.sequelize.authenticate(); // Проверка подключения к базе данных
            yield db_1.UserBase.sync(); // Создание таблицы, если её нет
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
            const [userInstance, created] = yield db_1.UserBase.findOrCreate({
                where: { id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id },
                defaults: {
                    id: ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id) || 0,
                    username: ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.username) || '',
                    phone: '',
                    role: isBotOwner((_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id) ? User_1.UserRole.OWNER : User_1.UserRole.CLIENT,
                    language: ((_e = ctx.from) === null || _e === void 0 ? void 0 : _e.language_code) || 'en',
                    message_id: ((_g = (_f = ctx.callbackQuery) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.message_id) || 0,
                    last_obj: '',
                    chat_id: (_h = ctx.chat) === null || _h === void 0 ? void 0 : _h.id,
                },
            });
            if (userInstance instanceof db_1.UserBase) {
                // userInstance теперь имеет тип User
                if (created) {
                    menuController_1.MenuController.showLanguageMenu(ctx);
                    console.log('New user created:', userInstance);
                }
                else {
                    menuController_1.MenuController.showLanguageMenu(ctx);
                    console.log('User already exists:', userInstance);
                }
                console.log('Привет! Вы успешно зарегистрированы.');
            }
            else {
                console.error('Ошибка: userInstance не является экземпляром User.');
                ctx.reply('Произошла ошибка. Пожалуйста, попробуйте снова позже.');
            }
            console.log('Бот запущен');
        }
        catch (e) {
            console.error('Произошла ошибка при запуске бота', e);
        }
    });
}
exports.startCommand = startCommand;
