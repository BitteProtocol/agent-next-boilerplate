import { NextResponse } from 'next/server';
import { utils } from 'near-api-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const receiverId = searchParams.get('receiverId');
    const amount = searchParams.get('amount');

    if (!receiverId || !amount) {
      return NextResponse.json({ error: 'receiverId and amount are required parameters' }, { status: 400 });
    }

    // Convert amount to yoctoNEAR (1 NEAR = 10^24 yoctoNEAR)
    const amountInYoctoNEAR = utils.format.parseNearAmount(amount);

    if (!amountInYoctoNEAR) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const transactionPayload = {
      receiverId,
      actions: [
        {
          type: 'Transfer',
          params: {
            deposit: amountInYoctoNEAR,
          },
        },
      ],
    };

    return NextResponse.json({ transactionPayload });
  } catch (error) {
    console.error('Error generating NEAR transaction payload:', error);
    return NextResponse.json({ error: 'Failed to generate NEAR transaction payload' }, { status: 500 });
  }
}
