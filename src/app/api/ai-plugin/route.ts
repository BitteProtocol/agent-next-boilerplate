import { NextResponse } from "next/server";
import { toolConfigs } from "@/config/tools";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
    console.error("no account");
}

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "Bitte Agent Tools",
            description: "Enhanced API for blockchain operations and social interactions",
            version: "1.0.0",
        },
        servers: [
            {
                url: config.url,
            },
        ],
        "x-mb": {
            "account-id": key.accountId,
            assistant: {
                name: "Blockchain & Social Assistant",
                description: "A versatile assistant for blockchain operations, transactions, and social media interactions",
                instructions: `
                    - Use blockchain tools to get network information and create transactions
                    - Share content on social media platforms like Twitter
                    - Fetch and analyze Reddit posts
                    - Handle user interactions and provide clear feedback
                    - Use coin flip for random binary decisions
                `,
                tools: [
                    { type: "generate-transaction" },
                    { type: "social-share" },
                    { type: "blockchain-info" },
                    { type: "content-fetch" }
                ]
            },
        },
        paths: {
            "/api/tools/get-blockchains": {
                get: {
                    summary: toolConfigs.getBlockchains.name,
                    description: toolConfigs.getBlockchains.description,
                    operationId: "get-blockchains",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                description: "The list of blockchains",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                }
            },
            "/api/tools/get-user": {
                get: {
                    summary: toolConfigs.getUser.name,
                    description: toolConfigs.getUser.description,
                    operationId: "get-user",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            accountId: {
                                                type: "string",
                                                description: "The user's account ID",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                }
            },
            "/api/tools/reddit": {
                get: {
                    summary: toolConfigs.reddit.name,
                    description: toolConfigs.reddit.description,
                    operationId: "get-reddit-posts",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            posts: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        title: {
                                                            type: "string",
                                                            description: "The title of the post"
                                                        },
                                                        author: {
                                                            type: "string",
                                                            description: "The username of the post author"
                                                        },
                                                        subreddit: {
                                                            type: "string",
                                                            description: "The subreddit where the post was made"
                                                        },
                                                        score: {
                                                            type: "number",
                                                            description: "The score (upvotes) of the post"
                                                        },
                                                        num_comments: {
                                                            type: "number",
                                                            description: "The number of comments on the post"
                                                        },
                                                        url: {
                                                            type: "string",
                                                            description: "The URL of the post on Reddit"
                                                        }
                                                    }
                                                },
                                                description: "An array of Reddit posts"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/tools/twitter": {
                get: {
                    operationId: toolConfigs.twitter.schema.operationId,
                    summary: toolConfigs.twitter.name,
                    description: toolConfigs.twitter.description,
                    parameters: toolConfigs.twitter.schema.parameters,
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            twitterIntentUrl: {
                                                type: "string",
                                                description: "The generated Twitter share intent URL"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/tools/create-transaction": {
                get: {
                    operationId: toolConfigs.createTransaction.schema.operationId,
                    summary: toolConfigs.createTransaction.name,
                    description: toolConfigs.createTransaction.description,
                    parameters: toolConfigs.createTransaction.schema.parameters,
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            transactionPayload: {
                                                type: "object",
                                                properties: {
                                                    receiverId: {
                                                        type: "string",
                                                        description: "The receiver's NEAR account ID"
                                                    },
                                                    actions: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                type: {
                                                                    type: "string",
                                                                    description: "The type of action (e.g., 'Transfer')"
                                                                },
                                                                params: {
                                                                    type: "object",
                                                                    properties: {
                                                                        deposit: {
                                                                            type: "string",
                                                                            description: "The amount to transfer in yoctoNEAR"
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
                        "400": {
                            description: "Bad request",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/tools/coinflip": {
                get: {
                    summary: toolConfigs.coinflip.name,
                    description: toolConfigs.coinflip.description,
                    operationId: toolConfigs.coinflip.schema.operationId,
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            result: {
                                                type: "string",
                                                description: "The result of the coin flip (heads or tails)",
                                                enum: ["heads", "tails"]
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            description: "Error response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            error: {
                                                type: "string",
                                                description: "Error message"
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
    };

    return NextResponse.json(pluginData);
}
