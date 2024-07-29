import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { Web3 } from "web3";
import * as pbkdf2 from "pbkdf2-sha256";
import * as aes from "aes-js";

// initiating web 3 wallet
export const web3 = new Web3("https://80002.rpc.thirdweb.com/");
// export const web3 = new Web3("HTTP://127.0.0.1:7545"); // ganache provider

// function to generate mnemonics
export const generateMnemonics = (password) => {
  const mNemonics = bip39.generateMnemonic();
  return mNemonics;
};

// function creating account from mnemonics
export const createAccount = async (mns) => {
  // localStorage.setItem("transactionHistory", JSON.stringify([]));
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
    await web3.eth?.getBalance(address),
    "ether"
  );
  return { address, ballance };
};

// sending transaction to an account or address
export const transferEther = async (sendFrom, sendTo, amount, privateKey) => {
  console.log("privateKey", privateKey);
  const transactionHistoryString =
    localStorage.getItem("transactionHistory") || [];
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

export const getTokenDetails = async (abi, deployedAddress, address) => {
  try {
    const myContract = new web3.eth.Contract(abi, deployedAddress);
    const name = await myContract.methods.name().call();
    const symbol = await myContract.methods.symbol().call();
    const totalSupply = web3.utils.fromWei(
      await myContract.methods.totalSupply().call(),
      "ether"
    );
    const balance = web3.utils.fromWei(
      await myContract.methods.balanceOf(address).call(),
      "ether"
    );

    return { name, symbol, totalSupply, deployedAddress, balance };
  } catch (error) {
    return { error: "Wrong Contract address" };
  }
};

export const sendToken = async (
  abi,
  address,
  privateKey,
  deployedAddress,
  toAddress,
  amu
) => {
  // console.log("abi ", abi, "address", address, " privateKey", privateKey, " deployedAddress", deployedAddress, " toAddress", toAddress," amu", amu);

  const contract = new web3.eth.Contract(abi, deployedAddress);
  let amount = web3.utils.toWei(amu, "ether");

  const transaction = contract.methods.transfer(toAddress, amount);
  const gasPrice = await web3.eth.getGasPrice();

  const gas = await transaction.estimateGas({
    from: address,
  });
  const nonce = await web3.eth.getTransactionCount(address);
  const data = transaction.encodeABI();

  const tx = {
    from: address,
    to: deployedAddress,
    data,
    gas,
    gasPrice,
    nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`receipt`, receipt);
  return { value: receipt.transactionHash, from: receipt.from, to: toAddress };
};

// get nft import

const pinataGatway =
  "https://fuchsia-faithful-warbler-547.mypinata.cloud/ipfs/";

export const getNFTContract = async (
  tokenURIABI,
  tokenContract,
  tokenId,
  address
) => {
  try {
    const myContract = new web3.eth.Contract(tokenURIABI, tokenContract);

    const tokenURI = await myContract.methods.tokenURI(tokenId).call();

    const response = await fetch(tokenURI);
    const jsonData = await response.json();
    const pinataImage = jsonData.image;
    const name = await myContract.methods.name().call();
    const symbol = await myContract.methods.symbol().call();

    const nftTokenDetails =
      JSON.parse(localStorage.getItem("nftTokenDetails")) || {};

    if (!nftTokenDetails[address]) {
      nftTokenDetails[address] = [];
    }

    if (
      nftTokenDetails[address].find(
        (item) =>
          item.deployedAddress === tokenContract && item.tokenId === tokenId
      )
    ) {
      return { ok: true, allready: true };
    }

    nftTokenDetails[address].push({
      ok: true,
      pinataImage,
      name,
      symbol,
      deployedAddress: tokenContract,
      tokenId,
      jsonData,
    });

    localStorage.setItem("nftTokenDetails", JSON.stringify(nftTokenDetails));
    console.log("nftTokenDetails", nftTokenDetails);
    return {
      ok: true,
      pinataImage,
      name,
      symbol,
      deployedAddress: tokenContract,
      tokenId,
    };
  } catch (error) {
    return { ok: false, error: " Contract address or ID is incorrect" };
  }
};

// function to transfer nft

export const transferNFT = async (
  privateKey,
  address,
  sendTo,
  tokenAddress,
  tokenId,
  tokenURIABI
) => {
  // console.log("privateKey, address,sendTo, tokenAddress,  tokenId,  tokenURIABI", privateKey, address,sendTo,tokenAddress,tokenId, tokenURIABI)

  const contract = new web3.eth.Contract(tokenURIABI, tokenAddress);
  console.log("contract ", contract);

  const tx = {
    from: address,
    to: tokenAddress,
    gas: 2000000, // Adjust gas limit as needed
    data: contract.methods
      .safeTransferFrom(address, sendTo, tokenId)
      .encodeABI(),
  };
  console.log("tx", tx);

  // Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  console.log("signedTx", signedTx);

  // Send the transaction
  web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("Transaction receipt:", receipt);
    })
    .on("error", (error) => {
      console.error("Error:", error);
    });
};
