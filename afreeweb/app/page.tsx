'use client';
import { useInitData, useMiniApp } from '@tma.js/sdk-react';

import MainPage from '../fsd/pages/MainPage';
import LoadingPage from '../fsd/pages/Loading';
import { useEffect } from 'react';

export default function Home() {
	const initData = useInitData(true);
	// const miniApp = useMiniApp(false);

	// useEffect(() => {
	// 	miniApp.ready();
	// }, []);

	return (
		<>
			{initData?.user?.id !== undefined ? (
				<MainPage id={initData?.user?.id} />
			) : (
				<LoadingPage />
			)}
		</>
	);
}
