import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { toolConfigs } from '@/config/tools';
import type { ToolConfig, ToolParameter } from '@/types/tools';

export function middleware(request: NextRequest) {
  // Only validate tool endpoints
  if (request.nextUrl.pathname.startsWith('/api/tools/')) {
    const toolPath = request.nextUrl.pathname.replace('/api/tools/', '');
    const tool = Object.values(toolConfigs).find((config: ToolConfig) =>
      config.endpoint === `/api/tools/${toolPath}`
    );

    // Check if tool exists
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Validate required parameters for GET requests
    if (request.method === 'GET' && tool.schema?.parameters) {
      const searchParams = request.nextUrl.searchParams;
      const requiredParams = tool.schema.parameters.filter((param: ToolParameter) => param.required);

      for (const param of requiredParams) {
        if (!searchParams.has(param.name)) {
          return NextResponse.json(
            { error: `Missing required parameter: ${param.name}` },
            { status: 400 }
          );
        }
      }
    }
  }

  return NextResponse.next();
}

// Configure middleware to run only on /api/tools routes
export const config = {
  matcher: '/api/tools/:path*'
};
