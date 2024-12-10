import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    const amount = searchParams.get('amount');

    if (!to || !amount) {
      return NextResponse.json({ error: '"to" and "amount" are required parameters' }, { status: 400 });
    }

    // Create EVM transaction object
    const transaction = {
      to: to,
      value: amount,
      data: '0x',
    };

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Error generating EVM transaction:', error);
    return NextResponse.json({ error: 'Failed to generate EVM transaction' }, { status: 500 });
  }
}
