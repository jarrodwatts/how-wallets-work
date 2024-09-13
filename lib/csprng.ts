import { getRandomBytesSync } from "ethereum-cryptography/random.js";

/**
 * 128 random bits using CSPRNG
 * Uses crypto.getRandomValues() in the browser and crypto.randomBytes() in Node.js
 * Source: https://github.com/paulmillr/noble-hashes/blob/main/src/utils.ts#L248-L260
 */
export function generateRandom16Bits(): Uint8Array {
  return getRandomBytesSync(16);
}
