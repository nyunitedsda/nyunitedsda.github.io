import { getDatabaseItem, getDatabaseList } from "./commonQueries";
import type { Article } from "./types";

// FEATURE: Create a view to get the article with the User name

const getArticles = async (): Promise<Article[]> => {
	return await getDatabaseList<Article>("articles");
};

const getArticleById = async (id: number): Promise<Article> => {
	return await getDatabaseItem<Article>(id, "articles");
};

export { getArticles, getArticleById };
