import { createWalletClient, custom, createPublicClient, parseEther, defineChain, formatEther } from "https://esm.sh/viem";
import { contractAddress, coffeeAbi } from "./constants-js.js";

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
// const withdrawButton = document.getElementById("withdrawButton");

let walletClient;
let publicClient;

// Connecting to the wallet
async function connect() {
    if (typeof window.ethereum !== "undefined") {

        //Requesting access to the user's wallet
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
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

    if (typeof window.ethereum !== "undefined") {

        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "fund",
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),
        })
        const hash = await walletClient.writeContract(request);
        console.log(hash);

    } else {
        connectButton.innerHTML = "Please install MetaMask!";
    }

}


async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
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
    })
    return currentChain
}

async function getBalance() {
    // Getting the balance of the contract
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        // Get the current chain
        const balance = await publicClient.getBalance({
            address: contractAddress
        })
        console.log(formatEther(balance));
    }
}

async function withdraw() {
    console.log(`Withdrawing...`)

    if (typeof window.ethereum !== "undefined") {
        try {
            walletClient = createWalletClient({
                transport: custom(window.ethereum),
            })
            publicClient = createPublicClient({
                transport: custom(window.ethereum),
            })
            const [account] = await walletClient.requestAddresses()
            const currentChain = await getCurrentChain(walletClient)

            console.log("Processing transaction...")
            const { request } = await publicClient.simulateContract({
                account,
                address: contractAddress,
                abi: coffeeAbi,
                functionName: "withdraw",
                chain: currentChain,
            })
            const hash = await walletClient.writeContract(request)
            console.log("Transaction processed: ", hash)
        } catch (error) {
            console.log(error)
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
    }
}


connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
