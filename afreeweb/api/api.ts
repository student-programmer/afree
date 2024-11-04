// src/api/fetchVideos.ts
import { Video } from '@/types/types';
import { $afreeApi } from './axiosInstance';


interface FetchVideosParams {
    limit?: number;
    offset?: number;
}

export const fetchVideos = async (params: FetchVideosParams = {limit:10, offset:0}): Promise<Video[]> => {
	try {
		const response = await $afreeApi.get<Video[]>('/v2/round/explore', {params});

		// Фильтрация видео, у которых есть media.url
		const filteredVideos = response.data.filter(
			(video: Video) => video.media && video.media.url
		);

		return filteredVideos;
	} catch (error) {
		console.error('Error fetching videos:', error);
		throw error;
	}
};
