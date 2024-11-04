'use client';

import VideoList from '../widgets/Video/VideoList';

interface MainPageProps {
	id: number;
}
const MainPage: React.FC<MainPageProps> = ({ id }) => {
	return (
		<div style={{ height: '100vh', overflow: 'hidden' }}>
			<VideoList />
		</div>
	);
};

export default MainPage;
