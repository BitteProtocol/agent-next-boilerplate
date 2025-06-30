import { z } from "zod";
import { Address, isAddress } from "viem";

const evmAddressSchema = z.string().refine(
  (val): val is Address => isAddress(val, {strict: false}),
  { message: "Invalid EVM address" }
);

// Excluding eth_sendTransaction.
const SignRequestMethod = z.enum(["eth_sign", "personal_sign", "eth_signTypedData", "eth_signTypedData_v4"])

export const SignRequestSchema = z.object({
  method: SignRequestMethod,
  evmAddress: evmAddressSchema,
  message: z.string().optional(),
  chainId: z.coerce.number().optional(), // allows string -> number
});

