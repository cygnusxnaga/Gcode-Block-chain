const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');



const addresses =  [
  "0xdAD8cd44E52djc35f5E7bCg55d59ddfh3b7ACe25e",
  "0xh78af0fud46ACe00f08695dFaeEd0Bjgf3o873E56",
  "0x5a54Ee89a82DbC9511605srtb1cE7bb4cAFF6B3F",

  //rest of wallets
]


// 0x5a54Ee893F2DbC6411605209b1cE7bb4cAFF6B3F

  const leaves = addresses.map(x => keccak256(x))
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  const buf2hex = x => '0x' + x.toString('hex')

  console.log(buf2hex(tree.getRoot()))

  const leaf = keccak256(addresses[2]) // address from wallet using walletconnect/metamask
  const proof = tree.getProof(leaf).map(x => buf2hex(x.data))


  console.log(buf2hex(leaves[2]))
  console.log(buf2hex(tree.getRoot()))
  console.log(JSON.stringify(proof))

  // contract.methods.safeMint(addresses, proof).send({ from: addresses }) // will be called on click of the mint button