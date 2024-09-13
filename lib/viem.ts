import { createPublicClient, createWalletClient, http } from "viem";
import { abstractTestnet } from "viem/chains";
import { eip712WalletActions } from "viem/zksync";
import { RPC_URL } from "./const";

export const walletClient = createWalletClient({
  chain: abstractTestnet,
  transport: http(RPC_URL),
}).extend(eip712WalletActions());

export const publicClient = createPublicClient({
  chain: abstractTestnet,
  transport: http(RPC_URL),
});
