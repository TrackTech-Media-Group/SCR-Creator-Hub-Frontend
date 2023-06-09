export interface User {
	bookmarks: Content[];
	recent: Content[];

	createdAt: Date;
	userId: string;
	username: string;
}

export interface Content {
	id: string;
	name: string;
	preview: string;

	tags: Tag[];
	type: Type;

	useCases: string[];
	downloads: Download[];
}

export interface Download {
	url: string;
	name: string;
	id: string;
	contentId: string;
}

export interface Tag {
	id: string;
	name: string;
}

export enum Type {
	Image = "image",
	Video = "video",
	Music = "music"
}

export interface CsrfToken {
	state: string;
	token: string;
}

export interface Oauth2Data {
	cookie: string;
	url: string;
}

export const SearchTypes = ["music", "video", "image", "all"] as const;
