import {
    createWalletClient,
    custom,
    createPublicClient,
    parseEther,
    defineChain,
    formatEther,
} from "viem";
import "viem/window"
import { contractAddress, coffeeAbi } from "./constants-ts";



// Casting DOM elements
const connectButton = document.getElementById('connectButton') as HTMLButtonElement;
const fundButton = document.getElementById("fundButton") as HTMLButtonElement;
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement;
const balanceButton = document.getElementById("balanceButton") as HTMLButtonElement;
const withdrawButton = document.getElementById("withdrawButton") as HTMLButtonElement;

let walletClient;
let publicClient;

// Connecting to the wallet
async function connect() {
    if (window.ethereum) {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        await walletClient.requestAddresses();
        connectButton.innerHTML = "Connected!";
    } else {
        connectButton.innerHTML = "Please install MetaMask!";
    }
}

// Funding the contract
async function fund() {
    const ethAmount = ethAmountInput.value;
    console.log(`Funding with ${ethAmount} ETH`);

    if (window.ethereum) {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });

        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),
        });
        const hash = await walletClient.writeContract(request);
        console.log(hash);
    } else {
        connectButton.innerHTML = "Please install MetaMask!";
    }
}

// Get current chain info
async function getCurrentChain(client: any) {
    const chainId = await client.getChainId();
    return defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    });
}

// Get contract balance
async function getBalance() {
    if (window.ethereum) {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });

        const balance = await publicClient.getBalance({
            address: contractAddress
        });
        console.log(formatEther(balance));
    }
}

// Withdraw funds
async function withdraw() {
    console.log(`Withdrawing...`);

    if (window.ethereum) {
        try {
            walletClient = createWalletClient({
                transport: custom(window.ethereum),
            });
            publicClient = createPublicClient({
                transport: custom(window.ethereum),
            });

            const [account] = await walletClient.requestAddresses();
            const currentChain = await getCurrentChain(walletClient);

            console.log("Processing transaction...");
            const { request } = await publicClient.simulateContract({
                account,
                address: contractAddress,
                abi: coffeeAbi,
                functionName: "withdraw",
                chain: currentChain,
            });
            const hash = await walletClient.writeContract(request);
            console.log("Transaction processed: ", hash);
        } catch (error) {
            console.error(error);
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask";
    }
}

// Attach event listeners
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
