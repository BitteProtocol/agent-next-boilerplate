import { BlockchainResponse } from '@/types/tools';
import { createToolResponse, createErrorResponse } from '@/utils/tools';

export async function GET() {
  try {
    const blockchains = [
      'Bitcoin',
      'Ethereum',
      'Cardano',
      'Polkadot',
      'Solana',
      'Avalanche',
      'Binance Smart Chain',
      'Tezos',
      'Algorand',
      'Cosmos',
      'Near',
      'Aptos',
      'Sui',
      'Starknet',
      'ZKsync',
      'Scroll',
      'Optimism',
      'Arbitrum',
    ];

    const randomBlockchains = blockchains
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return createToolResponse<BlockchainResponse>({ blockchains: randomBlockchains });
  } catch (error) {
    console.error('Error getting blockchains:', error);
    return createErrorResponse('Failed to get blockchains');
  }
}
