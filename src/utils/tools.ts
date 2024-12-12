import { NextResponse } from 'next/server';

export const createToolResponse = <T>(data: T, status = 200) => {
  return NextResponse.json(data, { status });
};

export const createErrorResponse = (message: string, status = 500) => {
  return NextResponse.json({ error: message }, { status });
};
