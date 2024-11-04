import 'dotenv/config';
import { Scenes, Telegraf, session } from 'telegraf';
import { startCommand } from './commands/start';
import { menuSceneMiddleware } from './modules/menuScenes';
import express from 'express';
import cors from 'cors';
import { events } from './modules/scenes/events';
export type MyWizardContext = Scenes.WizardContext<Scenes.WizardSessionData>;

const bot = new Telegraf<Scenes.WizardContext>(process.env.BOT_TOKEN as string);
const app = express();
app.use(express.json());
app.use(cors());
bot.start(startCommand);
const stage = new Scenes.Stage<MyWizardContext>([
	
]);
bot.use(session());
bot.use(stage.middleware());
bot.use(menuSceneMiddleware);
events(bot)

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
