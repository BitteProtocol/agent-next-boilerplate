import { RedditPost, RedditPostParams } from '@/types/tools';
import { createToolResponse, createErrorResponse } from '@/utils/tools';

interface RedditChild {
	data: {
		title: string;
		author: string;
		subreddit: string;
		score: number;
		num_comments: number;
		permalink: string;
	};
}

interface RedditResponse {
	data: {
		children: RedditChild[];
	};
}

export async function GET() {
	try {
		const response = await fetch('https://www.reddit.com/.json');
		if (!response.ok) {
			throw new Error('Failed to fetch Reddit frontpage');
		}
		const data: RedditResponse = await response.json();

		// Extract relevant information from the Reddit response
		const posts: RedditPost[] = data.data.children.map((child: RedditChild) => ({
			title: child.data.title,
			author: child.data.author,
			subreddit: child.data.subreddit,
			score: child.data.score,
			num_comments: child.data.num_comments,
			url: `https://www.reddit.com${child.data.permalink}`,
		}));

		return createToolResponse<{ posts: RedditPost[] }>({ posts });
	} catch (error) {
		console.error('Error fetching Reddit frontpage:', error);
		return createErrorResponse('Failed to fetch Reddit frontpage', 500);
	}
}

export const POST = async (request: Request) => {
	try {
		const body: RedditPostParams = await request.json();
		const { subreddit, query } = body;

		if (!subreddit || !query) {
			return createErrorResponse('subreddit and query are required parameters', 400);
		}

		const response = await fetch(`https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&limit=10`);

		if (!response.ok) {
			throw new Error('Failed to fetch Reddit search results');
		}

		const data: RedditResponse = await response.json();
		const posts: RedditPost[] = data.data.children.map((child: RedditChild) => ({
			title: child.data.title,
			author: child.data.author,
			subreddit: child.data.subreddit,
			score: child.data.score,
			num_comments: child.data.num_comments,
			url: `https://www.reddit.com${child.data.permalink}`,
		}));

		return createToolResponse<{ posts: RedditPost[] }>({ posts });
	} catch (error) {
		console.error('Error searching Reddit:', error);
		return createErrorResponse('Failed to search Reddit', 500);
	}
};
