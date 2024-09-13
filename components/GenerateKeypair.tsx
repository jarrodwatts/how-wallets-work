import React, { useState } from "react";
import {
  getAddressFromPublicKey,
  getMasterPrivateKeyFromSeed,
} from "@/lib/bip-32";
import generateMnemonic, { getSeedFromMnemonic } from "@/lib/bip-39";
import { generateRandom16Bits } from "@/lib/csprng";
import { toHex } from "ethereum-cryptography/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { HDKey } from "ethereum-cryptography/hdkey";
import { Button } from "./ui/button";

export default function GenerateKeypair({
  privateKey,
  setPrivateKey,
}: {
  privateKey: HDKey | null;
  setPrivateKey: (privateKey: HDKey) => void;
}) {
  const [bitsForEntropy, setBitsForEntropy] = useState<Uint8Array | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [seed, setSeed] = useState<Uint8Array | null>(null);
  const [ethereumAddress, setEthereumAddress] = useState<string | null>(null);

  function generateKeypair() {
    const bitsForEntropy = generateRandom16Bits();
    setBitsForEntropy(bitsForEntropy);

    const mnemonic = generateMnemonic(bitsForEntropy);
    setMnemonic(mnemonic);

    const seed = getSeedFromMnemonic(mnemonic);
    setSeed(seed);

    const masterKey = getMasterPrivateKeyFromSeed(seed);
    setPrivateKey(masterKey);

    const ethereumAddress = getAddressFromPublicKey(masterKey);
    setEthereumAddress(ethereumAddress);
  }

  return (
    <div className="my-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Generate a public/private keypair
      </h2>
      <p className="leading-7 mt-2">
        Create a private/public key pair on the <strong>secp256k1</strong>{" "}
        elliptic curve.
      </p>

      <Table className="mt-6 text-left lg:min-w-[720px] max-w-[720px] m-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[16px]">#</TableHead>
            <TableHead className="w-2/5">Step</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>1</strong>
            </TableCell>
            <TableCell>Generate 128 random bits using CSPRNG</TableCell>
            <TableCell>{bitsForEntropy ? toHex(bitsForEntropy) : ""}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>2</strong>
            </TableCell>
            <TableCell>
              Generate a mnemonic seed phrase using the entropy (128 bits)
            </TableCell>
            <TableCell>{mnemonic}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>3</strong>
            </TableCell>
            <TableCell>
              Convert mnemonic seed phrase into a binary seed
            </TableCell>
            <TableCell className="text-clip	max-w-[100px] break-words">
              {seed ? toHex(seed) : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>4</strong>
            </TableCell>
            <TableCell>Derive a private key from the seed phrase</TableCell>
            <TableCell className="text-clip	max-w-[100px] break-words">
              {privateKey ? toHex(privateKey.privateKey!) : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <strong>5</strong>
            </TableCell>
            <TableCell>
              Derive the public key using ECC and format it to an Ethereum
              address
            </TableCell>
            <TableCell className="text-clip	max-w-[100px] break-words">
              {ethereumAddress}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button onClick={generateKeypair} className="w-full mt-1">
        Generate Keypair
      </Button>
    </div>
  );
}
