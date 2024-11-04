export interface User {
	id: number;
	avatar: string;
	username: string;
	name: string;
	is_following: boolean;
	verified: boolean;
}

export interface Profile extends User {
	idt_user: number;
	idt_admin: number;
	email: string;
	is_email_verified: boolean;
	phone: string;
	show_phone: boolean;
	first_name: string;
	middle_name: string;
	last_name: string;
	site: string;
	status: string;
	idc_sex: number;
	birthday_date: string;
	location_name: string;
	count_followers: number;
	count_following: number;
	is_follower: boolean;
	is_eula_confirmed: boolean;
	round_count: number;
	blacklisted: boolean;
	blacklisted_by: boolean;
	a_time: number;
	a_time_format: string;
	roles: {
		admin: boolean;
		arp_owner: any[];
		arp_admin: any[];
	};
	sessions: any[] | null;
	is_influencer: boolean;
	is_producer: boolean;
	is_evangelist: boolean;
	pinned_by_admin: boolean;
	pinned_at: number;
}

export interface Media {
	url: string;
	size: number;
	width: number;
	height: number;
	duration: number;
}

export interface Likes {
	likes_count: number;
	dislikes_count: number;
	is_liked: boolean;
	is_disliked: boolean;
}

export interface Sound {
	id: number;
	url: string;
	name: string;
	size: number;
	duration: number;
	type: string;
	author: User;
}

export interface Video {
	idt_round: number;
	from: User;
	profile: Profile;
	url_preview: string;
	url_preview_1080: string;
	url_preview_200: string;
	media: Media;
	message: string;
	is_location_hidden: boolean;
	lat: number;
	lng: number;
	place_name: string;
	place_address: string;
	visible_in_explore: boolean;
	height: number;
	ref_plane_height: number;
	idc_round_type: number;
	likes: Likes;
	comments_count: number;
	in_favourite: boolean;
	a_time: number;
	a_time_format: string;
	promoted: boolean;
	promoted_at: string;
	view_count: number;
	sound: Sound;
}

