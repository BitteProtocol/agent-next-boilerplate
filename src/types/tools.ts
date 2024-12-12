// Tool response types
export interface BlockchainResponse {
  blockchains: string[];
}

export interface RedditPost {
  title: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  url: string;
}

export interface TransactionPayload {
  receiverId: string;
  actions: {
    type: string;
    params: {
      deposit: string;
    };
  }[];
}

export interface TwitterResponse {
  twitterIntentUrl: string;
}

export interface CoinFlipResponse {
  result: 'heads' | 'tails';
}

// Tool request parameter types
export interface TransactionPostParams {
  blockchain: string;
  amount: string;
  recipient: string;
}

export interface RedditPostParams {
  subreddit: string;
  query: string;
}

export interface TwitterPostParams {
  query: string;
}

// Tool configuration types
export interface ToolParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'body';
  required: boolean;
  schema: {
    type: string;
    description?: string;
  };
  description?: string;
}

export interface ToolSchema {
  operationId: string;
  parameters?: ToolParameter[];
  responses?: {
    [key: string]: {
      description: string;
      content: {
        'application/json': {
          schema: {
            type: string;
            properties: Record<string, unknown>;
          };
        };
      };
    };
  };
}

export interface ToolConfig {
  name: string;
  description: string;
  endpoint: string;
  schema: ToolSchema;
}

export type ToolConfigs = Record<string, ToolConfig>;
