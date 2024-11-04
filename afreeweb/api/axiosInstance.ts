import axios from 'axios';
import 'dotenv/config';

export const $afreeApi = axios.create({
	baseURL: process.env.APP_BASE_URL, // используйте NEXT_PUBLIC_ для переменных окружения, доступных на клиенте
	headers: {
		Accept: '*/*',
	},
});
