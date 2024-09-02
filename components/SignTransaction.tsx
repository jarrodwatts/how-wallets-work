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
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { HDKey } from "ethereum-cryptography/hdkey";
import { Button } from "./ui/button";

export default function GenerateKeypair() {
  return (
    <div className="my-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        1: Generate a public/private keypair
      </h2>
      <p className="leading-7 mt-2">
        Create a private/public key pair on the <strong>secp256k1</strong>{" "}
        elliptic curve.
      </p>
    </div>
  );
}
