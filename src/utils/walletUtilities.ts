import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { Web3 } from "web3";
import * as pbkdf2 from "pbkdf2-sha256";
import { abi } from "./abi";
import * as aes from "aes-js";

const privateKey = localStorage.getItem("privateKey");

// initiating web 3 wallet
export const web3 = new Web3("https://80002.rpc.thirdweb.com/"); // ganache provider

// function to generate mnemonics
export const generateMnemonics = (password) => {
  const mNemonics = bip39.generateMnemonic();
  return mNemonics;
};

// function creating account from mnemonics
export const createAccount = async (mns) => {
  localStorage.setItem("transactionHistory", JSON.stringify([]));
  console.log("mnemonics", mns);
  const seed = await bip39.mnemonicToSeed(mns);
  const node = bip32.fromSeed(seed);
  const child = node.derivePath("m/44'/60'/0'/0/0");
  const privateKey = child.privateKey.toString("hex");
  localStorage.setItem("privateKey", privateKey);
  const account = await web3.eth.accounts.wallet.add(`0x${privateKey}`);
  const address = account[0].address;
  localStorage.setItem("address", address);
  const ballance = Web3.utils.fromWei(
    await web3.eth.getBalance(account[0].address),
    "ether"
  );
  return { address, ballance };
};
// mnemonics encryption
export const encryptMnemonics = async (password, mnemo) => {
  console.log(password, mnemo);

  try {
    const derivedKey = await pbkdf2(
      password,
      "just a random string",
      1,
      32,
      "sha512"
    );
    const textBytes = aes.utils.utf8.toBytes(mnemo);
    const aesCtr = new aes.ModeOfOperation.ctr(derivedKey, new aes.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

    localStorage.setItem("mnemonics", encryptedHex);
  } catch (error) {
    console.log("Error while encrypting");
  }
};

//  function to decrypt mnemonics
export const decryptMnemonics = async (password, mnemonics) => {
  try {
    const derivedKey = await pbkdf2(
      password,
      "just a random string",
      1,
      32,
      "sha512"
    );
    const encryptedBytes = aes.utils.hex.toBytes(mnemonics);
    const aesCtr = new aes.ModeOfOperation.ctr(derivedKey, new aes.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
    const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    if (!regex.test(decryptedText)) {
      throw new Error();
    }
    return { ok: true, message: "Decryption successfull" };
  } catch (error) {
    return { ok: false, message: "Invalid password" };
  }
};

// geting details of an account
export const getDetails = async () => {
  const address = localStorage.getItem("address");
  const ballance = await Web3.utils.fromWei(
    await web3.eth.getBalance(address),
    "ether"
  );
  return { address, ballance };
};

// sending transaction to an account or address
export const transferEther = async (sendFrom, sendTo, amount, privateKey) => {
  console.log("privateKey", privateKey);
  const transactionHistoryString = localStorage.getItem("transactionHistory");
  const transactionHistory = JSON.parse(transactionHistoryString);
  const res = web3.utils.isAddress(sendTo);

  if (!res) {
    return { ok: false, message: "Invalid  address of reciever" }; // check if sendFrom is a valid address
  }
  try {
    const block = await web3.eth.getBlock();
    const tx = {
      from: sendFrom,
      to: sendTo,
      value: web3.utils.toWei(amount, "ether"),
      maxFeePerGas: block.baseFeePerGas * 2n,
      maxPriorityFeePerGas: 100000,
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
      tx,
      privateKey
    );
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("txReceipt", txReceipt);
    const txHash = txReceipt.transactionHash;
    const transaction = await web3.eth.getTransaction(txHash);
    console.log("transaction ", transaction);
    const { from, to, value } = transaction;
    let txHistory = [
      ...transactionHistory,
      { from, to, value: Web3.utils.fromWei(value, "ether") },
    ];
    localStorage.setItem("transactionHistory", JSON.stringify(txHistory));

    return { ok: true, message: "Transaction successfully done" };
  } catch (error) {
    return {
      ok: false,
      message: "Transaction denied becuase of wrong address",
    };
  }
};

// export const myContract = async( deployedAddress)=>{

//   const accountAddress = localStorage.getItem("address");
//   const tokens ={ }
//   tokens[accountAddress] = [{ "deployedAddress": deployedAddress }]
//   localStorage.setItem("tokensAddress", JSON.stringify(tokens));

// }

export const myContract = async (deployedAddress) => {
  const accountAddress = localStorage.getItem("address");

  // Fetch existing tokens from localStorage
  let tokens = JSON.parse(localStorage.getItem("tokensAddress")) || {};

  // Check if tokens already exist for the accountAddress
  if (tokens.hasOwnProperty(accountAddress)) {
    // Add the new deployedAddress to the existing array
    tokens[accountAddress].push({ deployedAddress: deployedAddress });
  } else {
    // Initialize a new array with the deployedAddress
    tokens[accountAddress] = [{ deployedAddress: deployedAddress }];
  }

  // Store updated tokens back into localStorage
  localStorage.setItem("tokensAddress", JSON.stringify(tokens));
};

export const getTokenDetails = async (abi, deployedAddress) => {
  try {
    const myContract = new web3.eth.Contract(abi, deployedAddress);
    const name = await myContract.methods.name().call();
    const symbol = await myContract.methods.symbol().call();
    const totalSupply = web3.utils.fromWei(
      await myContract.methods.totalSupply().call(),
      "ether"
    );
    return { name, symbol, totalSupply, deployedAddress };
  } catch (error) {
    return { error: "Wrong Contract address" };
  }
};

export const sendToken = async (abi) => {
  const tokenAddress = "0x50349E6a9C32F5Ba78E0B0ec0289e79CbA377823"; // deployed token address
  const toAddress = "0xFbc02E60462D06f3c575780c37CE8758Ce07E8A9"; // receiver of the token

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
  web3.eth.accounts.wallet.add(signer);

  const contract = new web3.eth.Contract(abi, tokenAddress, {
    from: signer.address,
  });
  let amount = web3.utils.toHex(web3.utils.toWei("1", "ether"));

  // Fetching the nonce and gas price
  const nonce = await web3.eth.getTransactionCount(signer.address, "pending");
  const gasPrice = await web3.eth.getGasPrice();

  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: tokenAddress, // deployed token address
    data: contract.methods.transfer(toAddress, amount).encodeABI(),
    gas: web3.utils.toHex(5000000),
    gasPrice: web3.utils.toHex(gasPrice),
    nonce: web3.utils.toHex(nonce),
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    signer.privateKey
  );
  console.log("Raw transaction data: " + signedTx.rawTransaction);

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
};

setTimeout(() => {
  sendToken(abi);
}, 2000);
