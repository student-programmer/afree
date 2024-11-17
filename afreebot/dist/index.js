"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const telegraf_1 = require("telegraf");
const start_1 = require("./commands/start");
const menuScenes_1 = require("./modules/menuScenes");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const events_1 = require("./modules/scenes/events");
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
bot.start(start_1.startCommand);
const stage = new telegraf_1.Scenes.Stage([]);
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.use(menuScenes_1.menuSceneMiddleware);
(0, events_1.events)(bot);
// bot
// 	.launch({
// 		webhook: {
// 			domain: process.env.DOMAIN || '',
// 			port: parseInt(process.env.HOOKPORT || ''),
// 		},
// 	})
// 	.then(() =>
// 		console.log(
// 			'Webhook bot listening on port',
// 			parseInt(process.env.HOOKPORT || '')
// 		)
// 	);
bot
    .launch()
    .then(() => console.log('Bot is running...'))
    .catch(error => console.error('Error launching bot:', error));
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
