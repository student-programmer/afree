'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { fetchVideos } from '../../../api/api';
import VideoItem from './VideoItem';
import v from './Video.module.scss';
import { Video } from '@/types/types';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { IconHint } from './ui/IconHint';

const VideoList: React.FC = () => {
	const [userInteracted, setUserInteracted] = useState(false);
	const videoRefs = useRef<HTMLVideoElement[]>([]); // Создаем массив ссылок на видео
	const [videos, setVideos] = useState<Video[]>([]);
	const [offset, setOffset] = useState(0);
	const [hint, setHint] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setHint(!hint);
		}, 3000);
	}, []);

	const { data, error, isLoading } = useQuery<Video[]>(
		['videos', offset],
		() => fetchVideos({ limit: 10, offset }),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			retry: false,
		}
	);

	useEffect(() => {
		if (data) {
			setVideos(prevVideos => {
				const newVideos = data.filter(video => video.media.url);
				const existingVideoIds = new Set(
					prevVideos.map(video => video.idt_round)
				);
				const uniqueNewVideos = newVideos.filter(
					video => !existingVideoIds.has(video.idt_round)
				);
				// Если нет новых видео с media.url, загружаем следующую порцию
				if (uniqueNewVideos.length === 0) {
					loadMoreVideos();
				}
				return [...prevVideos, ...uniqueNewVideos];
			});
		}
	}, [data]);
	const loadMoreVideos = useCallback(() => {
		setOffset(prevOffset => prevOffset + 10);
		console.log(offset);
	}, []);

	if (isLoading && !videos.length) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;
	return (
		<>
			{hint && <IconHint className={v.hint} />}
			<Swiper
				direction='vertical'
				// onSlideChange={() => console.log('slide change')}
				onReachEnd={loadMoreVideos}
				style={{ height: '100vh' }}
			>
				{videos.map((video, index) => (
					<SwiperSlide key={index}>
						<div style={{ height: '100vh' }}>
							<VideoItem
								videoUrl={video.media.url}
								username={video.from.username}
								avatar={video.from.avatar}
								description={video.message}
								preview={video.url_preview}
								like={video.likes.likes_count}
								comment={video.comments_count}
								videoRef={(el: HTMLVideoElement) =>
									(videoRefs.current[index] = el)
								}
								userInteracted={userInteracted}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default VideoList;
