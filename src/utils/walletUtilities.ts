import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { Web3 } from "web3";
import { pbkdf2 } from "crypto";
import * as aes from "aes-js";

// initiating web 3 wallet
const web3 = new Web3(); // ganache provider

// function to generate mnemonics
export const generateMnemonics = (pass) => {
  const mNemonics = bip39.generateMnemonic();
  return mNemonics;
};

// function creating account from mnemonics
export const createAccount = async (mns) => {
  localStorage.setItem("transactionHistory", JSON.stringify([]));
  const seed = await bip39.mnemonicToSeed(mns);
  const node = bip32.fromSeed(seed);
  const child = node.derivePath("m/44'/60'/0'/0/0");
  const privateKey = child.privateKey.toString("hex");
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
export const encryptMnemonics = async (pass, mnemo) => {
  // key generation
  pbkdf2(
    pass,
    "this is just a randome string ",
    100000,
    32,
    "sha512",
    (err, derivedKey) => {
      if (err) throw err;
      // encryption
      const textBytes = aes.utils.utf8.toBytes(mnemo);
      const aesCtr = new aes.ModeOfOperation.ctr(
        derivedKey,
        new aes.Counter(5)
      );
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

      // save encrypted mnemonics to localStorage
      localStorage.setItem("mnemonics", encryptedHex);
    }
  );
};

//  function to decrypt mnemonics
export const decryptMnemonics = async (
  pass,
  mnemonics,
  router,
  setCheckPass,
  nav
) => {
  setCheckPass(false);
  // key generation
  pbkdf2(
    pass,
    "this is just a randome string ",
    100000,
    32,
    "sha512",
    async (err, derivedKey) => {
      if (err) throw err;
      // decryptMnemonics

      try {
        const encryptedBytes = aes.utils.hex.toBytes(mnemonics);
        const aesCtr = new aes.ModeOfOperation.ctr(
          derivedKey,
          new aes.Counter(5)
        );
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
        const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        if (!regex.test(decryptedText)) {
          throw new Error();
        }
        localStorage.setItem("password", pass);
        router.push(`${nav}`);
        return true;
      } catch (error) {
        setCheckPass(true);
        return Promise.reject("Error: wrong password");
      }
    }
  );
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
export const transferEther = async (sendFrom, sendTo, amount) => {
  const transactionHistoryString = localStorage.getItem("transactionHistory");
  const transactionHistory = JSON.parse(transactionHistoryString);

  try {
    const tx = {
      from: sendFrom,
      to: sendTo,
      value: web3.utils.toWei(amount, "ether"),
    };

    const txReceipt = await web3.eth.sendTransaction(tx);
    const txHash = txReceipt.transactionHash;
    const transaction = await web3.eth.getTransaction(txHash);
    const { from, to, value } = transaction;
    let txHistory = [
      ...transactionHistory,
      { from, to, value: Web3.utils.fromWei(value, "ether") },
    ];
    localStorage.setItem("transactionHistory", JSON.stringify(txHistory));
  } catch (error) {
    console.log(error);
    alert("Transaction denied");
  }
};
