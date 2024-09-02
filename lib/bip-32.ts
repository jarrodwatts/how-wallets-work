import { HDKey } from "ethereum-cryptography/hdkey";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

/**
 * This uses the BIP-32 standard to derive a master private key from a seed.
 * HMAC-SHA512 is used to derive a master private key from a seed.
 */
export function getMasterPrivateKeyFromSeed(seed: Uint8Array): HDKey {
  return HDKey.fromMasterSeed(seed);
}

/**
 * https://ethereum.org/en/developers/docs/accounts/#account-creation
 * You get a public address for your account by taking the last 20 bytes
 * of the Keccak-256 hash of the public key and adding 0x to the beginning.
 */
export function getAddressFromPublicKey(key: HDKey): string {
  const pubicKey = secp256k1.getPublicKey(key.privateKey!);
  const hash = keccak256(pubicKey!);
  const last20Bytes = hash.slice(-20);
  const hex = toHex(last20Bytes);
  const address = `0x${hex}`;
  return address;
}
