export type DatabaseEntity = "donations" | "users" | "articles";

/**
 * Represents an donation payment method in the system
 */
export interface Donations {
	id: number;
	title: string;
	description: string;
}



/**
 * Represents an article in the system
 */
export type Article = {
  /** Unique identifier (auto-incremented) */
  id: number;
  /** Article title */
  title: string;
  /** ID of the author who wrote the article */
  author_id: number;
  /** Date when the article was published */
  publishDate: Date | string;
  /** Number of views the article has received */
  views?: number;
  /** Number of comments on the article */
  comments?: number;
  /** Rating of the article (out of 5.00) */
  rating?: number | null;
  /** Article category */
  category?: string | null;
  /** Path or URL to the article's image */
  img_src?: string | null;
  /** Full HTML/text content of the article */
  content: string;
  /** Timestamp when the article was created */
  created_at?: Date;
  /** Timestamp when the article was last modified */
  modified_at?: Date;
};

