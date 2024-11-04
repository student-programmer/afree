import axios from 'axios';
import 'dotenv/config';

export const $afreeApi = axios.create({
	baseURL: "https://api.afree.ltd", // используйте NEXT_PUBLIC_ для переменных окружения, доступных на клиенте
	headers: {
		Accept: '*/*',
	},
});
