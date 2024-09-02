"use client";

import GenerateKeypair from "@/components/GenerateKeypair";
import SignMessage from "@/components/SignMessage";
import { Separator } from "@/components/ui/separator";
import { HDKey } from "ethereum-cryptography/hdkey";
import { useState } from "react";

export default function Home() {
  const [privateKey, setPrivateKey] = useState<HDKey | null>(null);

  return (
    <main className="flex flex-col items-center p-4 pt-12 lg:p-24 gap-2 text-center break-words text-wrap">
      <div
        style={{
          // Pretty gradients in the background.
          backgroundImage: `
            
            radial-gradient(circle farthest-side at -15% 85%, rgba(34, 139, 34, 0.36), rgba(0, 0, 0, 0) 52%),
            radial-gradient(circle farthest-side at 100% 30%, rgba(50, 205, 50, 0.25), rgba(0, 0, 0, 0) 30%)
          `,
        }}
        className="fixed inset-0 z-[-100]"
      />

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        How Ethereum Accounts Work
      </h1>
      <p className="leading-7 mt-2">
        Visual demonstration of how Ethereum accounts are generated and used to
        sign transactions.
      </p>

      <Separator className="my-2" />

      <GenerateKeypair privateKey={privateKey} setPrivateKey={setPrivateKey} />
      <Separator className="my-2" />
      <SignMessage privateKey={privateKey} />
      <Separator className="my-2" />
    </main>
  );
}
