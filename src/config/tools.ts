import { ToolConfig } from '../types/tools';

export const toolConfigs: Record<string, ToolConfig> = {
  getBlockchains: {
    name: 'Get Blockchain Information',
    description: 'Respond with a list of blockchains',
    endpoint: '/api/tools/get-blockchains',
    schema: {
      operationId: 'get-blockchains',
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'The list of blockchains'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  getUser: {
    name: 'Get User Information',
    description: 'Respond with user account ID',
    endpoint: '/api/tools/get-user',
    schema: {
      operationId: 'get-user',
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accountId: {
                    type: 'string',
                    description: "The user's account ID"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  reddit: {
    name: 'Get Reddit Posts',
    description: 'Fetch and return a list of posts from the Reddit frontpage',
    endpoint: '/api/tools/reddit',
    schema: {
      operationId: 'get-reddit-posts',
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  posts: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        title: {
                          type: 'string',
                          description: 'The title of the post'
                        },
                        author: {
                          type: 'string',
                          description: 'The username of the post author'
                        },
                        subreddit: {
                          type: 'string',
                          description: 'The subreddit where the post was made'
                        },
                        score: {
                          type: 'number',
                          description: 'The score (upvotes) of the post'
                        },
                        num_comments: {
                          type: 'number',
                          description: 'The number of comments on the post'
                        },
                        url: {
                          type: 'string',
                          description: 'The URL of the post on Reddit'
                        }
                      }
                    },
                    description: 'An array of Reddit posts'
                  }
                }
              }
            }
          }
        },
        '500': {
          description: 'Error response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    description: 'Error message'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  twitter: {
    name: 'Generate Twitter Share Intent',
    description: 'Creates a Twitter share intent URL based on provided parameters',
    endpoint: '/api/tools/twitter',
    schema: {
      operationId: 'getTwitterShareIntent',
      parameters: [
        {
          name: 'text',
          in: 'query',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'The text content of the tweet'
        },
        {
          name: 'url',
          in: 'query',
          required: false,
          schema: {
            type: 'string'
          },
          description: 'The URL to be shared in the tweet'
        },
        {
          name: 'hashtags',
          in: 'query',
          required: false,
          schema: {
            type: 'string'
          },
          description: 'Comma-separated hashtags for the tweet'
        },
        {
          name: 'via',
          in: 'query',
          required: false,
          schema: {
            type: 'string'
          },
          description: 'The Twitter username to attribute the tweet to'
        }
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  twitterIntentUrl: {
                    type: 'string',
                    description: 'The generated Twitter share intent URL'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  createTransaction: {
    name: 'Create NEAR Transaction',
    description: 'Generates a NEAR transaction payload for transferring tokens',
    endpoint: '/api/tools/create-transaction',
    schema: {
      operationId: 'createNearTransaction',
      parameters: [
        {
          name: 'receiverId',
          in: 'query',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'The NEAR account ID of the receiver'
        },
        {
          name: 'amount',
          in: 'query',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'The amount of NEAR tokens to transfer'
        }
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  transactionPayload: {
                    type: 'object',
                    properties: {
                      receiverId: {
                        type: 'string',
                        description: "The receiver's NEAR account ID"
                      },
                      actions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              description: "The type of action (e.g., 'Transfer')"
                            },
                            params: {
                              type: 'object',
                              properties: {
                                deposit: {
                                  type: 'string',
                                  description: 'The amount to transfer in yoctoNEAR'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  coinflip: {
    name: 'Coin Flip',
    description: 'Flip a coin and return the result (heads or tails)',
    endpoint: '/api/tools/coinflip',
    schema: {
      operationId: 'coinFlip',
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  result: {
                    type: 'string',
                    description: 'The result of the coin flip (heads or tails)',
                    enum: ['heads', 'tails']
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
