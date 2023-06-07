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
