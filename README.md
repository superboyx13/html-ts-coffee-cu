HTML TS Buy Me A Coffee

This is a simple beginner website made for Web3 Developement.

HTML TS Buy Me A Coffee
Setup (Both Javascript and Typescript Editions)
Requirements
Quickstart
Javascript Edition
Quickstart
Typescript Edition
Requirements
Quickstart
There are 2 different ways to run this codebase.

Javascript Edition

Typescript Edition

Setup (Both Javascript and Typescript Editions)
Requirements
git
You'll know you've installed it right if you can run: git --version
Metamask
This is a browser extension that lets you interact with the blockchain.
anvil
You'll know you've installed it right if you can run: anvil --version
Quickstart
Clone the repository
git clone https://github.com/superboyx13/html-ts-coffee-cu.git
Run the following command:
anvil --load-state fundme-anvil.json 
This will load a local blockchain with our smart contract already deployed.

Import the anvil key into your Metamask
When you run the anvil command from #1, it'll give you a list of private keys. Import one into your metamask.

You'll now have a wallet with some funds associated with our anvil chain!

Add the anvil chain to your metamask
Follow this and use:

Network name: Anvil
New RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Block Explorer URL: None
Javascript Edition
After doing the setup above, do the following

Quickstart
Run the index.html file
You can usually just double click the file to "run it in the browser". Or you can right click the file in your VSCode and run "open with live server" if you have the live server VSCode extension (ritwickdey.LiveServer).

And you should see a small button that says "connect".

Connect

Hit it, and you should see metamask pop up.

Press some buttons!
Typescript Edition
After doing the setup from above, do the following

Requirements
All the requirements for the Javascript Edition
pnpm
You'll know you've installed it right if you can run:pnpm --version
Node.js
You'll know you've installed it right if you can run: node --version
Quickstart
Install the dependencies
pnpm install
Uncomment the line with index-ts.ts line in your index.html file, and comment out the line with index-js.js. Like this:
<script src="./index-ts.ts" type="module"></script>
<!-- <script src="./index-js.js" type="module"></script> -->
Run the following command:
pnpm run dev
Open your browser to whatever the command above says, ie: http://localhost:5173/

Press some buttons!