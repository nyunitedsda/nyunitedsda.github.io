import { getDatabaseItem, getDatabaseList } from "./commonQueries";
import type { Article } from "./types";

const getArticles = async (): Promise<Article[]> => {
	return await getDatabaseList<Article>("articles");
};

const getArticleById = async (id: number): Promise<Article> => {
	return await getDatabaseItem<Article>("articles", id);
};

export { getArticles, getArticleById };
