import { split, combine } from "shamir-secret-sharing";

/**
 * Splits the private key into 3 parts, requiring 2 parts to combine
 * Uses Shamir's Secret Sharing algorithm.
 * @param privateKey Private key to split
 * @returns The 3 split shards of the private key
 * Source: https://github.com/privy-io/shamir-secret-sharing/blob/main/src/index.ts#L229-L281
 */
export async function splitPrivateKey(privateKey: Uint8Array) {
  const parts = await split(privateKey, 3, 2);
  return parts;
}

/**
 * Recombines the 2 parts of the private key to get the original private key
 * Uses Shamir's Secret Sharing algorithm.
 * Source: https://github.com/privy-io/shamir-secret-sharing/blob/main/src/index.ts#L289-L348
 * @param parts: The 2 parts of the private key
 * @returns: The original private key
 */
export async function combineParts(parts: Uint8Array[]) {
  const privateKey = await combine(parts);
  return privateKey;
}
