import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import { Web3 } from 'web3';
import { pbkdf2 } from 'crypto'; 
import * as aes from 'aes-js'
 
const web3 = new Web3();

export const generateMnemonics =  (pass) => {
    const mNemonics = bip39.generateMnemonic();
    return mNemonics;
}

export const encryptMnemonics=async(pass,mnemo)=>{
    console.log(pass,mnemo)
    // key generation 
    pbkdf2(pass, 'this is just a randome string ', 100000, 32, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        console.log("derived key : ",derivedKey.toString('hex'));  // '3745e48...08d59ae'
        // encryption 
        const textBytes = aes.utils.utf8.toBytes(mnemo);
        console.log("textBytes ",textBytes)
        const aesCtr = new aes.ModeOfOperation.ctr(derivedKey, new aes.Counter(5));
        console.log("aesCtr ", aesCtr)
        const encryptedBytes = aesCtr.encrypt(textBytes);
        console.log("encryptedBytes", encryptedBytes)
        const encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
        console.log("encryptedHex :",encryptedHex);
         
    });
    

    
}


export const createAccount = async (mns) =>{
    const seed = await bip39.mnemonicToSeed(mns);
    const node = bip32.fromSeed(seed);
    const child = node.derivePath("m/44'/60'/0'/0/0");
    const privateKey = child.privateKey.toString("hex");
    const account =await web3.eth.accounts.wallet.add(`0x${privateKey}`);
    // const ballance = await web3.eth.getBalance(account[0].address)
    const ballance = Web3.utils.fromWei(await web3.eth.getBalance(account[0].address), 'ether');
    return { address: account[0].address, ballance }
}

 


// const generateHexAddress = async (mnemonics, length) => {
//     const seed = await bip39.mnemonicToSeed(mnemonics);
//     const node = bip32.fromSeed(seed);
//     const child = await node.derivePath(m / 44'/60' / 0'/0/${length});
//     const privateKey = child.privateKey.toString("hex");
//     const ethAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
//     return ethAccount?.address?.toLowerCase();
// };