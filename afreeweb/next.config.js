/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		APP_BASE_URL: 'https://api.afree.ltd',
	},
	images: {
		domains: ['tgminiapp.afree.ltd'],
	},
};

module.exports = nextConfig;
