import * as bip39 from "bip39";
import * as bip32 from "bip32";
import { Web3 } from "web3";
import { pbkdf2 } from "crypto";
import * as aes from "aes-js";

const web3 = new Web3();

// function to generate mnemonics
export const generateMnemonics = (pass) => {
  const mNemonics = bip39.generateMnemonic();
  return mNemonics;
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
      console.log("derived key : ", derivedKey.toString("hex")); // '3745e48...08d59ae'
      // encryption
      const textBytes = aes.utils.utf8.toBytes(mnemo);
      const aesCtr = new aes.ModeOfOperation.ctr(
        derivedKey,
        new aes.Counter(5)
      );
      const encryptedBytes = aesCtr.encrypt(textBytes);
      const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);

      // save encrypted mnemmonics to localStorage
      localStorage.setItem("mnemmonics", encryptedHex);
    }
  );
};

//  function to decrypt mnemonics
export const decryptMnemonics = async (pass, setWrongPass, setNavigate) => {
  const mnemmonics = localStorage.getItem("mnemmonics");
  console.log("password : ", pass, "encypted mnemonics : ", mnemmonics);
  // key generation
  pbkdf2(
    pass,
    "this is just a randome string ",
    100000,
    32,
    "sha512",
    async (err, derivedKey) => {
      if (err) throw err;
      console.log("derived key : ", derivedKey.toString("hex")); // '3745e48...08d59ae'
      // decryptMnemonics

      try {
        const encryptedBytes = aes.utils.hex.toBytes(mnemmonics);
        const aesCtr = new aes.ModeOfOperation.ctr(
          derivedKey,
          new aes.Counter(5)
        );
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        const decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
        console.log("decryptedText", decryptedText);
        JSON.parse(decryptedText);
        setWrongPass(false);
        setNavigate(true);
      } catch (error) {
        console.log(error);
        setWrongPass(true);
      }
    }
  );
};

export const createAccount = async (mns) => {
  const seed = await bip39.mnemonicToSeed(mns);
  const node = bip32.fromSeed(seed);
  const child = node.derivePath("m/44'/60'/0'/0/0");
  const privateKey = child.privateKey.toString("hex");
  const account = await web3.eth.accounts.wallet.add(`0x${privateKey}`);
  const address = account[0].address;
  localStorage.setItem("address", address);
  // const ballance = await web3.eth.getBalance(account[0].address)
  const ballance = Web3.utils.fromWei(
    await web3.eth.getBalance(account[0].address),
    "ether"
  );
  return { address, ballance };
};

export const getDetails = async () => {
  const address = localStorage.getItem("address");
  const ballance = await Web3.utils.fromWei(
    await web3.eth.getBalance(address),
    "ether"
  );
  // console.log("address", address, "ballance", ballance)

  return { address, ballance };
};
