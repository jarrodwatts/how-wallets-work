import React, { useEffect, useState } from "react";
import {
  getAddressFromPublicKey,
  getMasterPrivateKeyFromSeed,
} from "@/lib/bip-32";
import generateMnemonic, { getSeedFromMnemonic } from "@/lib/bip-39";
import { generateRandom16Bits } from "@/lib/csprng";
import { toHex } from "ethereum-cryptography/utils";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { HDKey } from "ethereum-cryptography/hdkey";
import { Button } from "./ui/button";

export default function GenerateKeypair() {
  const [bitsForEntropy, setBitsForEntropy] = useState<Uint8Array | null>(null);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [seed, setSeed] = useState<Uint8Array | null>(null);
  const [masterKey, setMasterKey] = useState<HDKey | null>(null);
  const [ethereumAddress, setEthereumAddress] = useState<string | null>(null);

  return (
    <div className="my-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        1: Generate a public/private keypair
      </h2>
      <p className="leading-7 mt-2">
        Create a private/public key pair on the <strong>secp256k1</strong>{" "}
        elliptic curve.
      </p>

      <Table className="mt-6 text-left min-w-[720px] max-w-[720px]">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Step</TableHead>
            <TableHead>Generate</TableHead>
            <TableHead className="w-[320px]">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Generate 128 random bits using CSPRNG</TableCell>
            <TableCell>
              <Button onClick={() => setBitsForEntropy(generateRandom16Bits())}>
                Generate
              </Button>
            </TableCell>
            <TableCell>{bitsForEntropy ? toHex(bitsForEntropy) : ""}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>
              Generate a mnemonic seed phrase using the entropy (128 bits)
            </TableCell>
            <TableCell>
              <Button
                disabled={!bitsForEntropy}
                onClick={() => setMnemonic(generateMnemonic(bitsForEntropy!))}
              >
                Generate
              </Button>
            </TableCell>
            <TableCell>{mnemonic}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>
              Convert mnemonic seed phrase into a binary seed
            </TableCell>
            <TableCell>
              <Button
                disabled={!mnemonic}
                onClick={() => setSeed(getSeedFromMnemonic(mnemonic!))}
              >
                Generate
              </Button>
            </TableCell>
            <TableCell className="text-clip	max-w-[320px]">
              {seed ? toHex(seed) : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>Derive a private key from the seed phrase</TableCell>
            <TableCell>
              <Button
                disabled={!seed}
                onClick={() => setMasterKey(getMasterPrivateKeyFromSeed(seed!))}
              >
                Generate
              </Button>
            </TableCell>
            <TableCell className="text-clip	max-w-[320px]">
              {masterKey ? toHex(masterKey.privateKey!) : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>
              Derive the public key using ECC and format it to an Ethereum
              address
            </TableCell>
            <TableCell>
              <Button
                disabled={!masterKey}
                onClick={() =>
                  setEthereumAddress(getAddressFromPublicKey(masterKey!))
                }
              >
                Generate
              </Button>
            </TableCell>
            <TableCell className="text-clip	max-w-[320px]">
              {ethereumAddress}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
