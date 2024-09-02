import { getRandomBytesSync } from "ethereum-cryptography/random.js";

export function generateRandom16Bits(): Uint8Array {
  return getRandomBytesSync(16);
}
