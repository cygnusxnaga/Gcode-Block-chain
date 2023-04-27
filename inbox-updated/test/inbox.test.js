// mock deploy file used for testing on local networks
// use mocha testing framework to test smart contract methods 

// {describe, it} statements can do assertions and read out custom results
// completes transactions instantly 


/*
const assert = require('assert');
const ganache = require("/Users/gmoney/Web Apps#$!/Cryptography/Ethereum/inbox/node_modules/ganache-cli/build/ganache-core.node.cli");
const Web3 = require('web3');
const web3 = new Web3(ganache.provider()); //genache provider is already created
const { interface, bytecode } = require('../compile');



let accounts; // define varible prior to before-each statement
let inbox;
//USE BEFORE EACH STATEMENT TO DEPLOY SMART CONTRACT TO NETWORK

beforeEach(async () => { // async function contining await varible 
    //get list of all accounts
   accounts = await web3.eth.getAccounts();   /*access eth module in web3 library, use getAccounts method from eth module/
   

   //CREATE NEW DEPLOYMENT FOR EVERY TEST
    //use account from ganache
    //to deploy the contract 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['welcome!'] })
        .send({ from: accounts[0], gas:'1000000' });
});


describe('inbox', () => {
    it('deploys a contract', ()=> {
      assert.ok(inbox.options.address);
    });

    it('has Default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'welcome!')
    });


    it('can change initial message', async () => {
        await inbox.methods.setMessage('new message').send({from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'new message');
    });


});


/*

//FIRST SOLO TEST

class Car {

     start() {
        return 'Ignition';
    }
}

let car;
beforeEach(() => {
  car = new Car();
});

describe('Car Works?' , () => {
    it('Start succesful', () => {
        assert.equal(car.start() , 'Ignition');
    });
});


*/

//USE IT STATEMENTS TO MANIPULATE CONTRACT IN SPECIFIC WAY
//USE IT STATEMENTS TO MAKE ASSERTIONS 





const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
 
const { abi, evm } = require('../compile');
 
let accounts;
let inbox;
 
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});
 
describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});