'use'
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
	// const [isIntersecting, setIsIntersecting] = useState(false);
	// const observerRef = useRef<IntersectionObserver | null>(null);
	
	// useEffect(() => {
	// 	const observerCallback = (entries: IntersectionObserverEntry[]) => {
	// 		const entry = entries[0];
	// 		setIsIntersecting(entry.isIntersecting);
	// 	};

	// 	if (localVideoRef.current) {
	// 		observerRef.current = new IntersectionObserver(observerCallback, {
	// 			threshold: 0.5,
	// 		});
	// 		observerRef.current.observe(localVideoRef.current);
	// 	}

	// 	return () => {
	// 		if (observerRef.current && localVideoRef.current) {
	// 			observerRef.current.unobserve(localVideoRef.current);
	// 		}
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (isIntersecting && localVideoRef.current) {
	// 		localVideoRef.current.play().catch(error => console.log(error));
	// 	} else if (!isIntersecting && localVideoRef.current) {
	// 		localVideoRef.current.pause();
	// 	}
	// }, [isIntersecting]);

	// useEffect(() => {
	// 	if (localVideoRef.current) {
	// 		videoRef(localVideoRef.current);
	// 	}
	// }, [videoRef]);

	return (
		<div className={v.item_wrapper}>
			<video
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
