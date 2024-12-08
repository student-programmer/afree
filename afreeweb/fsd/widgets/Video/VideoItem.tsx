'use';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import v from './Video.module.scss';
import { IconHeart } from './ui/IconHeart';
import { IconComment } from './ui/IconComment';
import { IconShare } from './ui/IconShare';

interface VideoItemProps {
	videoUrl: string;
	username: string;
	avatar: string;
	description: string;
	preview: string;
	videoRef: (el: HTMLVideoElement) => void; // Обновлено для использования функции
	userInteracted: boolean;
	like: number;
	comment: number;
}

const VideoItem: React.FC<VideoItemProps> = ({
	videoUrl,
	username,
	avatar,
	description,
	preview,
	videoRef,
	like,
	comment,
	userInteracted,
}) => {

	 const handleUserInteraction = (video: HTMLVideoElement) => {
			video.play().catch(err => console.error('Video play error:', err));
		};
	return (
		<div className={v.item_wrapper}>
			{/* <video
				src={videoUrl}
				controlsList='nodownload nofullscreen noremoteplayback'
				className={v.video}
				loop
				playsInline
				preload='auto'
				autoPlay
				muted={true}
				controls={false}
				poster={preview}
			/> */}
			<video
				src={videoUrl}
				className={v.video}
				loop
				playsInline
				muted={true}
				poster={preview}
				controls={false}
				preload='auto'
				// Передаем ссылку и добавляем обработчик клика
				ref={videoRef}
				onClick={e => handleUserInteraction(e.currentTarget)}
			/>
			<div className={v.description_block}>
				<Image
					src={avatar ? avatar : ''}
					alt={username}
					width={40}
					height={40}
					className={v.avatar}
				/>
				<p>{username}</p>
			</div>
			<p className={v.message_text}>{description}</p>
			<div className={v.metrics}>
				<span>
					<IconHeart />
					<p>{like}</p>
				</span>
				<span>
					<IconComment />
					<p>{comment}</p>
				</span>
				<span>
					<IconShare />
				</span>
			</div>
		</div>
	);
};

export default VideoItem;
