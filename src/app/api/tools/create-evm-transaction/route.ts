import { NextResponse } from 'next/server';
import type { MetaTransaction, SignRequestData } from "near-safe";
import { getAddress, type Hex, zeroAddress, type Address } from "viem";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    const amount = searchParams.get('amount');

    if (!to || !amount) {
      return NextResponse.json({ error: '"to" and "amount" are required parameters' }, { status: 400 });
    }

    // Create EVM transaction object
    const transaction: MetaTransaction = {
      to: to,
      value: amount,
      data: '0x',
    };
    const signedTransaction = signRequestFor({ 
      chainId: 0, 
      metaTransactions: [transaction] 
    });

    return NextResponse.json({ signedTransaction });
  } catch (error) {
    console.error('Error generating EVM transaction:', error);
    return NextResponse.json({ error: 'Failed to generate EVM transaction' }, { status: 500 });
  }
}

function signRequestFor({
  from,
  chainId,
  metaTransactions,
}: {
  from?: Address;
  chainId: number;
  metaTransactions: MetaTransaction[];
}): SignRequestData {
  return {
    method: "eth_sendTransaction",
    chainId,
    params: metaTransactions.map((mt) => ({
      from: from ?? zeroAddress,
      to: getAddress(mt.to),
      value: mt.value as Hex,
      data: mt.data as Hex,
    })),
  };
}