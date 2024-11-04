/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		APP_BASE_URL: process.env.APP_BASE_URL,
	},
	images: {
		domains: ['tgminiapp.afree.ltd'],
	},
};

module.exports = nextConfig;
