"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
// Импортируем необходимые модули
const fs = __importStar(require("fs"));
// import { CustomContext } from '../types/telegram';
const path_1 = __importDefault(require("path"));
const db_1 = require("../db/db");
const telegraf_1 = require("telegraf");
class MessagesService {
    static loadMessages(lang) {
        if (!this.messages[lang]) {
            const filePath = path_1.default.join(__dirname, `../languages/${lang}.json`);
            const data = fs.readFileSync(filePath, 'utf-8');
            this.messages[lang] = JSON.parse(data);
        }
        return this.messages[lang];
    }
    static backMessage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const user = (yield db_1.UserBase.findOne({
                    where: {
                        id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
                    },
                }));
                if (user !== null && ctx.chat) {
                    yield ctx.telegram.copyMessage((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id, (_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id, user.message_id - 1);
                }
                else {
                    console.log('error');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static hiddenMessage(ctx, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                const user = (yield db_1.UserBase.findOne({
                    where: {
                        id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
                    },
                }));
                if (user && user.message_id && ((_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.message)) {
                    yield ctx.telegram.deleteMessage(((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id) || 0, (_e = (_d = ctx.callbackQuery) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.message_id);
                    console.log('Hidden message deleted successfully.');
                    yield db_1.UserBase.update({ last_obj: key }, // Новое значение
                    {
                        where: {
                            id: (_f = ctx.from) === null || _f === void 0 ? void 0 : _f.id, // Условие для выбора записей
                        },
                    });
                }
                else {
                    console.log('User or message not found.');
                }
            }
            catch (error) {
                console.error('Error deleting last message:', error);
                ctx.reply('An error occurred while deleting the last message. Please try again later.');
            }
        });
    }
    static deleteLastMessage(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                const user = (yield db_1.UserBase.findOne({
                    where: {
                        id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
                    },
                }));
                if (user && user.message_id && ((_b = ctx.callbackQuery) === null || _b === void 0 ? void 0 : _b.message)) {
                    yield ctx.telegram.deleteMessage(((_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id) || 0, (_e = (_d = ctx.callbackQuery) === null || _d === void 0 ? void 0 : _d.message) === null || _e === void 0 ? void 0 : _e.message_id);
                    console.log('Last message deleted successfully.');
                    yield db_1.UserBase.update({ message_id: (_g = (_f = ctx.callbackQuery) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.message_id }, // Новое значение
                    {
                        where: {
                            id: (_h = ctx.from) === null || _h === void 0 ? void 0 : _h.id, // Условие для выбора записей
                        },
                    });
                }
                else {
                    console.log('User or message not found.');
                }
            }
            catch (error) {
                console.error('Error deleting last message:', error);
                ctx.reply('An error occurred while deleting the last message. Please try again later.');
            }
        });
    }
    static sendMessage(ctx, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            try {
                const user = (yield db_1.UserBase.findOne({
                    where: {
                        id: (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id,
                    },
                }));
                if (user !== null) {
                    const lang = user.language;
                    const messages = this.loadMessages(lang);
                    const message = messages[key];
                    if (message) {
                        // Определяем, есть ли у сообщения фотография
                        const hasPhoto = message.photo !== '';
                        const hasFile = message.file !== '';
                        if (hasPhoto &&
                            message.buttons &&
                            message.buttons.length > 0 &&
                            message.photo) {
                            const photoPath = path_1.default.join(__dirname, message.photo);
                            if (message.buttons && message.buttons.length > 0) {
                                const rows = message.buttons;
                                if (Array.isArray(rows) &&
                                    rows.every(row => Array.isArray(row))) {
                                    const sentMessage = yield ctx.replyWithPhoto({ source: fs.createReadStream(photoPath) || '' }, Object.assign({ protect_content: true, caption: message.text, parse_mode: 'HTML' }, telegraf_1.Markup.inlineKeyboard(rows.map(row => row.map(button => {
                                        if (button.url) {
                                            return telegraf_1.Markup.button.url(button.text, button.url);
                                        }
                                        else {
                                            return telegraf_1.Markup.button.callback(button.text, button.callback);
                                        }
                                    })))));
                                    if (sentMessage.message_id) {
                                        yield db_1.UserBase.update({ message_id: sentMessage.message_id }, {
                                            where: {
                                                id: (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id,
                                            },
                                        });
                                    }
                                }
                                else {
                                    console.error('rows должен быть массивом массивов');
                                }
                            }
                        }
                        else if (hasPhoto && message.photo) {
                            const photoPath = path_1.default.join(__dirname, message.photo);
                            const sentMessage = yield ctx.replyWithPhoto({ source: fs.createReadStream(photoPath) || '' }, {
                                protect_content: true,
                                caption: message.text,
                                parse_mode: 'HTML',
                            });
                            if (sentMessage.message_id) {
                                yield db_1.UserBase.update({ message_id: sentMessage.message_id }, {
                                    where: {
                                        id: (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id,
                                    },
                                });
                            }
                        }
                        else if (hasFile && message.file) {
                            const pdfFilePath = path_1.default.join(__dirname, message.file);
                            const fileName = path_1.default.basename(pdfFilePath);
                            // Отправляем файл
                            const sentMessage = yield ctx.replyWithDocument({
                                source: fs.createReadStream(pdfFilePath) || '',
                                filename: fileName,
                            }, {
                                protect_content: true,
                                caption: message.text,
                                parse_mode: 'HTML',
                            });
                            if (sentMessage.message_id) {
                                yield db_1.UserBase.update({ message_id: sentMessage.message_id }, {
                                    where: {
                                        id: (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.id,
                                    },
                                });
                            }
                        }
                        else {
                            // Отправляем текст и кнопки, если они есть
                            if (message.buttons && message.buttons.length > 0) {
                                const rows = message.buttons;
                                if (Array.isArray(rows) &&
                                    rows.every(row => Array.isArray(row))) {
                                    const sentMessage = yield ctx.reply(message.text, Object.assign({ protect_content: true, parse_mode: 'HTML' }, telegraf_1.Markup.inlineKeyboard(rows.map(row => row.map(button => {
                                        if (button.url) {
                                            return telegraf_1.Markup.button.url(button.text, button.url);
                                        }
                                        else {
                                            return telegraf_1.Markup.button.callback(button.text, button.callback);
                                        }
                                    })))));
                                    if (sentMessage.message_id) {
                                        yield db_1.UserBase.update({ message_id: sentMessage.message_id }, {
                                            where: {
                                                id: (_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id,
                                            },
                                        });
                                    }
                                }
                                else {
                                    console.error('rows должен быть массивом массивов');
                                }
                            }
                            else {
                                // Отправляем только текст, если нет кнопок
                                const sentMessage = yield ctx.replyWithHTML(message.text, {
                                    protect_content: true,
                                });
                                yield db_1.UserBase.update({ message_id: (_g = (_f = ctx.callbackQuery) === null || _f === void 0 ? void 0 : _f.message) === null || _g === void 0 ? void 0 : _g.message_id }, {
                                    where: {
                                        id: (_h = ctx.from) === null || _h === void 0 ? void 0 : _h.id,
                                    },
                                });
                                if (sentMessage.message_id) {
                                    yield db_1.UserBase.update({ message_id: sentMessage.message_id }, {
                                        where: {
                                            id: (_j = ctx.from) === null || _j === void 0 ? void 0 : _j.id,
                                        },
                                    });
                                }
                            }
                        }
                    }
                    else {
                        console.error(`Key not found: ${key}`);
                    }
                }
                else {
                    console.error('User not found.');
                }
            }
            catch (error) {
                console.error('Error fetching user language:', error);
                console.log('An error occurred. Please try again later.');
            }
        });
    }
}
exports.MessagesService = MessagesService;
MessagesService.messages = {};
