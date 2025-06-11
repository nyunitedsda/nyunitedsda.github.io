export interface BlogType {
	id: number;
	title: string;
	author: string;
	publishDate: string;
	views?: number;
	comments?: number;
	rating?: number;
	category?: string;
	tags?: string[];
	featuredImage?: string;
	content: string;
}
