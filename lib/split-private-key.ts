import {split, combine} from 'shamir-secret-sharing';

// Source: https://github.com/privy-io/shamir-secret-sharing/blob/main/src/index.ts#L229-L281
export async function splitPrivateKey(privateKey: Uint8Array) {
    const parts = await split(privateKey, 3, 2);
    return parts;
}

// Source: https://github.com/privy-io/shamir-secret-sharing/blob/main/src/index.ts#L289-L348
export async function combineParts(parts: Uint8Array[]) {
    const privateKey = await combine(parts);
    return privateKey;
}