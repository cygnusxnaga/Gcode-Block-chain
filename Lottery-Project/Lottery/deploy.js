///Last step after writing smart contract and compile script for testing
// once testing is completed then deploy.js file is required to send contract to block-chain



const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(  //initialize provider that connects to wallet/account with eth and connects to block-chain network

    'toddler shoe swing item mushroom proof cheap nut economy west device crack', //wallet/account phrase
    'https://goerli.infura.io/v3/80408f651cc84f16ae7f3ddb90977c11' //connect to goerli node
);


const web3 = new Web3(provider);  //web3 instance with provider injected


const deploy = async () => {  //create asynce/await arrow function named deploy, 
    const accounts = await web3.eth.getAccounts();

    console.log('attemoting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({ gas: '1000000', from: accounts[0] });


    console.log(interface); // send out ABI to react.project
    console.log('Contract deployed to', result.options.address);



};

deploy();

/*

DEPLOY METHOD USING GLOABAL VARIABLES AND PUBLIC METHODS!!!!!



const deploy() {
    
    new web3.eth.Contract(JSON.parse(interface)) //create new instance of web3 eth contract - pass in contract interface (JSON.Parse?)

    //attach deploy method to new instance- pass in bytecode and constructor data
    .deploy( { data: bytecode, arguments: ['Hello Gerald']})

    //attach send method- pass in gas limit and account its being sent from
    .send({ gas: '1000000', from: accounts[0] }); 

}  
*/