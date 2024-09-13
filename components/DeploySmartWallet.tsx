import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { publicClient, walletClient } from "@/lib/viem";
import {
  ACCOUNT_ABI,
  ACCOUNT_BYTECODE,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  PAYMASTER_ADDRESS,
} from "@/lib/const";
import { privateKeyToAccount } from "viem/accounts";
import { Hex } from "viem";
import {
  getGeneralPaymasterInput,
  toSinglesigSmartAccount,
  ZksyncTransactionReceipt,
} from "viem/zksync";
import { abstractTestnet } from "viem/chains";
import { Separator } from "./ui/separator";

export default function DeploySmartWallet({
  privateKeyHex,
}: {
  privateKeyHex: Hex | null;
}) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [transactionReceipt, setTxReceipt] =
    useState<ZksyncTransactionReceipt | null>(null);

  const [isMinting, setIsMinting] = useState(false);
  const [mintReceipt, setMintReceipt] =
    useState<ZksyncTransactionReceipt | null>(null);

  const deploySmartWallet = async () => {
    try {
      if (!privateKeyHex) {
        alert("Please generate a private key first.");
        return;
      }

      setIsDeploying(true);

      const deployerAccount = privateKeyToAccount(privateKeyHex);

      const hash = await walletClient.deployContract({
        abi: ACCOUNT_ABI,
        bytecode: ACCOUNT_BYTECODE,
        account: deployerAccount,
        args: [deployerAccount.address],
        paymaster: PAYMASTER_ADDRESS,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
        deploymentType: "createAccount",
        chain: abstractTestnet,
      });

      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      setTxReceipt(transactionReceipt);
      setIsDeploying(false);
    } catch (error) {
      console.error(error);
      alert(
        "Error deploying smart wallet. Check the console for more details."
      );
    } finally {
      setIsDeploying(false);
    }
  };

  const mintNft = async () => {
    if (!privateKeyHex) {
      alert("Please generate a private key first.");
      return;
    }

    if (!transactionReceipt) {
      alert("Please deploy the smart wallet first.");
      return;
    }

    try {
      setIsMinting(true);

      // Create the smart account
      const smartAccount = toSinglesigSmartAccount({
        address: transactionReceipt.contractAddress as Hex,
        privateKey: privateKeyHex,
      });

      const hash = await walletClient.writeContract({
        abi: NFT_CONTRACT_ABI,
        address: NFT_CONTRACT_ADDRESS,
        account: smartAccount,
        functionName: "mint",
        args: [smartAccount.address, 1],
        paymaster: PAYMASTER_ADDRESS,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: "0x",
        }),
      });

      const mintReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      setMintReceipt(mintReceipt);
      console.log(mintReceipt);
    } catch (error) {
      console.error(error);
      alert("Error minting NFT. Check the console for more details.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <h2 className="scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 mb-4">
        Deploy Smart Wallet
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6">
        Deploy a new smart contract wallet from your EOA.
      </p>

      <Button
        onClick={deploySmartWallet}
        className="w-full mb-4"
        disabled={isDeploying}
      >
        {isDeploying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Deploying...
          </>
        ) : (
          "Deploy Smart Wallet"
        )}
      </Button>

      {transactionReceipt && (
        <div className="space-y-2 mt-6">
          <p className="text-sm mt-2">
            View your transaction on the{" "}
            <a
              href={`https://explorer.testnet.abs.xyz/tx/${transactionReceipt.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline bold"
            >
              Abstract explorer
            </a>
            .
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground break-all p-2 rounded-md">
            <strong>Smart wallet contract address: </strong>
            <a
              href={`https://explorer.testnet.abs.xyz/address/${transactionReceipt.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline bold"
            >
              {transactionReceipt.contractAddress}
            </a>
          </p>
        </div>
      )}

      <Separator className="my-2" />

      {transactionReceipt && (
        <>
          <h3 className="text-xl font-semibold my-2">Use Smart Wallet</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-1">
            Use the smart wallet to mint an NFT.
          </p>
          <Button onClick={mintNft} className="w-full mt-1">
            {isMinting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting...
              </>
            ) : (
              "Mint NFT"
            )}
          </Button>

          {
            // Mint receipt
            mintReceipt && (
              <div className="space-y-2 mt-6">
                <p className="text-sm mt-2">
                  View your transaction on the{" "}
                  <a
                    href={`https://explorer.testnet.abs.xyz/tx/${mintReceipt.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline bold"
                  >
                    Abstract explorer
                  </a>
                  .
                </p>
              </div>
            )
          }
        </>
      )}
    </div>
  );
}
