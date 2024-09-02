import {
  entropyToMnemonic,
  mnemonicToSeedSync,
} from "ethereum-cryptography/bip39/index.js";
import { wordlist } from "ethereum-cryptography/bip39/wordlists/english.js";

/**
 * Converts raw entropy in form of byte array to mnemonic string.
 * @param bitsForEntropy 32byte array from csprng.ts
 * Source code: https://github.com/paulmillr/scure-bip39/blob/main/src/index.ts#L80-L85
 */
export default function generateMnemonic(bitsForEntropy: Uint8Array): string {
  return entropyToMnemonic(bitsForEntropy, wordlist);
}

/**
 * Uses KDF (Key-Derivation Function) to derive 64 bytes of key data from mnemonic.
 * @param mnemonic 12 words
 * Source code: https://github.com/paulmillr/noble-hashes/blob/main/src/pbkdf2.ts#L51-L73
 */
export function getSeedFromMnemonic(mnemonic: string): Uint8Array {
  return mnemonicToSeedSync(mnemonic);
}
