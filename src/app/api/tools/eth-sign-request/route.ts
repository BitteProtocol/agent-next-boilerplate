import { SignRequestSchema } from "./schema";
import {toHex} from "viem";

const SEPOLIA_CHAIN_ID = 11155111;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log("eth-sign-request/", searchParams);
    const { method, evmAddress, chainId: possibleChainId, message } = SignRequestSchema.parse(Object.fromEntries(searchParams.entries()));
    const chainId = possibleChainId || SEPOLIA_CHAIN_ID;

    if (method === "eth_sign" || method === "personal_sign") {
      const messageText = message || "Default Message";
      const [x, y] = [evmAddress, toHex(messageText)];
      return Response.json(
        {
          transaction: {
            method,
            // Parameter order different based on sign method.
            params: method === "eth_sign" ? [x, y]: [y, x],
          },
          meta: `Sign message "${messageText}" with ${evmAddress}`,
        },
        { status: 200 },
      );
    } else if (method === "eth_signTypedData" || method === "eth_signTypedData_v4") {
      const domain = {
        name: "Bitte Test EVM Agent",
        version: "1",
        chainId: chainId || SEPOLIA_CHAIN_ID,
        verifyingContract: "0x0000000000000000000000000000000000000000",
      };

      const types = {
        Access: [
          { name: "user", type: "address" },
          { name: "action", type: "string" },
          { name: "expires", type: "uint256" },
          { name: "note", type: "string" },
        ],
      };

      const message = {
        user: evmAddress,
        action: "DEMO SIGNATURE — NOT USABLE",
        expires: 0,
        note: "This signature is expired and only for testing/demo purposes.",
      };

      const dataString = JSON.stringify({
        domain,
        types,
        primaryType: "Access",
        message,
      });
      return Response.json(
      {
        transaction: {
          chainId,
          method,
          params: [evmAddress, dataString],
        },
        meta: `Sign Dummy Typed Data. ${dataString}`,
      },
      { status: 200 },
    );
    }

  } catch (error) {
    const publicMessage = "Error generating EVM transaction:";
    console.error(publicMessage, error);
    return Response.json(
      { error: publicMessage },
      { status: 500 },
    );
  }
}