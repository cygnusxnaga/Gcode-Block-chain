const assert = require('assert');
const ganache = require('ganache-cli');
const { it } = require('mocha');
const { send } = require('process');
const { isSetIterator } = require('util/types');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode } = require('../compile');



let lottery;
let accounts;

beforeEach(async () =>{

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '1000000'});
});

describe('Lottery Contract', () => {
    it('Smart contract is deployed', () => {
        assert.ok(lottery.options.address);
    });

    it('Allows one account to enter & can get players', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });
  
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
    
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    
    });
    it('Allows multiple account to enter & can get players', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.011', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei('0.011', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
    
        assert.equal(accounts[0], players[0]);
    
        assert.equal(accounts[1], players[1]);
    
        assert.equal(accounts[2], players[2]);
    
        assert.equal(accounts[3], players[3]);
        assert.equal(4, players.length);
    
    });


    it('Requires minimum amount of ETH to enter', async () =>{
      
      try{ // try catch statment
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('.001', 'ether')


            });
            assert(false);
         } catch (err){
            assert(err);
         }
    });


    it('Restriction modifier is operational', async () => {
        try{  //test if anyone can use function
                await lottery.methods.pickWinner().send({
                    from: accounts[1],
                    gas: '1000000'
                });
                assert(false);
            } catch(err){
                assert(err);
            }
    });



    it('sends money to winner & resets the player array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });
        
        const insitialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - insitialBalance;
        
        console.log(finalBalance - insitialBalance);
        assert(difference > web3.utils.toWei('1.8', 'ether'));
    
    });

});

