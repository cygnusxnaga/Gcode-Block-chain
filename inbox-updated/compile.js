//first step is to create compile file to deploy and test!

//require executes code as if it was js

const path = require('path');  //build directry path using predefined path module, cross platform compatiblity 
const fs = require('fs'); //fs is predfeined module/method to read source code of file once path is established
const solc = require('solc'); //require in sol compiler


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //__dirname is constant defined by node for home dir to project dir
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol':{
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};


module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox;


//module.exports = solc.compile(source, 1).contracts[':Inbox']; //pass in file and # of files to compile function
//export contract properties and list of files compiled











