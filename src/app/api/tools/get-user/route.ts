import { headers } from 'next/headers';
import { createToolResponse, createErrorResponse } from '@/utils/tools';

export async function GET() {
  try {
    const headersList = await headers();
    let mbMetadata;
    try {
      mbMetadata = JSON.parse(headersList.get('mb-metadata') || '{}');
    } catch {
      return createErrorResponse('Invalid mb-metadata header format', 400);
    }

    const accountId = mbMetadata?.accountData?.accountId || 'near';
    return createToolResponse({ accountId });
  } catch {
    return createErrorResponse('Failed to retrieve user information', 500);
  }
}
