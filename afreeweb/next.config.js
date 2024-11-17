/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		APP_BASE_URL: 'https://api.afree.ltd',
	},
	images: {
		domains: ['api.afree.ltd'],
	},
};

module.exports = nextConfig;
