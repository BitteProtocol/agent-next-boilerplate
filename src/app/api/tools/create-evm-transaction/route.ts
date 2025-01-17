import { NextResponse } from 'next/server';
import type { MetaTransaction } from "near-safe";
import { signRequestFor } from '@bitte-ai/agent-sdk';
import { parseEther } from 'viem';


export async function GET(request: Request) {
  try {
    // test
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    const amount = searchParams.get('amount');

    if (!to || !amount) {
      console.log(`to: ${to}\namount: ${amount}`);

      return NextResponse.json({ error: '"to" and "amount" are required parameters' }, { status: 400 });
    }

    // Create EVM transaction object
    const transaction: MetaTransaction = {
      to: to,
      value: parseEther(amount.toString()).toString(), // remove decimals
      data: '0x',
    };
    const signRequestTransaction = signRequestFor({
      chainId: 1,
      metaTransactions: [transaction]
    });

    return NextResponse.json({ evmSignRequest: signRequestTransaction }, { status: 200 });
  } catch (error) {
    console.error('Error generating EVM transaction:', error);
    return NextResponse.json({ error: 'Failed to generate EVM transaction' }, { status: 500 });
  }
}
