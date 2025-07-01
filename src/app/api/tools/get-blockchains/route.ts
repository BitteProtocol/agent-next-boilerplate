import { NextResponse } from "next/server";

export async function GET() {
  const blockchains = [
    "Bitcoin",
    "Ethereum",
    "Cardano",
    "Polkadot",
    "Solana",
    "Avalanche",
    "Binance Smart Chain",
    "Tezos",
    "Algorand",
    "Cosmos",
    "Near",
    "Aptos",
    "Sui",
    "Starknet",
    "ZKsync",
    "Scroll",
    "Optimism",
    "Arbitrum",
  ];

  const randomBlockchains = blockchains
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return NextResponse.json({ blockchains: randomBlockchains });
}
