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

export interface Oauth2Response {
	cookie: string;
	expire: string;
}

export interface ApiUploadCredentials {
	endpoint: string;
	authorization: string;
}

export interface ContentCreateItem {
	name: string;

	tags: Tag[];
	type: Type;

	useCases: string[];
	preview?: string;
	downloads: Omit<Download, "contentId" | "id">[];
}

export interface FaqItem {
	question: string;
	answer: string;
}

export const SearchTypes = ["music", "video", "image", "all"] as const;
export const CONTENT_TYPES = ["music", "video", "image"] as const;

export const LanguageExceptionFlags: Record<string, string> = {
	en: "https://flagcdn.com/gb.svg"
};

export const FaqQuery: Record<string, any> = { license_url: "/license", privacy_policy_url: "/privacy" };
