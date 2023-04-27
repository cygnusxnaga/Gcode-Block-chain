const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
const keccak256 = require('keccak256');


// Create a Merkle tree using the SHA-256 hashing function
const leaves = addresses.map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, {sortPairs: true });
const buf2hex = x => '0x' + x.toString()

const addresses = [
"0xD62A80gfjjd8a94D0e5e86a29ufhkD75bB4563Cd1	",
"0x7e15BBru0d86c33cvb0e0caD6838D0188538ae2	",
"0x38c59A721fdj958eF9b62c4edcntg80ED3Fcgv4	",

];


console.log(buf2hex(tree.getRoot()));




buf2Hex(leaves[]);




let merkleProof = "";

