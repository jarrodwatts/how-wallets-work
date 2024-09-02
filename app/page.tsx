"use client";

import GenerateKeypair from "@/components/GenerateKeypair";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-12 lg:p-24 gap-2 text-center">
      <div
        style={{
          // Pretty gradients in the background.
          backgroundImage: `
            radial-gradient(circle farthest-side at -15% 85%, rgba(34, 139, 34, 0.36), rgba(0, 0, 0, 0) 52%),
            radial-gradient(circle farthest-side at 100% 30%, rgba(50, 205, 50, 0.25), rgba(0, 0, 0, 0) 30%)
          `,
        }}
        className="absolute inset-0 z-0"
      />

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        How Ethereum Accounts Work
      </h1>
      <p className="leading-7 mt-2">
        Visual demonstration of how Ethereum accounts are generated and used to
        sign transactions.
      </p>

      <Separator className="my-2" />

      <GenerateKeypair />
    </main>
  );
}
