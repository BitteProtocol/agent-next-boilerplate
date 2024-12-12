import { CoinFlipResponse } from '@/types/tools';
import { createToolResponse, createErrorResponse } from '@/utils/tools';

export async function GET() {
  try {
    // Simulate a coin flip
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    // Return the result
    return createToolResponse<CoinFlipResponse>({ result });
  } catch (error) {
    console.error('Error in coin flip:', error);
    return createErrorResponse('Failed to perform coin flip', 500);
  }
}
