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
    <div className="my-4 mx-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        2: Sign messages with a private key
      </h2>
      <p className="leading-7 mt-2">
        Using your generated private key, you can sign message hashes.
      </p>

      <Textarea
        className="mt-6 max-w-[720px]"
        placeholder="Enter a message to sign"
        rows={4}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <p className="text-sm text-muted-foreground mt-2 break-words max-w-[750px]">
        <strong>Message hash: </strong>
        {hash}
      </p>

      <Button onClick={signMessage} className="w-full mt-1">
        Sign Message Hash
      </Button>

      {signature && (
        <p className="text-sm text-muted-foreground mt-2 break-words max-w-[750px]">
          <strong>Signature: </strong>
          {signature}
        </p>
      )}
    </div>
  );
}
