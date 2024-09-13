import { useEffect, useState } from "react";
import { HDKey } from "ethereum-cryptography/hdkey";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

export default function SignMessage({
  privateKey,
}: {
  privateKey: HDKey | null;
}) {
  const [message, setMessage] = useState<string>(`Hello, world!`);
  const [hash, setHash] = useState<Uint8Array>(keccak256(Buffer.from(message)));
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    setHash(keccak256(Buffer.from(message)));
  }, [message]);

  function signMessage() {
    if (!privateKey?.privateKey) {
      alert("Generate a private key first.");
      return;
    }

    setSignature(secp256k1.sign(hash, privateKey.privateKey).toCompactHex());
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <h2 className="scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-4">
        Sign a message with a private key
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6">
        Using your generated private key, you can sign message hashes.
      </p>

      <Textarea
        className="w-full mb-4"
        placeholder="Enter a message to sign"
        rows={4}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <div className="space-y-2 mb-4">
        <p className="text-sm font-semibold">Message hash:</p>
        <p className="text-xs sm:text-sm text-muted-foreground break-all p-2 rounded-md">
          {hash}
        </p>
      </div>

      <Button
        onClick={signMessage}
        className="w-full mb-4"
        disabled={!privateKey?.privateKey || !message}
      >
        Sign Message Hash
      </Button>

      {signature && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">Signature:</p>
          <p className="text-xs sm:text-sm text-muted-foreground break-all p-2 rounded-md">
            {signature}
          </p>
        </div>
      )}
    </div>
  );
}
