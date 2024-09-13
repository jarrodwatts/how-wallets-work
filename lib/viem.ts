import { createPublicClient, createWalletClient, http } from "viem";
import { abstractTestnet } from "viem/chains";
import { eip712WalletActions } from "viem/zksync";
import { RPC_URL } from "./const";

/** A Viem wallet client to send & sign transactions from a private key over RPC. */
export const walletClient = createWalletClient({
  chain: abstractTestnet,
  transport: http(RPC_URL),
}).extend(eip712WalletActions());

/** A Viem public client to query blockchain data over RPC. */
export const publicClient = createPublicClient({
  chain: abstractTestnet,
  transport: http(RPC_URL),
});
