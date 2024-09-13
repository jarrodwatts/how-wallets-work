import { HDKey } from "ethereum-cryptography/hdkey";
import { Button } from "./ui/button";
import { useState } from "react";
import { combineParts, splitPrivateKey } from "@/lib/split-private-key";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toHex } from "ethereum-cryptography/utils";

export default function ShardPrivateKey({
  privateKey,
}: {
  privateKey: HDKey | null;
}) {
  const [shards, setShards] = useState<Uint8Array[]>([]);
  const [selectedShards, setSelectedShards] = useState<number[]>([]);
  const [recoveredKey, setRecoveredKey] = useState<string | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedShards((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((shardIndex) => shardIndex !== index);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };

  const formatShard = (shard: Uint8Array) => {
    return Buffer.from(shard).toString("hex");
  };

  const handleCombineShards = async () => {
    const combinedKey = await combineParts([
      shards[selectedShards[0]],
      shards[selectedShards[1]],
    ]);
    setRecoveredKey(toHex(combinedKey));
  };

  return (
    <div className="my-4 mx-4 max-w-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Shard a private key
      </h2>
      <p className="leading-7 mt-2">
        Split your private key into three shards using Shamir&rsquo;s Secret
        Sharing algorithm.
      </p>

      <p className="max-w-full text-muted-foreground mt-4 break-all whitespace-pre-wrap overflow-wrap-anywhere">
        <strong>Your private key:</strong>{" "}
        {privateKey && privateKey.privateKey
          ? toHex(privateKey.privateKey)
          : "N/A"}
      </p>

      <Button
        className="w-3/4 my-2"
        disabled={!privateKey || !privateKey.privateKey}
        onClick={async () => {
          const pieces = await splitPrivateKey(privateKey!.privateKey!);
          setShards(pieces);
        }}
      >
        Split Private Key
      </Button>

      <Separator className="my-2" />

      {shards.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Your Shards</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            Click to select up to 2 shards and recombine them to recover your
            private key.
          </p>
          <div className="flex flex-wrap gap-4">
            {shards.map((shard, index) => (
              <Card
                key={index}
                className={`w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] cursor-pointer transition-all duration-300 ease-in-out ${
                  selectedShards.includes(index)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleCardClick(index)}
              >
                <CardContent className="p-4">
                  <h4 className="font-bold mb-2">Shard {index + 1}</h4>
                  <p className="text-sm break-all">{formatShard(shard)}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-3/4 my-4"
            disabled={selectedShards.length !== 2}
            onClick={handleCombineShards}
          >
            Combine Shards
          </Button>

          {recoveredKey && selectedShards.length == 2 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Recovered Private Key
              </h3>
              <p className="text-sm break-all p-4 rounded-md">{recoveredKey}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
